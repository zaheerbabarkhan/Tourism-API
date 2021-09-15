import BUS from '../types/Document/Bus.document';
import { MainBus } from '../repositories/Bus.repositories';
import CustomError from '../utils/error';
import { SaveUpdateResBUS } from '../types/Response/Bus.response';
import {
	Get,
	Route,
	Tags,
	Post,
	Delete,
	Put,
	Body,
	SuccessResponse,
} from '@tsoa/runtime';
import {
	DeleteReqBus,
	SaveReqBus,
	UpdateReqBus,
	GetReqBus,
} from '../types/Request/Bus.request';

@Route('Bus')
@Tags('Bus')
export class BusController {
	constructor() {}
	@Post('/saveBus')
	async saveBus(@Body() Bus: SaveReqBus): Promise<SaveUpdateResBUS> {
		const newBus = await new MainBus().saveBus(<BUS>Bus);
		if (!newBus) {
			throw new CustomError(400, 'Bus not saved');
		}
		return <SaveUpdateResBUS>newBus;
	}
	@Post('/getBus')
	async getBus(@Body() getReq: GetReqBus): Promise<SaveUpdateResBUS> {
		const bus = await new MainBus().getBus(getReq.id);
		if (!bus) {
			throw new CustomError(404, 'Bus Not found');
		}
		return <SaveUpdateResBUS>bus;
	}
	@Put('updateBus')
	async updateBus(@Body() updateReq: UpdateReqBus): Promise<SaveUpdateResBUS> {
		const updatedBus = await new MainBus().updateBus(<BUS>updateReq);
		if (!updatedBus) {
			throw new CustomError(400, 'Admin Not Updated');
		}
		return <SaveUpdateResBUS>updatedBus;
	}
	@Delete('/deleteBus')
	@SuccessResponse('200', 'Admin Deleted')
	async deleteBus(@Body() deleteReq: DeleteReqBus) {
		return await new MainBus().deleteBus(deleteReq.id);
	}

	@Post('/getBusList')
	async getBusList(): Promise<SaveUpdateResBUS[]> {
		const busList = await new MainBus().getBusList();
		if (!busList) {
			throw new CustomError(404, 'Bus not Found');
		}
		return <SaveUpdateResBUS[]>busList;
	}
}
