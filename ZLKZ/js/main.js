//? User Agents

let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE ");
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}


//? WEBP supported

function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});

//? Преобразвывает высоту VH css за вычетом шторки навигации браузера.
if(document.querySelector('.hero')) {

    if (document.querySelector("body").classList.contains("_touch")) {
        function adaptiveVH() {
            const portrait = window.matchMedia('(orientation: portrait)');
            const defaultVh = window.innerHeight;
            const defaultOrientation = portrait.matches;
            let activeOrientation = defaultOrientation;
            let vh = window.innerHeight;

            document.querySelector(".hero").style.height = document.querySelector(".hero").clientHeight + 'px';

            window.addEventListener("resize", function() {
                if (activeOrientation !== portrait.matches) {
                    activeOrientation = portrait.matches;
                    if (activeOrientation === defaultOrientation) {
                        vh = defaultVh;
                    } else {
                        vh = window.innerHeight;
                    }
                    document.querySelector(".hero").style.height = document.querySelector(".hero").clientHeight + 'px';
                    //popupInit();
                }
            });
        }
        adaptiveVH();
    }
}
  //?-----------------------------------------------------------------------

let unlock = true;

//?IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//=================
//ActionsOnHash
/* if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
} */
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//!Tabs
let timeOut;
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let event = 'click';
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		if (tab.classList.contains('catalog-tabs') && !document.body.classList.contains('_touch')) {
			event = 'mouseover';
		}
		tabs_item.addEventListener(event, function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				if (event === 'click') {
					tabs_blocks[index].classList.remove('_active');
				} else {
					clearTimeout(timeOut);
				}
			}
			
			tabs_item.classList.add('_active');
			const image = tabs_blocks[index].querySelector('img');
			if (event === 'click') {
				tabs_blocks[index].classList.add('_active');
				if (!image.getAttribute('src')) {
					image.setAttribute('src', image.dataset.lazy);
				}
			} else {
				timeOut = setTimeout(()=>{
					for (let index = 0; index < tabs_items.length; index++) {
						let tabs_item = tabs_items[index];
						tabs_blocks[index].classList.remove('_active');
					}
					if (!image.getAttribute('src')) {
						image.setAttribute('src', image.dataset.lazy);
					}
					tabs_blocks[index].classList.add('_active');
				}, 200);
			}
			e.preventDefault();
		});
	}
}
//=================
//!Spollers
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spollersGo) {
				spollersGo = false;
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				_slideToggle(spoller.nextElementSibling);

				setTimeout(function () {
					spollersGo = true;
				}, 500);
			}
		});
	}
}
//=================
//?SearchInList
/* function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
} */
//=================
//?DigiFormat
/* function digi(str) {
	let r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
} */
//=================
//!Popups
/* let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
let popupCard = document.querySelector(".popup_card .popup__body > .content");
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			if (item === "card") {
				popupCard.innerHTML = '';
				let card = e.currentTarget.cloneNode(true);
				popupCard.append(card);
			}
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
}); */
//=================
//!SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.visibility = 'hidden';
		target.style.position = 'absolute';
		target.style.zIndex = '-10';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let visibility = window.getComputedStyle(target).visibility;
	if (visibility === 'hidden')
		visibility = 'visible';

	target.style.visibility = visibility;
	target.style.position = 'unset';
	target.style.zIndex = '1';
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).visibility === 'hidden') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//!Gallery
/* let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
} */
//=================

//========================================
//?IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}



//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open('_' + message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 700, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.nextElementSibling.innerText == input_g_value) {
					input_focus_add(input);
					if (!document.querySelector('.basket__inpPlaceHolder') || window.innerWidth < 768) {
						input.value = '';
						input.nextElementSibling.innerText = ' ';
					}
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.nextElementSibling.innerText = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			/* if (input.classList.contains('_date')) {
				datepicker(input, {
					customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			} */
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		if (input.nextElementSibling !== null) {
			input.nextElementSibling.innerText = input_g_value;
		}
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = '';
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
let quantityInputs = document.querySelectorAll('.quantity__input > input');
if (quantityInputs.length > 0) {
	for (let i = 0; i < quantityInputs.length; i++) {
		const input = quantityInputs[i];
		
		input.addEventListener('change', function(e) {
			if (isNaN(+input.value) || input.value <= 0) {
				input.value = 1;
			}
		});
	}
}

//RANGE
/* const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
} */

