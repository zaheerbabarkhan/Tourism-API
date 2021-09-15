import { BUSSchema } from '../models/Bus.model';
import { Request, Response, NextFunction } from 'express';

export const BusAvailability = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { TripDate, Seats } = req.body;
	const buses = await BUSSchema.find({
		'BussBookingDates.startingDate': { $lt: TripDate },
		'BussBookingDates.endingDate': { $gt: TripDate },
	}).select('BussSeats');

	const array: number[] = [];
	for (const key in buses) {
		if (Object.prototype.hasOwnProperty.call(buses, key)) {
			const element = buses[key];
			array.push(element.BussSeats);
		}
	}
	const requiredSequence: number[][] = getAllSubsets(array, Seats);
	const requiredBuses = await BUSSchema.find({
		'BussBookingDates.startingDate': { $lt: TripDate },
		'BussBookingDates.endingDate': { $gt: TripDate },
		BussSeats: { $in: requiredSequence[0] },
	});

	if (buses) {
		res.locals.requiredBuses = requiredBuses;
		next();
	} else {
		res.status(400).json({
			message: 'Buses Not available',
		});
	}
};

function getAllSubsets(array: number[], n: number) {
	const subsets: number[][] = [[]];

	for (const el of array) {
		let last = subsets.length - 1;
		for (let i = 0; i <= last; i++) {
			const array = [...subsets[i], el];
			const sum = array.reduce((val1: number, val2: number) => val1 + val2);
			if (sum === n) {
				return [array];
			}
			subsets.push(array);
		}
	}
	return subsets;
}
