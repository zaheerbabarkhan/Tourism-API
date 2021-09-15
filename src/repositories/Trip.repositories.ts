import { TRIPSchema } from '../models/Trip.model';
import { TRIP } from '../types/Document/Trip.document';

export class MainTrip {
	constructor() {}
	getTrip(_id: string) {
		return TRIPSchema.findById(_id);
	}
	saveTrip(Trip: TRIP) {
		return new TRIPSchema(Trip).save();
	}
	updateTrip(Trip: TRIP) {
		return TRIPSchema.findByIdAndUpdate(Trip._id, Trip, {
			new: true,
		});
	}
	deleteTrip(_id: string) {
		return TRIPSchema.findByIdAndDelete(_id);
	}
	getTripList() {
		return TRIPSchema.find();
	}
}
