import { Slider } from './slider';

export class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
    this.pause = false;
  }

  decorizeSlides() {
    this.slides.forEach(slide => {
      if (slide.type !== 'button') {
        slide.classList.remove(this.activeClass);
        if (this.animate) {
          slide.querySelector('.card__title').style.opacity = '0.4';
          slide.querySelector('.card__controls-arrow').style.opacity = '0';
        }
      }
    });

    if (this.slides[0].type !== 'button') {
      this.slides[0].classList.add(this.activeClass);
      if (this.animate) {
        this.slides[0].querySelector('.card__title').style.opacity = '1';
        this.slides[0].querySelector('.card__controls-arrow').style.opacity =
          '1';
      }
    }
  }
  nextSlide() {
    if (this.slides[1].type !== 'button') {
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => {
      this.nextSlide();
    });

    this.prev.addEventListener('click', () => {
      if (this.slides[this.slides.length - 1].type !== 'button') {
        let active = this.slides[this.slides.length - 1];
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
      } else {
        let active = this.slides[this.slides.length - 3];
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
      }
    });
  }

  autoPlay() {
    const intervalId = setInterval(() => {
      if (!this.pause) {
        this.nextSlide();
      } else {
        return;
      }
    }, 5000);

    this.prev.parentNode.addEventListener('mouseover', () => {
      this.pause = true;
    });

    this.prev.parentNode.addEventListener('mouseout', () => {
      this.pause = false;
    });

    this.slides.forEach(slide => {
      slide.addEventListener('mouseover', () => {
        this.pause = true;
      });
      slide.addEventListener('mouseout', () => {
        this.pause = false;
      });
    });
  }

  init() {
    try {
      this.container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;
    `;
      this.bindTriggers();
      this.decorizeSlides();
      if (this.autoplay) {
        this.autoPlay();
      }
    } catch (e) {}
  }
}
