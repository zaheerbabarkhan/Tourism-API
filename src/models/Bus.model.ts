import BUS from '../types/Document/Bus.document';
import { Schema, model } from 'mongoose';

const BusSchema = new Schema({
	BussName: {
		type: String,
	},
	BussSeats: {
		type: Number,
	},
	BussBookingDates: {
		startingDate: {
			type: Date,
		},
		endingDate: {
			type: Date,
		},
	},
});

export const BUSSchema = model<BUS>('Bus', BusSchema);
