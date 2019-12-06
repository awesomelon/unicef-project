import { getOne, getAll, elRemove } from './util';
import { tweenEvent } from './tweenEvent';
import { uploadSwiper } from './uploadSwiper';

class UploadFormEv {
    constructor() {
        this.setVars();
    }

    setVars() {
        this.slideNextBtn = getOne('.slideNext-btn');
        this.formEl = getOne('#form');
        this.uploadBtn = getOne('#upload-btn');
        this.closeForm = getOne('#upload-form-close');
    }

    slideNextBtnOnClick(e) {
        e.preventDefault();
        if (getOne('#gallery').value === '') {
            return alert('사진을 선택해주세요');
        }
        uploadSwiper.slideNext();
    }

    formShow() {
        tweenEvent.uploadFormShow();
    }

    formClose() {
        tweenEvent.uploadFormHide();
    }

    bindOnClick() {
        this.slideNextBtn.addEventListener('click', e => this.slideNextBtnOnClick(e));
        this.uploadBtn.addEventListener('click', _ => this.formShow());
        this.closeForm.addEventListener('click', _ => this.formClose());
    }

    init() {
        this.bindOnClick();
    }
}

export const uploadFormEv = new UploadFormEv();