if(document.querySelector('.hero')) {
	let slider_hero_bg = new Swiper('.bg-hero-slider', {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.hero-slider__pagination',
			clickable: false,
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		lazy: {
			loadPrevNext: true,
		},
		touchRatio: 0,
		simulateTouch: true,
		loop: true,
		breakpoints: {
			320: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 1000,
				slidesPerView: 1,
			},
		},
		// Arrows
		navigation: {
			nextEl: '.hero-slider__btn--next',
			prevEl: '.hero-slider__btn--prev',
		},
	});
	let slider_hero = new Swiper('.hero-slider', {
		//watchOverflow: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		touchRatio: 0,
		simulateTouch: false,
		loop: true,
	
		breakpoints: {
			320: {
				observer: true,
				observeParents: true,
				autoHeight: true,
				speed: 1000,
				a11y: false,
				slidesPerView: 1,
			},
		},
	
	});
	slider_hero_bg.controller.control = slider_hero;
	//slider_hero.controller.control = slider_hero_bg;
	
	/* function sliderPause() {
		slider_hero_bg.autoplay.stop();
		slider_hero_bg.autoplay.start();
	}
	let heroSliderTimer;
	document.querySelectorAll('.hero-slider__pagination .swiper-pagination-bullet').forEach((el) => {
		el.addEventListener('click', sliderPause);
	});
	document.querySelectorAll('.hero-slider__btn').forEach((el) => {
		el.addEventListener('click', sliderPause);
	}); */
	
	/* partners slider */
	
	let slider_partners = new Swiper('.partners-slider', {
		navigation: {
			nextEl: '.partners-slider__btn--next',
			prevEl: '.partners-slider__btn--prev',
		},
		pagination: {
			el: '.partners-slider__pagination',
			clickable: false,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		breakpoints: {
			320: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 1,
				spaceBetween: 20
			},
			480: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 2,
				spaceBetween: 30,
			},
			767: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 3,
				spaceBetween: 25,
			},
			1401: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 5,
				spaceBetween: 25
			},
		},
	
	});
	
	/* news slider */
	let slider_news = new Swiper('.news-slider', {
		navigation: {
			nextEl: '.news-slider__btn--next',
			prevEl: '.news-slider__btn--prev',
		},
		pagination: {
			el: '.news-slider__pagination',
			clickable: false,
		},
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		breakpoints: {
			320: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 1,
				spaceBetween: 20
			},
			480: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 2,
				spaceBetween: 15,
			},
			767: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 3,
				spaceBetween: 15,
			},
			1401: {
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 4,
				spaceBetween: 37
			},
		},
	
	});
	
	let slider_brands = new Swiper('.catalog-brands', {
		pagination: {
			el: '.catalog-brands__pagination',
			clickable: false,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			320: {
				watchOverflow: false,
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 1,
				spaceBetween: 20
			},
			480: {
				watchOverflow: false,
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 3,
				spaceBetween: 25,
			},
			767: {
				watchOverflow: false,
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 4,
				spaceBetween: 25,
			},
			1401: {
				watchOverflow: true,
				observer: true,
				observeParents: true,
				autoHeight: false,
				speed: 600,
				slidesPerView: 7,
			},
		},
	
	});
}



// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();


//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			/* document.querySelector('.bottom-line').classList.toggle("_active"); */
		}
	});
};

function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
let controller = new ScrollMagic.Controller();
//! animation title--------------------------------------------
if (document.querySelector('.heroAll')) {
    let titleAnim = new ScrollMagic.Scene({
        triggerElement: '.heroAll__title',
        triggerHook: 1,
    })
        .on('start', function (event) {
            titleAnim.triggerElement().classList.add('animated');
            titleAnim.destroy(true);
        })
        .addTo(controller);
}
//!-------------------------------------------------------------

//! checklist animation------------------------------------------
if (document.querySelector('.checkList__item')) {
    let chekListAnim = new ScrollMagic.Scene({
        triggerElement: '.checkList__item',
        triggerHook: 0.9,
    })
        .on('start', function (event) {
            let delay = 400
            let items = document.querySelectorAll('.checkList__item');
            for (let i = 0; i < items.length; i++) {
                const el = items[i];
                setTimeout(() => {
                    el.classList.add('animated');
                }, i * 180 + delay)
            }
            chekListAnim.destroy(true);
        })
        .addTo(controller);
}
//!--------------------------------------------------------------


