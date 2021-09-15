import BUS from '../Document/Bus.document';

export interface UpdateSaveResTrip {
	_id: string;
	TripName: string;
	TripDate: Date;
	TripBuses: BUS[];
	Seats: number;
}
