import {
	getOne,
	getAll,
	elShow,
	elRemove,
	elHide,
	ajaxGet,
	maskingName,
	createElementFunc,
	addClass,
	hasClass,
	removeClass
} from './util';
import { tweenEvent } from './tweenEvent';

class ListData {
	constructor() {
		this.setVars();
		this.init();
	}

	setVars() {
		this.list = getOne('.list');
		this.listWrap = getOne('#list-wrap');
		this.detail = getOne('#detail');
		this.loader = getOne('.lds-ring');
		this.listBtn = getOne('#list-btn');
		this.paging = getOne('.paging');
		this.wrapper = getOne('#wrapper');
		this.closeList = getOne('#close-list');
		this.header = getOne('header');
	}

	getDataOnClick() {
		this.listBtn.addEventListener('click', () => {
			tweenEvent.cloudMotionPause();
			tweenEvent.scrollTopSet();
			tweenEvent.footerHide();
			this.headerAddClass();
			this.getData();
		});
	}

	// 참여 현황보기 리스트 데이터 검색
	getData(page = 1) {
		const url = `http://ifd.kr/board/bbs/boardout4.php?bo_table=unicef&page=${page}`;
		elShow(this.loader);
		this.list.innerHTML = '';
		ajaxGet(url, null, data => {
			const xmlDom = new DOMParser().parseFromString(data, 'text/xml');
			this.getDataCallbackSuccess(xmlDom);
			elHide(this.loader);
		});
	}

	getDataCallbackSuccess(data) {
		const text = data.getElementsByTagName('item'),
			paging = data.querySelector('paging');
		this.paging.innerHTML = paging.textContent;
		if (getOne('.pg_next')) getOne('.pg_next').innerText = '';
		if (getOne('.pg_prev')) getOne('.pg_prev').innerText = '';

		getOne('.pg_wrap .pg').addEventListener('click', e => {
			const t = e.target;
			e.preventDefault();

			/**
			 * 다음, 이전 화살표 클릭 이벤트
			 * href의 page부분 값을 가져와서 검색
			 */
			if (hasClass(t, 'pg_next') || hasClass(t, 'pg_prev')) {
				const pageNumber = t
					.getAttribute('href')
					.split('page')[1]
					.replace('=', '');
				tweenEvent.scrollTopSet();
				this.getData(pageNumber);
			}

			if (t.className === 'pg_page') {
				tweenEvent.scrollTopSet();
				this.getData(t.innerText);
			}
		});
		this.getItem(text);
		elRemove(getAll('.sound_only, .pg_end, .pg_start'));
		elHide(this.wrapper);
		elShow(this.listWrap);
	}

	getItem(text) {
		elRemove(getAll('.list li'));
		this.createItems(Array.from(text));
	}

	closeListOnClick = () => {
		this.closeList.addEventListener('click', () => {
			elShow(this.wrapper);
			elHide(this.listWrap);
			this.headerRemoveClass();
			tweenEvent.cloudMotionResume();
			tweenEvent.footerShow();
		});
	};

	// 검색해온 리스트 데이터로 참여 현황 DOM 생성
	createItems(target) {
		if (target.length) {
			addClass(this.list, 'active');
		}
		target.forEach(el => {
			const li = this.makeListLi(el),
				img = this.makeThumbImage(el);

			let p = createElementFunc('p');
			p.appendChild(img);
			li.appendChild(p);
			p = this.makeUserData(el);
			li.appendChild(p);
			this.list.appendChild(li);
		});
	}

	makeThumbImage(el) {
		const thumbImage = el.childNodes[21].textContent.trim();
		const src = thumbImage.split('"')[1];
		const img = createElementFunc('img', { src: src });
		return img;
	}

	makeListLi(el) {
		const id = el.childNodes[3].textContent.trim();
		const li = createElementFunc('li', { id: id });
		li.addEventListener('click', () => {
			this.headerRemoveClass();
			this.getDetail(id);
		});

		return li;
	}

	makeUserData(el) {
		const name = el.childNodes[15].textContent.trim();
		const dateTime = el.childNodes[13].textContent.trim();
		const p = createElementFunc('p', { id: 'user-name' });
		p.innerHTML =
			'<span id="user-name-name">' +
			this.maskingNamed(name) +
			'</span>' +
			'<br />' +
			'<span id="user-name-date">' +
			dateTime.substr(0, dateTime.length - 3) +
			'</span>';

		return p;
	}

	// 이름이 너무 9글자보다 길면 ...처리
	maskingNamed(name) {
		return name.length > 9 ? maskingName(name).substr(0, 9 - 2) + '...' : maskingName(name);
	}

	getDetail(id) {
		const url = `http://ifd.kr/board/bbs/unicef_list.php?bo_table=unicef&wr_id=${id}`;
		elHide(this.listWrap);
		elShow(this.loader);

		ajaxGet(url, null, data => {
			this.getDetailCallBackSuccess(data);
		});
	}

	getDetailCallBackSuccess(data) {
		const doc = new DOMParser().parseFromString(data, 'text/html').body.firstElementChild;
		this.detail.appendChild(doc);

		getOne('#detail-in-upload-btn').addEventListener('click', () =>
			tweenEvent.uploadFormShow()
		);
		getOne('#close-detail').addEventListener('click', _ => this.detailClose());

		getOne('#bo_v_img img').onload = () => {
			elShow(this.detail);
			elHide(this.loader);
		};
	}

	detailClose() {
		this.detail.innerHTML = '';
		this.headerAddClass();
		elHide(this.detail);
		elShow(this.listWrap);
	}

	headerRemoveClass() {
		removeClass(this.header, 'list-active');
	}

	headerAddClass() {
		addClass(this.header, 'list-active');
	}

	init() {
		this.closeListOnClick();
		this.getDataOnClick();
	}
}

export const listData = new ListData();
