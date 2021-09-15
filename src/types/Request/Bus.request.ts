export interface SaveReqBus {
	BussName: string;
	BussSeats: number;
	BussBookingDates: {
		startingDate: Date;
		endingDate: Date;
	};
}

export interface UpdateReqBus {
	_id: string;
	BussName: string;
	BussSeats: number;
	BussBookingDates: {
		startingDate: Date;
		endingDate: Date;
	};
}

export interface GetReqBus {
	id: string;
}

export interface DeleteReqBus {
	id: string;
}
