export interface SaveUpdateResBUS {
	id: string;
	BussName: string;
	BussSeats: number;
	BussBookingDates: {
		startingDate: Date;
		endingDate: Date;
	};
}
