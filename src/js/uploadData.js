import { getOne, elShow, elHide, autoHypenPhone, excuteReg, ajaxPost } from './util';
import { uploadSwiper } from './uploadSwiper';
import { tweenEvent } from './tweenEvent';
class UploadData {
	constructor() {
		this.setVars();
	}

	setVars() {
		this.loader = getOne('.lds-ring');
		this.submit = getOne('#submit');
		this.alertCancel = getOne('#alert #alert-cancel');
		this.alertOk = getOne('#alert #alert-ok');
		this.reloadpage = getOne('#reload-page');
		this.form = getOne('#form');
		this.specialCharacters = /[\{\}\[\]?.,;:|\)*~`!^_+<>@\#$%&\\\=\(\'\"]/gi;
		this.pattern = /(19[0-9][0-9]|20[0-1][0-9])(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/;
		this.phone = getOne('#phone');
		this.birth = getOne('#birth');
	}

	submitOnClick() {
		this.submit.addEventListener('click', e => {
			e.preventDefault();
			if (this.checkInputs()) {
				this.alertShow();
			}
		});
	}

	alertOkOnClick() {
		this.alertOk.addEventListener('click', e => {
			this.alertHide();
			this.senddata(this.makeFormData());
		});
	}

	alertCancelOnClick() {
		this.alertCancel.addEventListener('click', e => {
			this.alertHide();
		});
	}

	alertShow() {
		tweenEvent.coverShow();
		tweenEvent.alertShow();
	}

	alertHide() {
		tweenEvent.coverHide();
		tweenEvent.alertHide();
	}

	makeFormData() {
		const formData = new FormData();
		formData.append('bo_table', 'unicef');
		formData.append('GameID', getOne('#name').value);
		formData.append('subject', getOne('#subject').value);
		formData.append('content', getOne('#content').value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
		formData.append('phone', getOne('#phone').value);
		formData.append('birth', getOne('#birth').value);
		formData.append('bf_file[]', getOne('#gallery').files[0]);

		return formData;
	}

	checkInputs() {
		const name = getOne('#name').value.trim();
		const pattern = /([^가-힣\x20a-zA-Z])/i;
		if (name == '' || pattern.test(name) || name.length < 2) {
			alert('이름을 정확하게 입력하세요.');
			return false;
		}

		const phone = getOne('#phone').value;
		const regExp2 = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
		if (!regExp2.test(phone)) {
			alert('정확한 전화번호를 입력해주세요.');
			return false;
		}

		const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		// 검증에 사용할 정규식 변수 regExp에 저
		const subject = getOne('#subject').value;
		if (!regExp.test(subject)) {
			alert('이메일을 정확히 입력해주세요');
			return false;
		}

		const content = getOne('#content').value;
		if (!content) {
			alert('글 내용을 입력해주세요.');
			return false;
		}
		const birth = getOne('#birth').value;
		const format = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
		if (!format.test(birth)) {
			alert('생년월일을 다시 입력해주세요.');
			return false;
		}
		return true;
	}

	// 사연 등록 완료 버튼 시 데이터 전송
	senddata(data) {
		const url = 'http://ifd.kr/board/bbs/Fwrite_update2.php';

		elShow(this.loader);
		ajaxPost(
			url,
			data,
			data => {
				this.sendDataCallback(data);
				elHide(this.loader);
			},
			true
		);
	}

	// 데이터 전송에 성공 시
	sendDataCallback(data) {
		if (data === 'selected') return alert('이미 등록된 번호입니다.');
		if (data === 'cancel') return alert('사연 내용에 부적절한 단어가 있습니다. 확인해주세요.');

		elHide(this.loader);
		uploadSwiper.slideNext();
	}

	realoadOnClick() {
		this.reloadpage.addEventListener('click', _ => {
			this.completePage();
		});
	}

	completePage() {
		location.reload();
	}

	bindOnClick() {
		this.realoadOnClick();
		this.alertOkOnClick();
		this.alertCancelOnClick();
		this.submitOnClick();
	}

	phoneOnkeyupReg() {
		this.phone.addEventListener('keyup', () => (this.phone.value = autoHypenPhone(this.phone.value.trim())));
	}
	birthOnKeyupReg() {
		this.birth.addEventListener('keyup', () =>
			excuteReg(this.birth, [this.pattern, this.specialCharacters], ['$1-$2-$3', ''])
		);
	}

	init() {
		this.phoneOnkeyupReg();
		this.birthOnKeyupReg();
		this.bindOnClick();
	}
}

export const uploadData = new UploadData();
