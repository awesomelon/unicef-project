import { getOne, getAll } from './util';
import { TweenMax } from 'gsap/TweenMax';
class TweenEvent {
    constructor() {
        this.setVars();
    }

    setVars() {
        this.mainTitle = getOne('#main-title');
        this.footer = getOne('footer');
        this.uploadForm = getOne('#upload-form');
        this.cloud1 = getOne('.cloud1');
        this.cloud2 = getOne('.cloud2');
        this.cloud3 = getOne('.cloud3');
        this.alert = getOne('#alert');
        this.cover = getOne('#cover');
        this.air = getOne('#step5-air');
        this.text = getOne('#step5-text');
        this.mainContentText = getOne('#main-content-text');
        this.whiteBg = getOne('.white-bg');
        this.arrow1s = getAll('#main-arrow1 .arrow');
        this.arrow2s = getAll('#main-arrow2 .arrow');
        this.mainContentStep1 = getOne('#main-content-step1');
        this.mainContentStep2 = getOne('#main-content-step2');
        this.mainContentStep3 = getOne('#main-content-step3');
        this.c1Ani = null;
        this.c2Ani = null;
        this.c3Ani = null;
    }

    coverShow() {
        TweenMax.to(this.cover, 0, {
            display: 'block',
            onComplete: () => {
                TweenMax.to(this.cover, 0.4, { opacity: 1 });
            }
        });
    }

    coverHide() {
        TweenMax.to(this.cover, 0.4, {
            opacity: 0,
            onComplete: () => {
                TweenMax.to(this.cover, 0, { display: 'none' });
            }
        });
    }

    completeMotion = () => {
        TweenMax.to(this.air, 0.4, {
            top: 150,
            left: 200,
            opacity: 1,
            onComplete: () => {
                this.downUpMotion(this.text);
            }
        });
    };

    mainContentStepMotion() {
        const supportPageOffset = window.pageXOffset !== undefined;
        const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

        // 현재 스크롤 값
        const _currentTop = supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
            ? document.documentElement.scrollTop
            : document.body.scrollTop;

        let flag = true;
        window.addEventListener('scroll', e => {
            let _top = supportPageOffset
                ? window.pageYOffset
                : isCSS1Compat
                ? document.documentElement.scrollTop
                : document.body.scrollTop;

            if (flag) {
                if (_top >= 400 || _currentTop >= 400) {
                    TweenMax.to(this.mainContentStep1, 0.4, {
                        opacity: 1,
                        onStart: () => {
                            this.mainContentArrow1Motion();
                        }
                    });

                    flag = false;
                }
            }
        });
    }

    mainContentArrow1Motion() {
        const arrow1Option = {
            opacity: 1,
            onComplete: () => this.mainContentStep2Motion()
        };
        TweenMax.staggerTo(this.arrow1s, 0.1, arrow1Option, 0.1);
    }

    mainContentStep2Motion() {
        TweenMax.to(this.mainContentStep2, 0.4, {
            opacity: 1,
            x: 0,
            delay: 0.2,
            onComplete: () => this.mainContentArrow2Motion()
        });
    }

    mainContentArrow2Motion() {
        const arrow2Option = {
            opacity: 1,
            onComplete: () => this.mainContentStep3Motion()
        };
        TweenMax.staggerTo(this.arrow2s, 0.1, arrow2Option, 0.1);
    }

    mainContentStep3Motion() {
        TweenMax.to(this.mainContentStep3, 0.4, {
            opacity: 1,
            x: 0,
            delay: 0.2
        });
    }

    whiteBgMotion() {
        TweenMax.to(this.whiteBg, 0.4, { width: 229, delay: 0.4 });
    }

    downUpMotion(target) {
        TweenMax.to(target, 0.6, { y: 0, opacity: 1 });
    }

    alertShow() {
        TweenMax.to(this.alert, 0.3, { y: '-50%' });
    }

    alertHide() {
        TweenMax.to(this.alert, 0.3, { y: '-350%' });
    }

    uploadFormShow() {
        TweenMax.to(this.uploadForm, 0.3, { y: 0, opacity: 1 });
    }

    uploadFormHide() {
        TweenMax.to(this.uploadForm, 0.3, { y: 400, opacity: 0 });
    }

    footerHide() {
        TweenMax.to(this.footer, 0.4, { y: 140 });
    }

    footerShow() {
        TweenMax.to(this.footer, 0.4, { y: 0 });
    }

    mainTitleMotion() {
        this.downUpMotion(this.mainTitle);
    }

    mainContentTextMotion() {
        this.downUpMotion(this.mainContentText);
        this.whiteBgMotion();
    }

    cloud1Motion() {
        this.c1Ani = TweenMax.to(this.cloud1, 30, {
            x: 540,
            repeat: -1,
            delay: 15,
            repeatDelay: 2
        });
    }

    cloud2Motion() {
        this.c2Ani = TweenMax.to(this.cloud2, 28, {
            x: 470,
            repeat: -1,
            delay: 10,
            repeatDelay: 3
        });
    }

    cloud3Motion() {
        this.c3Ani = TweenMax.to(this.cloud3, 25, { x: 240, repeat: -1 });
    }

    cloudMotion() {
        this.cloud1Motion();
        this.cloud2Motion();
        this.cloud3Motion();
    }

    cloudMotionPause() {
        this.c1Ani.pause();
        this.c2Ani.pause();
        this.c3Ani.pause();
    }

    cloudMotionResume() {
        this.c1Ani.resume();
        this.c2Ani.resume();
        this.c3Ani.resume();
    }

    scrollTopSet() {
        TweenMax.set('html,body', { scrollTop: 0 });
    }

    scrollHeightSet(h) {
        TweenMax.set('.swiper-container', { height: h < 1000 ? 1000 : h + 120 });
    }

    init() {
        this.cloudMotion();
        this.mainContentTextMotion();
        this.mainContentStepMotion();
        this.mainTitleMotion();
    }
}

export const tweenEvent = new TweenEvent();
