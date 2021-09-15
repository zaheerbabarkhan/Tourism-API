import { BUSSchema } from '../models/Bus.model';
import BUS from '../types/Document/Bus.document';
export class MainBus {
	constructor() {}
	getBus(_id: string) {
		return BUSSchema.findById(_id);
	}
	saveBus(Bus: BUS) {
		return new BUSSchema(Bus).save();
	}
	updateBus(Bus: BUS) {
		return BUSSchema.findByIdAndUpdate(Bus._id, Bus, {
			new: true,
		});
	}
	deleteBus(_id: string) {
		return BUSSchema.findByIdAndDelete(_id);
	}
	getBusList() {
		return BUSSchema.find();
	}
}
