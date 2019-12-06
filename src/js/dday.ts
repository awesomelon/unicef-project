import { getOne } from './util';

class Dday {
	private D_day: any;
	private endDay: Date;
	private now: Date;

	constructor(D_day: any, endDay: Date, now: Date) {
		this.D_day = D_day;
		this.endDay = endDay;
		this.now = now;
	}

	countDay() {
		if (this.now.getTime() > this.endDay.getTime()) return;

		const distance = this.endDay.getTime() - this.now.getTime();

		const d = Math.floor(distance / (1000 * 60 * 60 * 24));

		this.D_day.innerText = d;
	}

	init() {
		this.countDay();
	}
}

export const dday = new Dday(
	getOne('#D_day_count'),
	new Date('December 25, 2019 00:00:00'),
	new Date()
);
