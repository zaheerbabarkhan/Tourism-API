import BUS from '../Document/Bus.document';

export interface SaveReqTrip {
	TripName: string;
	TripDate: Date;
	TripBuses: BUS[];
	Seats: number;
}
export interface UpdateReqTrip {
	_id: string;
	TripName: string;
	TripDate: Date;
	TripBuses: BUS[];
	Seats: number;
}

export interface GetReqTrip {
	id: string;
}
export interface DeleteReqTrip {
	id: string;
}
