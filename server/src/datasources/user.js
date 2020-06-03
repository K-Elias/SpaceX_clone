import { DataSource } from 'apollo-datasource';

export default class UserAPI extends DataSource {
	initialize(config) {
		this.context = config.context;
	}

	getUser() {
		if (!this.context.user) throw new Error('User not defined');
		return this.context.user;
	}

	async bookTrips(launchIds) {
		if (!this.context.user) throw new Error('User not defined');
		this.context.user.trips = [...this.context.user.trips, ...launchIds];
		await this.context.user.save();
		return this.context.user.trips;
	}

	async cancelTrip(launchId) {
		if (!this.context.user) throw new Error('User not defined');
		const index = this.context.user.trips.indexOf(launchId);
		if (index > -1) {
			this.context.user.trips.splice(index, 1);
			await this.context.user.save();
			return this.context.user.trips;
		}
		return false;
	}

	async getLaunchIdsByUser() {
		if (!this.context.user) throw new Error('User not defined');
		return this.context.user.trips;
	}

	async isBookedOnLaunch({ launchId }) {
		if (!this.context.user) throw new Error('User not defined');
		if (this.context.user.trips.includes(launchId)) return true;
		return false;
	}
}
