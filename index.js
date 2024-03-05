import { Slider } from './slider.js';
 

 

 
const navigation = {
	'next': document.querySelector('.slider-nav > .slider-nav__item--next'),
	'prev': document.querySelector('.slider-nav > .slider-nav__item--prev')
};

 
const slider = new Slider(document.querySelector('.slider'));

const initializeSlider = () => {
 
	const navigate = action => slider[action](); 
 
	navigation.next.addEventListener('click', () => navigate('next'));
	navigation.prev.addEventListener('click', () => navigate('prev'));

 
	Observer.create({
		target: window,
		type: 'wheel,touch,scroll,pointer',
		onUp : () => navigate('next'), 
		onDown : () => navigate('prev'),
		wheelSpeed: -1
	});
};

 
if (slider.slidesTotal >= 3) {
    initializeSlider();
} 
else {
    console.log('Not enough slides. Exiting...');
}
 
imagesLoaded(document.querySelectorAll('.slider__item-inner'), {background: true}, () => document.body.classList.remove('loading'));