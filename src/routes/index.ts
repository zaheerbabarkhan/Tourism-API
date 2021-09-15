import express from 'express';
import { BusRoutesApi } from './Bus.routes';
import { TripRoutesApi } from './Trip.routes';
export class MainRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.routes();
	}
	routes() {
		this.router.use('/bus', BusRoutesApi);
		this.router.use('/trip', TripRoutesApi);
	}
}

export const MainApi = new MainRouter().router;
