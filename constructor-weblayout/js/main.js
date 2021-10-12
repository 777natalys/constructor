/*new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/


//создание элементов тегов на странице 4в tagName получаем 'header'
const getElement = (tagName, classNames, atributes) => {
	const element = document.createElement(tagName);//5 tagName передали записали в перем-ю уже готовый элемент, кот. можно вставлять в верстку

	if (classNames) {
		element.classList.add(...classNames);
	}
	//конструкция for in используется для перебора объектов
	if (atributes) {
		for (const atribute in atributes) {
			element[atribute] = atributes[atribute];
		}
	}

	return element;//6сюда вернули готовый элемент
};

//создание хедера 2в param получаем options. const createHeader = (param) =>if (param.header.logo)
const createHeader = ({ title, header: { logo, menu, social } }) => {
	const header = getElement('header');//3создаем хедер. 7попадает в пер-ую header
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);


	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип ' + title,
		});

		wrapper.append(logoElem);
	}

	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const navLinks = menu.map(item => {
			navLink = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});
			return navLink;
		});
		const menuButton = getElement('button', ['menu-button']);
		menuButton.addEventListener('click', () => {
			menuButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(menuButton);

		nav.append(...navLinks);
		wrapper.append(nav);
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', '[]', {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link

			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}



	header.append(container);
	container.append(wrapper);

	return header;//8возвращается
};

//main
const createMain = ({ title, main: { genere, rating, description, trailers, slider } }) => {
	const main = getElement('main');

	const container = getElement('div', ['container']);
	main.append(container);
	const mainContent = getElement('div', ['main-content']);
	container.append(mainContent);
	const content = getElement('div', ['content']);
	mainContent.append(content);

	if (genere) {
		const genereSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{ textContent: genere }
		);

		content.append(genereSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animatedt', 'fadeInRight']);
		content.append(ratingBlock);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div',
			['rating-number'],
			{
				textContent: `${rating}/10`
			});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг  ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
			});

			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);

		if (title) {
			content.append(getElement('h1', ['main-title', 'animatedt', 'fadeInRight'],
				{ textContent: title, }
			));
		}

		if (description) {
			content.append(getElement('p', ['main-description', 'animatedt', 'fadeInRight'],
				{ textContent: description, }
			));
		}

		if (trailers) {
			const youtubeLink = getElement('a',
				['button', 'animated', 'fadeInRight', 'youtube-modal'],
				{
					href: trailers,
					textContent: 'Смотреть трейлер',
				}
			);

			const youtubeImgLink = getElement('a', ['play', 'youtube-modal'],
				{
					href: trailers,
					ariaLabel: 'Смотреть трейлер',
				}
			);

			const iconPlay = getElement('img', ['play-img'],
				{
					src: 'img/play.svg',
					alt: '',
					ariaHidden: true,
				}
			);

			content.append(youtubeLink);
			youtubeImgLink.append(iconPlay);
			mainContent.append(youtubeImgLink);

		}

	}

	if (slider) {
		const sliderBlock = getElement('div', ['series'],);
		const swiperBlock = getElement('div', ['swiper-container'],);
		const swiperWrapper = getElement('div', ['swiper-wrapper'],);
		const arrow = getElement('button', ['arrow'],);


		const sliders = slider.map(item => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			//const swiperSlide = getElement('a', ['swiper-slide'], { href: '#'});
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title || '') + ' ' + (item.subtitle || '')).trim(),
				//alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : ''),
			});

			card.append(cardImage);

			/*if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${title}</p>` : ''}
				`;

				card.append(cardDescription);
			} */

			swiperSlide.append(card);

			return swiperSlide;

		});

		swiperWrapper.append(...sliders);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);
		container.append(sliderBlock);

		//swiperjs.com
		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

	return main;
};

//добавление на страницу наших элементов
const movieConstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});

		document.head.append(favicon);
	}

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	document.title = options.title;

	//ставим защиту, чтоб не вызывало ошибку, если элемента нет 
	//хедер
	if (options.header) {
		app.append(createHeader(options)); //1options передаем 9добавляем готовый элемент на страницу B app
	}

	//main
	if (options.main) {
		app.append(createMain(options));
	}
};

movieConstructor('body', {
	title: 'Ведьмак',
	favicon: 'witcher/logo.png',
	background: 'witcher/background.jpg',
	fontColor: '#ffffff',
	backgroundColor: '#141218',
	subColor: '#9D2929',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'https//twitter.com',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https//instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'https//facebook.com',
				image: 'witcher/social/facebook.svg',
			},
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			},
		],
	},
	main: {
		genere: '2019,фэнтези',
		rating: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailers: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				subtitle: 'Серия №1',
				title: 'Начало конца',
			},
			{
				img: 'witcher/series/series-2.jpg',
				subtitle: 'Серия №2',
				title: 'Четыре марки',
			},
			{
				img: 'witcher/series/series-3.jpg',
				subtitle: 'Серия №3',
				title: 'Предательская луна',
			},
			{
				img: 'witcher/series/series-4.jpg',
				subtitle: 'Серия №4',
				title: 'Банкеты, ублюдки и похороны',
			},
		],
	},
});
