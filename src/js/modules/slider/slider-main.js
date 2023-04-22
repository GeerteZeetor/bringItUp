import { Slider } from './slider';

export class MainSlider extends Slider {
  constructor(btns, nextmodule, prevmodule) {
    super(btns, nextmodule, prevmodule);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';
      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  clickListenerSlide(trigger, num) {
    trigger.forEach(item => {
      item.addEventListener('click', ev => {
        ev.stopPropagation();
        ev.preventDefault();
        this.plusSlides(num);
      });
    });
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });

      btn.parentNode.previousElementSibling.addEventListener('click', ev => {
        console.log(ev.target);
        if (
          ev.target.classList.contains('download') ||
          ev.target.parentNode.classList.contains('download') ||
          ev.target.parentNode.parentNode.classList.contains('download')
        ) {
          return;
        }
        ev.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.clickListenerSlide(this.prevmodule, -1);
    this.clickListenerSlide(this.nextmodule, 1);
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}