//! progressBar and progressNum animation------------------------------------------
let sceneProgress = new ScrollMagic.Scene({
    triggerElement: '.aboutstat__progressNum',
    triggerHook: 0.9,
})
    .on('start', function (event) {
        let progressNums = document.querySelectorAll('.aboutstat__progressNum');
        for (let i = 0; i < progressNums.length; i++) {
            const el = progressNums[i];
            const progressData = el.dataset.numb;
            let numAnim = new countUp.CountUp(el, progressData, { duration: 2, separator: '', suffix: '%' });
            numAnim.start();
            el.parentElement.parentElement.querySelector('.aboutstat__progress').style.width = progressData + '%';
        }
        sceneProgress.destroy(true);
    })
    .addTo(controller);
//!--------------------------------------------------------------

//! contacts animation------------------------------------------
if (document.querySelector('.contacts__item')) {
    let contactsAnim = new ScrollMagic.Scene({
        triggerElement: '.contacts__item',
        triggerHook: 0.9,
    })
        .on('start', function (event) {
            let delay = document.querySelector('.heroAll') === null ? 0 : 400
            let items = document.querySelectorAll('.contacts__item');
            for (let i = 0; i < items.length; i++) {
                const el = items[i];
                setTimeout(() => {
                    el.classList.add('animated');
                }, i * 180 + delay)
            }
            contactsAnim.destroy(true);
        })
        .addTo(controller);
}
//!--------------------------------------------------------------
if (document.querySelector('.clients')) {
    
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.7,
    });
}
if (document.querySelector('.hero')) {
    /* paralax */
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.675,
        imgPosition: 'left'
    });
    jarallax(document.querySelectorAll('.jarallax-end'), {
        speed: 0.675,
        imgPosition: '80%'
    });


    /* scrollMagic - scroll effects*/
    //! back arrow hidden/visible
    const backBtn = document.querySelector('.back');
    let goBack = new ScrollMagic.Scene({
        triggerElement: '.catalog',
        triggerHook: 0,
    })
        .on('start', function (event) {
            if (event.progress) {
                backBtn.style.display = 'block';
            } else {
                backBtn.style.display = 'none';
            }
        })
        .addTo(controller);
    //! num Animate On HeroPage
    let sceneNumb = new ScrollMagic.Scene({
        triggerElement: '.stats__item-box-num',
        triggerHook: 1,
    })
        .on('start', function (event) {
            let statsNums = document.querySelectorAll('.stats__item-box-num');
            for (let i = 0; i < statsNums.length; i++) {
                const el = statsNums[i];
                let numAnim = new countUp.CountUp(el, el.dataset.numb, { duration: 3, separator: ' ', });
                numAnim.start();
            }
            sceneNumb.destroy(true);
        })
        .addTo(controller);

    let sceneMap = new ScrollMagic.Scene({
        triggerElement: '.delivery-geo__map',
        triggerHook: 0.5,
    })
        .on('start', function (event) {
            let delay = 1000;
            document.querySelector('.geo-marker-boss').classList.add('_active');
            let geoMarkers = document.querySelectorAll('.geo-marker');
            for (let i = 0; i < geoMarkers.length; i++) {
                const el = geoMarkers[i];
                setTimeout(function () {
                    el.classList.add('_active');
                }, i * 90 + delay);
            }
            sceneMap.destroy(true);
        })
        .addTo(controller);

}
/* touch events */

let getTouch = document.querySelector('body._touch');

if (getTouch) {
    let benItems = document.querySelectorAll('.benefits__item');
    if (benItems.length) {
        for (let i = 0; i < benItems.length; i++) {
            const el = benItems[i];
            el.addEventListener('click', (e) => {
                el.classList.toggle('_active');
            });
        }
    }
    let mItems = document.querySelectorAll('.menu__item');
    if (mItems.length) {
        for (let i = 0; i < mItems.length; i++) {
            const el = mItems[i];
            if (el.querySelector('.menu__sub-box')) {
                el.classList.add('_sub');
                el.addEventListener('click', (e) => {
                    el.classList.toggle('_active');
                });
            }
        }
    }
    let filterBtns = document.querySelectorAll('.catalogGrid__navBtn');
    if (filterBtns.length) {
        for (let index = 0; index < filterBtns.length; index++) {
            let item = filterBtns[index];
            item.addEventListener('click', () => {
                for (let index = 0; index < filterBtns.length; index++) {
                    let item = filterBtns[index];
                    item.classList.remove('catalogGrid__navBtn--active');
                }
                item.classList.add('catalogGrid__navBtn--active');
            });
        }

    }
}
// initMap
if (document.querySelector('.hero') || document.querySelector('.contactsPage')) {
    function initMap() {
        let googleMap = new ScrollMagic.Scene({
            triggerElement: '.contacts__map-plug',
            triggerHook: 0.8,
        })
            .on('start', function (event) {
                map();
                googleMap.destroy(true);
            })
            .addTo(controller);
    }
}
let heroMediaItems = document.querySelectorAll('.hero__media-item');
for (let i = 0; i < heroMediaItems.length; i++) {
    const el = heroMediaItems[i];
    el.addEventListener('mouseover', function () {
        el.classList.add('_animated');
    }, { once: true })
}

