import { AuthenticationError } from 'apollo-server-express';

import { paginateResults } from './utils';

export default {
	Query: {
		launches: async (_, { pageSize = 20, after }, { dataSources }) => {
			const allLaunches = await dataSources.launchAPI.getAllLaunches();
			allLaunches.reverse();
			const launches = paginateResults({
				after,
				pageSize,
				results: allLaunches
			});
			return {
				launches,
				cursor: launches.length ? launches[launches.length - 1].cursor : null,
				hasMore: launches.length
					? launches[launches.length - 1].cursor !==
					  allLaunches[allLaunches.length - 1].cursor
					: false
			};
		},
		launch: (_, { id }, { dataSources }) =>
			dataSources.launchAPI.getLaunchById({ launchId: id }),
		me: (_, __, { dataSources }) => {
			const user = dataSources.userAPI.getUser();
			if (!user) throw new AuthenticationError('not authenticated');
			return user;
		}
	},

	Mutation: {
		bookTrips: async (_, { launchIds }, { dataSources }) => {
			const results = await dataSources.userAPI.bookTrips(launchIds);
			const launches = await dataSources.launchAPI.getLaunchesByIds({
				launchIds
			});
			const launchIdNotBooked = launchIds.filter(id => !results.includes(id));

			return {
				success: results && results.length === launchIds.length,
				message:
					results.length === launchIds.length
						? 'trips booked successfully'
						: `the following launches couldn't be booked: ${launchIdNotBooked}`,
				launches
			};
		},

		cancelTrip: async (_, { launchId }, { dataSources }) => {
			const result = await dataSources.userAPI.cancelTrip(launchId);

			if (!result)
				return {
					success: false,
					message: 'failed to cancel trip'
				};

			return {
				success: true,
				message: 'trip cancelled'
			};
		}
	},

	Launch: {
		isBooked: (launch, _, { dataSources }) =>
			dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
	},

	User: {
		trips: async (_, __, { dataSources }) => {
			const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

			if (!launchIds.length) return [];

			return (
				dataSources.launchAPI.getLaunchesByIds({
					launchIds
				}) || []
			);
		}
	}
};
