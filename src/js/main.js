import '../scss/main.scss';
import '../index.html';

// magic functions that are used to calculate style values
const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b
};

// body element
const body = document.body;

// calculate the viewport size
let winsize;
const calcWinsize = () => {
    winsize = {
        width: window.innerWidth,
        height: window.innerHeight
    }
}
calcWinsize();
// and recalculate on resize
window.addEventListener("resize", calcWinsize);

// Really important for window to go back to top
// Otherwise the will be a "jump on reload"
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// getting scroll top position 
let topScroll;
const getTopScroll = () => {
    topScroll = window.pageYOffset || document.documentElement.scrollTop;
}

// updating scroll top position on scroll
window.addEventListener("scroll", getTopScroll);

// SmoothScroll
class SmoothScroll {
    constructor() {
        // this.shouldAnimate = false;

        // get main 
        this.DOM = { 
            main: document.querySelector("main") 
        };

        // get scrollable div (the one which is being translated)
        this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");

        // this.listenMouse()

        // specifying properties that will change on scroll (y-axis)
        // interpolation between the previous and current value to achieve the smooth scrolling effect
        this.scrlStyles = {
            translationY: {
                // interpolated value
                previous: 0,
                // current value
                current: 0,
                // amount of easing
                ease: 0.1,
                // current value setter
                // in this case the value of the translation will be the same like the document scroll
                setValue: () => topScroll
            }
        };
        // set the body's height
        this.bodySize();
        // set the initial style values
        this.update();
        // modyfy style of the <main> element
        this.mainStyles();
        // on resize reset body height
        this.bodyResize();
        // render loop
        requestAnimationFrame(() => this.render());
    }

    // listenMouse() {
    //     document.addEventListener('mousemove', () => {
    //         this.shouldAnimate = true;
    //     })
    // }


    update() {
        // sets the initial value (no interpolation) - translate the scroll value
        for (const key in this.scrlStyles) {
            this.scrlStyles[key].current = this.scrlStyles[
                key
            ].previous = this.scrlStyles[key].setValue();
        }
        // translate the scrollable div
        this.setPosition();
        // this.shouldAnimate = true;
    }

    setPosition() {
        // if current scroll value is different from previous -- translate 
        if (
            Math.round(this.scrlStyles.translationY.previous) !==
            Math.round(this.scrlStyles.translationY.current) ||
            this.scrlStyles.translationY.previous < 10
        ) {
            // this.shouldAnimate = true;
            this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.scrlStyles.translationY.previous}px,0)`;
        }
    }

    bodySize() {
        // setting the body height (this will keep the scrollbar on the page)
        body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }

    mainStyles() {
        // <main> has to be "sticked" to the screen and not scroll (setting it to position fixed and overflow hidden)
        this.DOM.main.style.position = "fixed";
        this.DOM.main.style.width = this.DOM.main.style.height = "100%";
        this.DOM.main.style.top = this.DOM.main.style.left = 0;
        this.DOM.main.style.overflow = "hidden";
    }

    bodyResize() {
        window.addEventListener("resize", () => this.bodySize());
    }

    render() {
        // update current and interpolated values
        for (const key in this.scrlStyles) {
            this.scrlStyles[key].current = this.scrlStyles[key].setValue();
            this.scrlStyles[key].previous = MathUtils.lerp(
                this.scrlStyles[key].previous,
                this.scrlStyles[key].current,
                this.scrlStyles[key].ease
            );
        }
        // then translate scrollable div
        this.setPosition();

        // render loop
        requestAnimationFrame(() => this.render());
    }
}


window.onload = function () {
    getTopScroll();
    new SmoothScroll();
}