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

const user = new Schema(
	{
		id,
		createdAt,
		email: String,
		password: String,
		trips: [String],
		image: { type: String, default: null },
		tokenVersion: { type: Number, default: 0 }
	},
	unusedField
);

// eslint-disable-next-line import/prefer-default-export
export const User = model('User', user);
