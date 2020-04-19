import mongoose, { model, Schema } from 'mongoose';

const id = {
  type: String,
  unique: true,
  index: true,
  default: mongoose.Types.ObjectId
}

const createdAt = { type: Date, default: new Date().toISOString() }

const unusedField = { versionKey: false }

const User = model('User', new Schema({
  id,
  createdAt,
  image: String,
  email: String,
  password: String,
  trips: Array
}, unusedField));

const Trip = model('Trip', new Schema({
  id,
  createdAt,
  launchId: Number,
  userId: Number
}, unusedField));

export default {
  User,
  Trip
}