let allTxtSlides = document.querySelectorAll('.media__item-box');
for (let i = 0; i < allTxtSlides.length; i++) {
    const el = allTxtSlides[i];
    const btn = el.querySelector('.btn');
    const hiddenTxt = el.querySelector('.hidden-txt');
    if (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (hiddenTxt.classList.contains('hidden')) {
                _slideDown(hiddenTxt);
                btn.textContent = 'Скрыть';
                hiddenTxt.classList.remove('hidden');
            } else {
                _slideUp(hiddenTxt);
                btn.textContent = 'Подробнее';
                hiddenTxt.classList.add('hidden');
            }

        });
    }

}

const searchBtn = document.querySelector('.controllers__search-btn');
const searchInput = document.querySelector('.controllers__search input');
searchBtn.addEventListener('click', function () {
    searchInput.parentElement.classList.toggle('_open'); //? Поиск обработчик
});

if (document.querySelector('._side-block')) {
    let sticky = new Sticky('._side-block');
}

// basketAdaptive - Адаптирует вес товара в корзине. (вес закомментирован в документе .pug)
/* function basketAdaptive(event = {}, init = true) {
    if (init && window.matchMedia(('(min-width:767px)')).matches) {
        event.matches = null;
    }
    const basketElems = document.querySelectorAll('.basketGrid__itemBox');
    for (let i = 0; i < basketElems.length; i++) {
        const el = basketElems[i];
        const weightData = el.querySelector('.basketGrid__weightData');
        if (event.matches) {
            const startDestination = el.querySelector('.basketGrid__col--weight');
            startDestination.append(weightData);
        } else if((!event.matches && event.matches !== null)) {
            const finalDestination = el.querySelector('.basketGrid__itemWrp');
            finalDestination.append(weightData);
        }


    }
}
basketAdaptive();

function mediaInit(mediaQueries) {
    for (let i = 0; i < mediaQueries.length; i++) {
        const mediaData = mediaQueries[i];
        let mediaQ = window.matchMedia(('(min-width:' + mediaData + 'px)'));
        mediaQ.addListener((event, mediaQ) => basketAdaptive(event, false));
    }
}
mediaInit([767]); */

// Load the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
let player;
const overlay = document.querySelector('.history__ytplayerOverlay');
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        videoId: '_eSdXX4naVg',
        playerVars: {
            autoplay: 0,
            controls: 2,
            rel: 0,
            modestbranding: 1,
        },
        events: {
            'onReady': playerStart,
            'onStateChange': playerState,
        }
    });
}
function playerState(event) {
    if (event.data === 1) {
        overlay.classList.add('_hidden');
        return;
    }
}

function playerStart() {
    overlay.addEventListener('click', (e) => {
        overlay.classList.add('_animated');
        setTimeout(()=>{
            player.playVideo();
        }, 300);
    });
}

function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};

	var markers = new Array();

	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});

	var locations = [
		[new google.maps.LatLng(56.27621289856827, 38.12347779844027)],
	]

	var options = {
		zoom: 15,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" },{ "color": "red" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};

	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(63, 81),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				//infowindow.setContent($('.contacts-map-item_' + cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}

/* function initMap() {
	let mapPlug = document.querySelector('.contacts__map-plug');
	mapPlug.addEventListener('click', (el) => {
		map();
		el.curentTurget.style.zIndex = '-1';
	});
} */
//map(1);


/* YA
function map(n) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525, 39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});

		let myPlacemark = new ymaps.Placemark([43.585525, 39.723062], {
		},{
			// Опции.
			//balloonContentHeader: 'Mistoun',
			//balloonContentBody: 'Москва, Николоямская 40с1',
			//balloonContentFooter: '+ 7(495) 507-54 - 90',
			//hasBalloon: true,
			//hideIconOnBalloonOpen: true,

			hasBalloon: false,
			hideIconOnBalloonOpen: false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		});
		myMap.geoObjects.add(myPlacemark);

		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');
	}
}
*/
//ScrollOnClick (Navigation)
/* let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
} */
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}

function _goto(target_block, speed, offset = 0) {
	let header = '.header';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeInOutCubic',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
}