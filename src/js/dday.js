import { getOne } from './util';

class Dday {
	constructor() {
		this.setVars();
	}

	setVars() {
		this.D_day = getOne('#D_day_count');
		this.endDay = new Date('December 25, 2019 00:00:00'); //디데이
		this.now = new Date();
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

export const dday = new Dday();
