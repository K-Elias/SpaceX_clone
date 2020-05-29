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

export const User = model(
	'User',
	new Schema(
		{
			id,
			createdAt,
			email: String,
			password: String,
			image: { type: String, default: null },
			tokenVersion: { type: Number, default: 0 },
			trips: Array
		},
		unusedField
	)
);

export const Trip = model(
	'Trip',
	new Schema(
		{
			id,
			createdAt,
			launchId: Number,
			userId: Number
		},
		unusedField
	)
);
