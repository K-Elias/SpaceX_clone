import mongoose, { model, Schema } from 'mongoose';

import { now } from './utils';

const id = {
	type: String,
	unique: true,
	index: true,
	default: mongoose.Types.ObjectId
};

const createdAt = {
	type: Date,
	default: () => now()
};

const unusedField = { versionKey: false };

const trip = new Schema(
	{
		id,
		createdAt,
		launchId: String,
		userId: String
	},
	unusedField
);

const user = new Schema(
	{
		id,
		createdAt,
		email: String,
		password: String,
		trips: [trip],
		image: { type: String, default: null },
		tokenVersion: { type: Number, default: 0 }
	},
	unusedField
);

export const User = model('User', user);
export const Trip = model('Trip', trip);
