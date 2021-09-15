import { Document } from 'mongoose';

export default interface BUS extends Document {
	_id: string;
	BussName: string;
	BussSeats: number;
	BussBookingDates: {
		startingDate: Date;
		endingDate: Date;
	};
}
