import express from 'express';
import { BusAvailability } from '../middleware/BusAvailability.middlware';
import { TripController } from '../controllers/Trip.controller';
import {
	DeleteReqTrip,
	UpdateReqTrip,
	GetReqTrip,
	SaveReqTrip,
} from '../types/Request/Trip.request';
import { UpdateSaveResTrip } from '../types/Response/Trip.response';

export class TripRoutes {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.routes();
	}
	routes() {
		this.router.post('/saveTrip', BusAvailability, async (req, res, next) => {
			try {
				const trip: SaveReqTrip = req.body;
				trip.TripBuses = [];
				const buses = res.locals.requiredBuses;
				for (const key in buses) {
					if (Object.prototype.hasOwnProperty.call(buses, key)) {
						const element = buses[key];
						trip.TripBuses.push(element);
					}
				}
				console.log(trip);
				const savedTrip: UpdateSaveResTrip =
					await new TripController().saveTrip(trip);
				return res.status(200).json(savedTrip);
			} catch (error) {
				console.log('this is error');
				next(error);
			}
		});

		this.router.post('/getBus', async (req, res, next) => {
			try {
				const getTrip: GetReqTrip = req.body;
				const trip = await new TripController().getTrip(getTrip);
				return res.send(trip);
			} catch (error) {
				next(error);
			}
		});

		this.router.put('/updateTrip', async (req, res, next) => {
			try {
				const updateReq: UpdateReqTrip = req.body;
				const updatedTrip = await new TripController().updateTrip(updateReq);
				return res.send(updatedTrip);
			} catch (error) {}
		});

		this.router.delete('/deleteBus', async (req, res, next) => {
			try {
				const deleteReq: DeleteReqTrip = req.body;
				await new TripController().deleteTrip(deleteReq);
				res.status(200).json({
					message: 'Bus Deleted',
				});
			} catch (error) {
				next(error);
			}
		});

		this.router.post('/getBusList', async (req, res, next) => {
			try {
				const tripList = await new TripController().getTripList();
				res.status(200).json({
					tripList,
				});
			} catch (error) {
				next(error);
			}
		});
	}
}

export const TripRoutesApi = new TripRoutes().router;
