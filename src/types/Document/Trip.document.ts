import { Document } from 'mongoose';
import BUS from '../Document/Bus.document';
export interface TRIP extends Document {
	_id: string;
	TripName: string;
	TripDate: Date;
	TripBuses: BUS[];
	Seats: number;
}
