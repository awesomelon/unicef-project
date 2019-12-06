import loadImage from 'blueimp-load-image';
import { tweenEvent } from './tweenEvent';
/****************************************************************************** */

export function excuteReg(el, patterns, replaceStr) {
	patterns.forEach((reg, idx) => {
		el.value = el.value.replace(reg, replaceStr[idx]); // el value값에 pattern이 들어가면 삭제
	});
}
/**
 * @param {node} el : 현재 이 함수를 부른 요소
 * @param {RegExp} pattern : 정규 표현식 패턴
 * @param {string} replaceValue : 표현식으로 걸러진 value값을 대체할 문자
 */
function deletePattern(el, pattern, replaceValue) {}

//하이픈 추가 펑션
export function autoHypenPhone(str) {
	str = str.replace(/[^0-9]/g, '');
	let tmp = '';
	if (str.length < 4) {
		return str;
	} else if (str.length < 7) {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
		return tmp;
	} else if (str.length < 11) {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 3);
		tmp += '-';
		tmp += str.substr(6);
		return tmp;
	} else {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 4);
		tmp += '-';
		tmp += str.substr(7);
		return tmp;
	}

	return str;
}

export function getParameterByName(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 썸네일을 캔버스로 변환
export function imageCavas(target, url, width) {
	return loadImage(
		url,
		(img, data) => {
			if (img.type === 'error') {
				console.error(`Error loading image ${url}`);
			} else {
				img.toDataURL('image/jpeg', 0.8);
				appendImg(target, img);
			}
		},
		{ canvas: true, orientation: true, meta: true, maxWidth: width }
	);
}

function appendImg(target, img) {
	if (target === null || target === 'undefined') return alert('사진을 선택해주세요');
	target.appendChild(img);
	tweenEvent.scrollHeightSet(img.clientHeight + 120);
}

export function fileSizeCheck(file) {
	// 사이즈체크
	const maxSize = 10 * 1024 * 1024; // 10MB
	let fileSize = 0;

	fileSize = file.size;

	// alert('파일사이즈 : ' + fileSize + ', 최대파일사이즈 : 1MB');
	if (fileSize > maxSize) {
		alert('첨부파일 사이즈는 10MB 이내로 등록 가능합니다.');
		this.getOne('#gallery').value = '';
		return false;
	}

	return true;
}

export function fileWHCheck(img) {
	const LIMIT_HEIGHT = 5000;

	if (img.height > LIMIT_HEIGHT) {
		alert('첨부파일 세로사이즈가 너무 큽니다.');
		this.getOne('#gallery').value = '';
		return false;
	}
	return true;
}

export function getOne(el) {
	return document.querySelector(el);
}

export function getAll(el) {
	return document.querySelectorAll(el);
}

export function elHide(el) {
	el.style.display = 'none';
	return el;
}

export function elShow(el) {
	el.style.display = 'block';
	return el;
}

export function elRemove(el) {
	const target = Array.from(el);
	for (const node of target) {
		node.parentNode.removeChild(node);
	}
}

export function pathNameReset() {
	history.replaceState({}, null, location.pathname);
}

export function maskingName(strName) {
	if (strName.length > 2) {
		let originName = strName.split('');
		originName.forEach((name, i) => {
			if (i === 0 || i === originName.length - 1) return;
			originName[i] = '*';
		});
		let joinName = originName.join();
		return joinName.replace(/,/g, '');
	} else {
		let pattern = /.$/; // 정규식
		return strName.replace(pattern, '*');
	}
}

/**
 * node 생성 함수
 * @param {string} el : 생성할 노드
 * @param {object} attributes : 생성한 노드에 추가할 요소
 */
export function createElementFunc(el, attributes) {
	var node = document.createElement(el);
	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) {
				node.setAttribute(attr, attributes[attr]);
			}
		}
	}
	for (var i = 2, len = arguments.length; i < len; i++) {
		var child = arguments[i];
		if (typeof child == 'string') {
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}

// ajax
function ajax_init() {
	if (typeof XMLHttpRequest !== 'undefined') {
		return new XMLHttpRequest();
	}
	var versions = [
		'MSXML2.XmlHttp.6.0',
		'MSXML2.XmlHttp.5.0',
		'MSXML2.XmlHttp.4.0',
		'MSXML2.XmlHttp.3.0',
		'MSXML2.XmlHttp.2.0',
		'Microsoft.XmlHttp'
	];

	var xhr;
	for (var i = 0; i < versions.length; i++) {
		try {
			xhr = new ActiveXObject(versions[i]);
			break;
		} catch (e) {}
	}
	return xhr;
}

function ajaxSend(url, callback, method, data, async) {
	if (async === undefined) {
		async = true;
	}
	var x = ajax_init();
	x.open(method, url, async);
	x.onreadystatechange = () => {
		if (x.readyState == 4) {
			callback(x.responseText);
		}
	};
	if (method == 'POST') {
		// x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	x.send(data);
}

export function ajaxGet(url, data, callback, async) {
	let query = [];
	for (let key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajaxSend(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
}

export function ajaxPost(url, data, callback, async) {
	ajaxSend(url, callback, 'POST', data, async);
}

export let hasClass, addClass, removeClass;

hasClass = function(elem, c) {
	return elem.classList.contains(c);
};
addClass = function(elem, c) {
	elem.classList.add(c);
};
removeClass = function(elem, c) {
	elem.classList.remove(c);
};
