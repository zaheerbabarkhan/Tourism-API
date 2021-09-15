import { TRIP } from '../types/Document/Trip.document';
import mongoose, { Schema, model } from 'mongoose';

const TripSchema = new Schema({
	TripName: {
		type: String,
	},
	TripDate: {
		type: Date,
	},
	TripBuses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Bus',
		},
	],
	Seats: {
		type: Number,
	},
});

export const TRIPSchema = model<TRIP>('Trip', TripSchema);
