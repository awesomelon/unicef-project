import 'swiper/dist/css/swiper.min.css';
import './index.scss';
import { listData } from './js/listData';
import { tweenEvent } from './js/tweenEvent';
import { uploadData } from './js/uploadData';
import { uploadFormEv } from './js/uploadFormEv';
import { choiceFile } from './js/makeThumb';
import { dday } from './js/dday';

window.addEventListener('DOMContentLoaded', () => {
	tweenEvent.init();
	uploadData.init();
	choiceFile.init();
	uploadFormEv.init();
	listData.init();
	dday.init();
});

window.addEventListener('load', () => {});
