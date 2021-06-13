import { gsap } from 'gsap';

export class Item {
  constructor(el) {
    this.DOM = { el: el };

    this.DOM.thumb = this.DOM.el.querySelector('.thumb');
    this.DOM.thumbSVG = this.DOM.thumb.querySelector('.distort');
    this.DOM.SVGFilter = this.DOM.thumbSVG.querySelector('filter');
    this.DOM.SVGImage = this.DOM.thumbSVG.querySelector('image.distort__img');

    gsap.set(this.DOM.SVGImage, {
      transformOrigin: '50% 50%',
    });

    this.filterType = this.DOM.SVGFilter.dataset.type;
    this.DOM.feTurbulence = this.DOM.SVGFilter.querySelector('feTurbulence');
    this.DOM.feDisplacementMap = this.DOM.SVGFilter.querySelector('feDisplacementMap');

    this.primitiveValues = this.filterType === 'turbulence'
      ? {
        baseFrequency: 0
      }
      : {
        scale: 0,
      };

    this.createHoverTimeline();
    this.initEvents();
  }

  initEvents() {
    this.onMouseEnterFn = () => this.mouseEnterFn();
    this.DOM.thumb.addEventListener('mouseenter', this.onMouseEnterFn);
    this.onMouseLeaveFn = () => this.mouseLeaveFn();
    this.DOM.thumb.addEventListener('mouseleave', this.onMouseLeaveFn);
  }

  updateFilterValues() {
    this[this.filterType === 'turbulence' ? 'updateTurbulenceBaseFrequency' : 'updateDisplacementMapScale']();
  }

  updateTurbulenceBaseFrequency(val = this.primitiveValues.baseFrequency) {
    this.DOM.feTurbulence.setAttribute('baseFrequency', val);
  }

  updateDisplacementMapScale(val = this.primitiveValues.scale) {
    this.DOM.feDisplacementMap.setAttribute('scale', val);
  }

  createHoverTimeline() {
    this.tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.7,
        ease: 'power2',
      },
      onUpdate: () => this.updateFilterValues(),
      onReverseComplete: () => {
        if (this.filterType === 'turbulence') {
          this.primitiveValues.baseFrequency = 0;
          this.updateFilterValues();
        }
      },
    });

    if (this.filterType === 'turbulence') {
      this.tl.to(this.primitiveValues, {
        startAt: {
          baseFrequency: 0.09,
        },
        baseFrequency: 0,
      }, 0);
    } else {
      this.tl.to(this.primitiveValues, {
        startAt: {
          scale: 0,
        },
        scale: 150,
      }, 0);
    }
  }

  mouseEnterFn() {
    this.tl.restart();
  }

  mouseLeaveFn() {
    this.tl.reverse();
  }
};