import { TRIP } from '../types/Document/Trip.document';
import { MainTrip } from '../repositories/Trip.repositories';
import CustomError from '../utils/error';
import {
	Route,
	Tags,
	Post,
	Delete,
	Put,
	Body,
	SuccessResponse,
} from '@tsoa/runtime';
import {
	DeleteReqTrip,
	SaveReqTrip,
	UpdateReqTrip,
	GetReqTrip,
} from '../types/Request/Trip.request';
import { UpdateSaveResTrip } from '../types/Response/Trip.response';

@Route('Trip')
@Tags('Trip')
export class TripController {
	constructor() {}
	@Post('/saveTrip')
	async saveTrip(@Body() Trip: SaveReqTrip): Promise<UpdateSaveResTrip> {
		const newTrip = await new MainTrip().saveTrip(<TRIP>Trip);
		if (!newTrip) {
			throw new CustomError(400, 'Bus not saved');
		}
		return <UpdateSaveResTrip>newTrip;
	}
	@Post('/getTrip')
	async getTrip(@Body() getReq: GetReqTrip): Promise<UpdateSaveResTrip> {
		const trip = await new MainTrip().getTrip(getReq.id);
		if (!trip) {
			throw new CustomError(404, 'Bus Not found');
		}
		return <UpdateSaveResTrip>trip;
	}
	@Put('updateTrip')
	async updateTrip(
		@Body() updateReq: UpdateReqTrip
	): Promise<UpdateSaveResTrip> {
		const updatedTrip = await new MainTrip().updateTrip(<TRIP>updateReq);
		if (!updatedTrip) {
			throw new CustomError(400, 'Admin Not Updated');
		}
		return <UpdateSaveResTrip>updatedTrip;
	}
	@Delete('/deleteTrip')
	@SuccessResponse('200', 'Admin Deleted')
	async deleteTrip(@Body() deleteReq: DeleteReqTrip) {
		return await new MainTrip().deleteTrip(deleteReq.id);
	}

	@Post('/getTripList')
	async getTripList(): Promise<UpdateSaveResTrip[]> {
		const tripList = await new MainTrip().getTripList();
		if (!tripList) {
			throw new CustomError(404, 'Bus not Found');
		}
		return <UpdateSaveResTrip[]>tripList;
	}
}
