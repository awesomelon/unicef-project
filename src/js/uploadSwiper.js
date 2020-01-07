import Swiper from 'swiper/dist/js//swiper';
import { getOne, elHide, elShow } from './util';
import { tweenEvent } from './tweenEvent';

// 스와이프 이벤트
export const uploadSwiper = new Swiper('.swiper-container', {
	on: {
		slideChangeTransitionStart() {
			// step2,3에서만 상단 새 게시물 헤더가 나와야해서 추가
			const idx = this.realIndex;
			elHide(getOne('#step-header'));
			elHide(getOne('#step2-btns'));
			elHide(getOne('#step3-btns'));
			if (idx >= 1 && idx <= 2) elShow(getOne('#step-header'));
			if (idx === 1) elShow(getOne('#step2-btns'));
			if (idx === 2) elShow(getOne('#step3-btns'));
		},
		slideChangeTransitionEnd() {
			const idx = this.realIndex;
			const height = getOne('.swiper-slide-active .height-check').clientHeight;
			tweenEvent.scrollTopSet();
			tweenEvent.scrollHeightSet(height);
			if (idx === 3) tweenEvent.completeMotion();
		}
	}
});
