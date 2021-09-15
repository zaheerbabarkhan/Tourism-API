import express from 'express';
import { BusController } from '../controllers/Bus.controller';
import {
	DeleteReqBus,
	UpdateReqBus,
	GetReqBus,
	SaveReqBus,
} from '../types/Request/Bus.request';
import { SaveUpdateResBUS } from '../types/Response/Bus.response';

export class BusRoutes {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.routes();
	}
	routes() {
		this.router.post('/saveBus', async (req, res, next) => {
			try {
				const bus: SaveReqBus = req.body;
				const savedBus: SaveUpdateResBUS = await new BusController().saveBus(
					bus
				);
				return res.status(200).json(savedBus);
			} catch (error) {
				next(error);
			}
		});

		this.router.post('/getBus', async (req, res, next) => {
			try {
				const getBus: GetReqBus = req.body;
				const bus = await new BusController().getBus(getBus);
				return res.send(bus);
			} catch (error) {
				next(error);
			}
		});

		this.router.put('/updateBus', async (req, res, next) => {
			try {
				const updateReq: UpdateReqBus = req.body;
				const updatedBus = await new BusController().updateBus(updateReq);
				return res.send(updatedBus);
			} catch (error) {}
		});

		this.router.delete('/deleteBus', async (req, res, next) => {
			try {
				const deleteReq: DeleteReqBus = req.body;
				await new BusController().deleteBus(deleteReq);
				res.status(200).json({
					message: 'Bus Deleted',
				});
			} catch (error) {
				next(error);
			}
		});

		this.router.post('/getBusList', async (req, res, next) => {
			try {
				const busList = await new BusController().getBusList();
				res.status(200).json({
					busList,
				});
			} catch (error) {
				next(error);
			}
		});
	}
}

export const BusRoutesApi = new BusRoutes().router;
