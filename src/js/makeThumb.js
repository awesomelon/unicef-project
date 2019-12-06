import {
    getOne,
    getAll,
    elRemove,
    elHide,
    elShow,
    fileSizeCheck,
    fileWHCheck,
    imageCavas
} from './util';
import { uploadSwiper } from './uploadSwiper';
import { tweenEvent } from './tweenEvent';

class ChoiceFile {
    constructor() {
        this.setVars();
    }

    setVars() {
        this.gallery = getOne('#gallery');
        this.bigThumb = getOne('#big-thumb');
        this.smallThumb = getOne('#small-thumb');
        this.galleryCall = getOne('#gallery-call');
        this.reGalleryCall = getOne('#reGallery-btn');
        this.slidePrev = getOne('#slidePrev-btn');
        this.reloadPage = getOne('#reload-page-step');
        this.listWrap = getOne('#list-wrap');
        this.detail = getOne('#detail');
        this.wrapper = getOne('#wrapper');
        this.header = getOne('header');
    }

    galleryOnClick() {
        this.galleryCall.addEventListener('click', _ => this.gallery.click());
        this.reGalleryCall.addEventListener('click', _ => this.gallery.click());
    }

    slidePrevOnClick() {
        this.slidePrev.addEventListener('click', _ => uploadSwiper.slidePrev());
    }

    reloadStepPage() {
        this.reloadPage.addEventListener('click', _ => {
            location.reload();
        });
    }

    bindOnClick() {
        this.reloadStepPage();
        this.galleryOnClick();
        this.slidePrevOnClick();
    }

    // 업로드 이미지 썸네일 생성
    thumbView() {
        if (!('url' in window) && 'webkitURL' in window) {
            window.URL = window.webkitURL;
        }

        this.gallery.addEventListener('change', e => {
            elRemove(getAll('canvas'));
            tweenEvent.scrollTopSet();
            if (e.target.files[0] === undefined) {
                return alert('이미지를 다시 선택해주세요.');
            }
            if (e.target.files[0].type.indexOf('video') != -1) {
                return alert('동영상 말구 이미지를 올려주세요');
            }

            const img = new Image(),
                file = e.target.files[0],
                src = (window.URL || window.webkitURL).createObjectURL(file);
            img.src = src;

            img.onload = () => {
                if (fileWHCheck(img) && fileSizeCheck(file)) {
                    this.makeCanvas(this.bigThumb, this.smallThumb, src);
                    this.canvasOnloadedEv();
                }
            };
        });
    }

    makeCanvas(big, small, src) {
        imageCavas(big, src, 540);
        imageCavas(small, src, 540);
    }

    canvasOnloadedEv() {
        elShow(this.wrapper);
        elHide(this.listWrap);
        elHide(this.detail);
        uploadSwiper.slideTo(1);
        tweenEvent.uploadFormHide();
        tweenEvent.footerHide();
        tweenEvent.scrollTopSet();
        tweenEvent.cloudMotionPause();
    }

    init() {
        this.thumbView();
        this.bindOnClick();
    }
}

export const choiceFile = new ChoiceFile();
