import { DataSource } from 'apollo-datasource';

import { Trip, User } from '../model';

export default class UserAPI extends DataSource {
	initialize(config) {
		this.context = config.context;
	}

	getUser() {
		if (!this.context.user) throw new Error('User not defined');
		return this.context.user;
	}

	bookTrip(launchId) {
		if (!this.context.user) throw new Error('User not defined');
		const trip = new Trip({ userId: this.context.user.id, launchId });
		return trip;
	}

	async bookTrips(launchIds) {
		if (!this.context.user) throw new Error('User not defined');
		const results = [];
		launchIds.forEach(launchId => {
			const res = this.bookTrip(launchId);
			if (res) results.push(res);
		});
		await User.updateOne(
			{ id: this.context.user.id },
			{
				$set: { trips: [...this.context.user.trips, ...results] }
			}
		);
		return this.context.user.trips;
	}

	async cancelTrip(launchId) {
		if (!this.context.user) throw new Error('User not defined');
		return !!Trip.delete({ userId: this.context.user.id, launchId });
	}

	async getLaunchIdsByUser() {
		if (!this.context.user) throw new Error('User not defined');
		const found = await Trip.find({ userId: this.context.user.id });
		return found && found.length
			? found.map(l => l.dataValues.launchId).filter(l => !!l)
			: [];
	}

	async isBookedOnLaunch({ launchId }) {
		if (!this.context.user) throw new Error('User not defined');
		const found = await Trip.find({ userId: this.context.user.id, launchId });
		return found && found.length > 0;
	}
}
