import { RESTDataSource } from 'apollo-datasource-rest';
import 'dotenv/config';

export default class LaunchAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = process.env.API_KEY;
	}

	launchReducer(launch) {
		return {
			id: launch.flight_number || 0,
			cursor: `${launch.launch_date_unix}`,
			site: launch.launch_site && launch.launch_site.site_name,
			mission: {
				name: launch.mission_name,
				missionPatch:
					launch.links.mission_patch || launch.links.mission_patch_small
			},
			rocket: {
				id: launch.rocket.rocket_id,
				name: launch.rocket.rocket_name,
				type: launch.rocket.rocket_type
			}
		};
	}

	async getAllLaunches() {
		const response = await this.get('launches');
		return Array.isArray(response)
			? response.map(launch => this.launchReducer(launch))
			: [];
	}

	async getLaunchById({ launchId }) {
		const response = await this.get('launches', { flight_number: launchId });
		return this.launchReducer(response[0]);
	}

	getLaunchesByIds({ launchIds }) {
		return Promise.all(
			launchIds.map(launchId => this.getLaunchById({ launchId }))
		);
	}
}
