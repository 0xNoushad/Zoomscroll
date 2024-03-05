// Slider class definition for managing a slideshow
export class Slider {
	DOM = {
		el: null
	};
 
	#current = 0;

 
	constructor(DOM_el) {
		this.DOM.el = DOM_el;
		 
		this.slides = [...this.DOM.el.querySelectorAll('.slider__item')];
		
		 
		this.slidesTotal = this.slides.length;
 
		this.slides[this.current].classList.add('slider__item--current');
		
 
		this.slides[this.getPreviousPosition()].classList.add('slider__item--previous');
	}
	 
	getPreviousPosition() {
		return this.current != 0 ? this.current - 1 : this.slidesTotal - 1;
	}
	
	 
	getPreviousPreviousPosition() {
		const position = this.getPreviousPosition();
		return position != 0 ? position-1 : this.slidesTotal - 1;
	}
	
	// Method to get the index of the next slide
	getNextPosition() {
		return this.current != this.slidesTotal - 1 ? this.current + 1 : 0;
	}
	
 
	next() {
		this.navigate(1);
	}
	
	 
	prev() {
		this.navigate(0);
	}
	
 
	get current() {
		return this.#current;
	}
	
	 
	set current(value) {
		this.#current = value;
	}
	
	 
	navigate(direction) {
		
	 
		if ( this.isAnimating ) return false;
		this.isAnimating = true;
		
 
		const currentSlide = this.slides[this.current];
		const nextSlide = this.slides[this.getNextPosition()];
		const previousSlide = this.slides[this.getPreviousPosition()];
		const previousPreviousSlide = this.slides[this.getPreviousPreviousPosition()];
		
		// Animate the slider navigation using GSAP
		const tl = gsap.timeline({
			defaults: {
				duration: 1.1, 
				ease: 'expo.inOut'
			},
			onStart: () => {
				if ( !direction ) {
					gsap.set(previousPreviousSlide, {opacity: 1, scale: 1});
				}

			 
				const incomingSlide = direction ? nextSlide : previousSlide;
		 
				gsap.set(this.slides, {zIndex: 0, willChange: 'transform, opacity'});
				gsap.set(incomingSlide, {zIndex: direction ? 3 : 2});
				gsap.set(currentSlide, {zIndex: direction ? 2 : 3});
				gsap.set(direction ? previousSlide : previousPreviousSlide, {zIndex: 1});
			},
			onComplete: () => {
			 
				currentSlide.classList.remove('slider__item--current');
				previousSlide.classList.remove('slider__item--previous');
				(direction ? nextSlide : previousSlide).classList.add('slider__item--current');
				(direction ? currentSlide : previousPreviousSlide).classList.add('slider__item--previous');

			 
				this.isAnimating = false;
			}
		})
		.to(currentSlide, {
			scale: direction
		})
		.fromTo(direction ? nextSlide : previousSlide, {
			scale: direction ? 0 : 1,
			opacity: 1
		}, {
			scale: 0.3
		}, 0)

	 
		this.current = direction ? this.getNextPosition() : this.getPreviousPosition();
	}
}