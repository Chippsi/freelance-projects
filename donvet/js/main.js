let unlock = !0
function body_lock(e) {
	document.querySelector("body").classList.contains("_lock")
		? body_lock_remove(e)
		: body_lock_add(e)
}
function body_lock_remove(e) {
	let t = document.querySelector("body")
	if (unlock) {
		let o = document.querySelectorAll("._lp")
		setTimeout(() => {
			for (let e = 0; e < o.length; e++) {
				o[e].style.paddingRight = "0px"
			}
			; (t.style.paddingRight = "0px"), t.classList.remove("_lock")
		}, e),
			(unlock = !1),
			setTimeout(function () {
				unlock = !0
			}, e)
	}
}
function body_lock_add(e) {
	let t = document.querySelector("body")
	if (unlock) {
		let o = document.querySelectorAll("._lp")
		for (let e = 0; e < o.length; e++) {
			o[e].style.paddingRight =
				window.innerWidth -
				document.querySelector(".wrapper").offsetWidth +
				"px"
		}
		; (t.style.paddingRight =
			window.innerWidth -
			document.querySelector(".wrapper").offsetWidth +
			"px"),
			t.classList.add("_lock"),
			(unlock = !1),
			setTimeout(function () {
				unlock = !0
			}, e)
	}
}
let spollers = document.querySelectorAll("._spoller"),
	spollersGo = !0
if (spollers.length > 0)
	for (let e = 0; e < spollers.length; e++) {
		const t = spollers[e]
		t.addEventListener("click", function (e) {
			if (spollersGo) {
				if (
					((spollersGo = !1),
						t.classList.contains("_spoller-992") && window.innerWidth > 992)
				)
					return !1
				if (t.classList.contains("_spoller-768") && window.innerWidth > 768)
					return !1
				if (t.closest("._spollers").classList.contains("_one")) {
					let e = t.closest("._spollers").querySelectorAll("._spoller")
					for (let o = 0; o < e.length; o++) {
						let l = e[o]
						l != t &&
							(l.classList.remove("_active"), _slideUp(l.nextElementSibling))
					}
				}
				t.classList.toggle("_active"),
					_slideToggle(t.nextElementSibling),
					setTimeout(function () {
						spollersGo = !0
					}, 500)
			}
		})
	}
let popup_link = document.querySelectorAll("._popup-link"),
	popups = document.querySelectorAll(".popup"),
	popupCard = document.querySelector(".popup_card .popup__body > .content")
for (let e = 0; e < popup_link.length; e++) {
	const t = popup_link[e]
	t.addEventListener("click", function (e) {
		if (unlock) {
			let o = t.getAttribute("href").replace("#", ""),
				l = t.getAttribute("data-video")
			if ("card" === o) {
				popupCard.innerHTML = ""
				let t = e.currentTarget.cloneNode(!0)
				popupCard.append(t)
			}
			popup_open(o, l)
		}
		e.preventDefault()
	})
}
for (let e = 0; e < popups.length; e++) {
	popups[e].addEventListener("click", function (e) {
		e.target.closest(".popup__body") || popup_close(e.target.closest(".popup"))
	})
}
function popup_open(e, t = "") {
	document.querySelectorAll(".popup._active").length > 0 && popup_close("", !1)
	let o = document.querySelector(".popup_" + e)
	if (o && unlock) {
		if ("" != t && null != t) {
			document
				.querySelector(".popup_video")
				.querySelector(".popup__video").innerHTML =
				'<iframe src="https://www.youtube.com/embed/' +
				t +
				'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
		}
		document.querySelector(".menu__body._active") || body_lock_add(500),
			o.classList.add("_active"),
			history.pushState("", "", "#" + e)
	}
}
function popup_close(e, t = !0) {
	if (unlock) {
		if (e) {
			let t = e.querySelector(".popup__video")
			t && (t.innerHTML = ""), e.classList.remove("_active")
		} else
			for (let e = 0; e < popups.length; e++) {
				const t = popups[e]
				let o = t.querySelector(".popup__video")
				o && (o.innerHTML = ""), t.classList.remove("_active")
			}
		!document.querySelector(".menu__body._active") &&
			t &&
			body_lock_remove(500),
			history.pushState("", "", window.location.href.split("#")[0])
	}
}
let popup_close_icon = document.querySelectorAll(".popup__close,._popup-close")
if (popup_close_icon)
	for (let e = 0; e < popup_close_icon.length; e++) {
		const t = popup_close_icon[e]
		t.addEventListener("click", function () {
			popup_close(t.closest(".popup"))
		})
	}
document.addEventListener("keydown", function (e) {
	"Escape" === e.code && popup_close()
})
let _slideUp = (e, t = 500) => {
	; (e.style.transitionProperty = "height, margin, padding"),
		(e.style.transitionDuration = t + "ms"),
		(e.style.height = e.offsetHeight + "px"),
		e.offsetHeight,
		(e.style.overflow = "hidden"),
		(e.style.height = 0),
		(e.style.paddingTop = 0),
		(e.style.paddingBottom = 0),
		(e.style.marginTop = 0),
		(e.style.marginBottom = 0),
		window.setTimeout(() => {
			; (e.style.display = "none"),
				e.style.removeProperty("height"),
				e.style.removeProperty("padding-top"),
				e.style.removeProperty("padding-bottom"),
				e.style.removeProperty("margin-top"),
				e.style.removeProperty("margin-bottom"),
				e.style.removeProperty("overflow"),
				e.style.removeProperty("transition-duration"),
				e.style.removeProperty("transition-property"),
				e.classList.remove("_slide")
		}, t)
},
	_slideDown = (e, t = 500) => {
		e.style.removeProperty("display")
		let o = window.getComputedStyle(e).display
		"none" === o && (o = "flex"), (e.style.display = o)
		let l = e.offsetHeight
			; (e.style.overflow = "hidden"),
				(e.style.height = 0),
				(e.style.paddingTop = 0),
				(e.style.paddingBottom = 0),
				(e.style.marginTop = 0),
				(e.style.marginBottom = 0),
				e.offsetHeight,
				(e.style.transitionProperty = "height, margin, padding"),
				(e.style.transitionDuration = t + "ms"),
				(e.style.height = l + "px"),
				e.style.removeProperty("padding-top"),
				e.style.removeProperty("padding-bottom"),
				e.style.removeProperty("margin-top"),
				e.style.removeProperty("margin-bottom"),
				window.setTimeout(() => {
					e.style.removeProperty("height"),
						e.style.removeProperty("overflow"),
						e.style.removeProperty("transition-duration"),
						e.style.removeProperty("transition-property"),
						e.classList.remove("_slide")
				}, t)
	},
	_slideToggle = (e, t = 500) => {
		if (!e.classList.contains("_slide"))
			return (
				e.classList.add("_slide"),
				"none" === window.getComputedStyle(e).display
					? _slideDown(e, t)
					: _slideUp(e, t)
			)
	},
	forms = document.querySelectorAll("form")
if (forms.length > 0)
	for (let e = 0; e < forms.length; e++) {
		forms[e].addEventListener("submit", form_submit)
	}
async function form_submit(e) {
	let t = e.target.closest("form")
	if (0 == form_validate(t)) {
		let o = t.getAttribute("action") ? t.getAttribute("action").trim() : "#",
			l = t.getAttribute("method") ? t.getAttribute("method").trim() : "GET"
		const n = t.getAttribute("data-message")
		if (t.getAttribute("data-ajax")) {
			e.preventDefault()
			let s = new FormData(t)
			t.classList.add("_sending")
			let i = await fetch(o, { method: l, body: s })
			if (i.ok) {
				await i.json()
				t.classList.remove("_sending"),
					n && popup_open("_" + n + "-message"),
					form_clean(t)
			} else alert("????????????"), t.classList.remove("_sending")
		}
	} else {
		let o = t.querySelectorAll("._error")
		o && t.classList.contains("_goto-error") && _goto(o[0], 1e3, 50),
			e.preventDefault()
	}
}
function form_validate(e) {
	let t = 0,
		o = e.querySelectorAll("._req")
	if (o.length > 0)
		for (let e = 0; e < o.length; e++) {
			const l = o[e]
			_is_hidden(l) || (t += form_validate_input(l))
		}
	return t
}
function form_validate_input(e) {
	let t = 0,
		o = e.getAttribute("data-value")
	if ("email" == e.getAttribute("name") || e.classList.contains("_email")) {
		if (e.value != o) {
			let t = e.value.replace(" ", "")
			e.value = t
		}
		email_test(e) || e.value == o
			? (form_add_error(e), t++)
			: form_remove_error(e)
	} else
		"checkbox" == e.getAttribute("type") && 0 == e.checked
			? (form_add_error(e), t++)
			: "" == e.value || e.value == o
				? (form_add_error(e), t++)
				: form_remove_error(e)
	return t
}
function form_add_error(e) {
	e.classList.add("_error"), e.parentElement.classList.add("_error")
	let t = e.parentElement.querySelector(".form__error")
	t && e.parentElement.removeChild(t)
	let o = e.getAttribute("data-error")
	o &&
		"" != o &&
		e.parentElement.insertAdjacentHTML(
			"beforeend",
			'<div class="form__error">' + o + "</div>"
		)
}
function form_remove_error(e) {
	e.classList.remove("_error"), e.parentElement.classList.remove("_error")
	let t = e.parentElement.querySelector(".form__error")
	t && e.parentElement.removeChild(t)
}
function form_clean(e) {
	let t = e.querySelectorAll("input,textarea")
	for (let e = 0; e < t.length; e++) {
		const o = t[e]
		o.parentElement.classList.remove("_focus"),
			o.classList.remove("_focus"),
			(o.value = o.getAttribute("data-value"))
	}
	let o = e.querySelectorAll(".checkbox__input")
	if (o.length > 0)
		for (let e = 0; e < o.length; e++) {
			o[e].checked = !1
		}
	let l = e.querySelectorAll("select")
	if (l.length > 0)
		for (let e = 0; e < l.length; e++) {
			const t = l[e],
				o = t.getAttribute("data-default")
				; (t.value = o), select_item(t)
		}
}
let viewPass = document.querySelectorAll(".form__viewpass")
for (let e = 0; e < viewPass.length; e++) {
	const t = viewPass[e]
	t.addEventListener("click", function (e) {
		t.classList.contains("_active")
			? t.parentElement.querySelector("input").setAttribute("type", "password")
			: t.parentElement.querySelector("input").setAttribute("type", "text"),
			t.classList.toggle("_active")
	})
}
let selects = document.getElementsByTagName("select")
function selects_init() {
	for (let e = 0; e < selects.length; e++) {
		select_init(selects[e])
	}
	document.addEventListener("click", function (e) {
		selects_close(e)
	}),
		document.addEventListener("keydown", function (e) {
			"Escape" === e.code && selects_close(e)
		})
}
function selects_close(e) {
	const t = document.querySelectorAll(".select")
	if (!e.target.closest(".select"))
		for (let e = 0; e < t.length; e++) {
			const o = t[e],
				l = o.querySelector(".select__options")
			o.classList.remove("_active"), _slideUp(l, 100)
		}
}
function select_init(e) {
	const t = e.parentElement,
		o = e.getAttribute("class"),
		l = e.querySelector("option:checked")
	e.setAttribute("data-default", l.value),
		(e.style.display = "none"),
		t.insertAdjacentHTML(
			"beforeend",
			'<div class="select select_' + o + '"></div>'
		),
		e.parentElement.querySelector(".select").appendChild(e),
		select_item(e)
}
function select_item(e) {
	const t = e.parentElement,
		o = t.querySelector(".select__item"),
		l = e.querySelectorAll("option"),
		n = e.querySelector("option:checked").text,
		s = e.getAttribute("data-type")
	o && o.remove()
	let i = ""
		; (i =
			"input" == s
				? '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' +
				n +
				'" data-error="????????????" data-value="' +
				n +
				'" class="select__input"></div>'
				: '<div class="select__value icon-select-arrow"><span>' +
				n +
				"</span></div>"),
			t.insertAdjacentHTML(
				"beforeend",
				'<div class="select__item"><div class="select__title">' +
				i +
				'</div><div class="select__options">' +
				select_get_options(l) +
				"</div></div></div>"
			),
			select_actions(e, t)
}
function select_actions(e, t) {
	const o = t.querySelector(".select__item"),
		l = t.querySelector(".select__options"),
		n = t.querySelectorAll(".select__option"),
		s = e.getAttribute("data-type"),
		i = t.querySelector(".select__input")
	o.addEventListener("click", function () {
		let e = document.querySelectorAll(".select")
		for (let t = 0; t < e.length; t++) {
			const l = e[t],
				n = l.querySelector(".select__options")
			l != o.closest(".select") &&
				(l.classList.remove("_active"), _slideUp(n, 100))
		}
		_slideToggle(l, 100), t.classList.toggle("_active")
	})
	for (let o = 0; o < n.length; o++) {
		const l = n[o],
			r = l.getAttribute("data-value"),
			c = l.innerHTML
		"input" == s
			? i.addEventListener("keyup", select_search)
			: l.getAttribute("data-value") == e.value && (l.style.display = "none"),
			l.addEventListener("click", function () {
				for (let e = 0; e < n.length; e++) {
					n[e].style.display = "block"
				}
				"input" == s
					? ((i.value = c), (e.value = r))
					: ((t.querySelector(".select__value").innerHTML =
						"<span>" + c + "</span>"),
						(e.value = r),
						(l.style.display = "none"))
			})
	}
}
function select_get_options(e) {
	if (e) {
		let t = ""
		for (let o = 0; o < e.length; o++) {
			const l = e[o],
				n = l.value
			if ("" != n) {
				t =
					t +
					'<div data-value="' +
					n +
					'" class="select__option">' +
					l.text +
					"</div>"
			}
		}
		return t
	}
}
function select_search(e) {
	e.target.closest(".select ").querySelector(".select__options")
	let t = e.target.closest(".select ").querySelectorAll(".select__option"),
		o = e.target.value.toUpperCase()
	for (let e = 0; e < t.length; e++) {
		let l = t[e]
			; (l.textContent || l.innerText).toUpperCase().indexOf(o) > -1
				? (l.style.display = "")
				: (l.style.display = "none")
	}
}
function selects_update_all() {
	let e = document.querySelectorAll("select")
	if (e)
		for (let t = 0; t < e.length; t++) {
			select_item(e[t])
		}
}
selects.length > 0 && selects_init()
let inputs = document.querySelectorAll("input[data-value],textarea[data-value]")
function inputs_init(e) {
	if (e.length > 0)
		for (let t = 0; t < e.length; t++) {
			const o = e[t],
				l = o.getAttribute("data-value")
			input_placeholder_add(o),
				"" != o.value && o.value != l && input_focus_add(o),
				o.addEventListener("focus", function (e) {
					o.value == l && (input_focus_add(o), (o.value = "")),
						"pass" === o.getAttribute("data-type") &&
						o.setAttribute("type", "password"),
						o.classList.contains("_date"),
						o.classList.contains("_phone") &&
						(o.classList.add("_mask"),
							Inputmask("+375 (99) 9999999", {
								clearIncomplete: !0,
								clearMaskOnLostFocus: !0,
								onincomplete: function () {
									input_clear_mask(o, l)
								},
							}).mask(o)),
						o.classList.contains("_digital") &&
						(o.classList.add("_mask"),
							Inputmask("9{1,}", {
								placeholder: "",
								clearIncomplete: !0,
								clearMaskOnLostFocus: !0,
								onincomplete: function () {
									input_clear_mask(o, l)
								},
							}).mask(o)),
						form_remove_error(o)
				}),
				o.addEventListener("blur", function (e) {
					"" == o.value &&
						((o.value = l),
							input_focus_remove(o),
							o.classList.contains("_mask") && input_clear_mask(o, l),
							"pass" === o.getAttribute("data-type") &&
							o.setAttribute("type", "text"))
				}),
				o.classList.contains("_date") &&
				datepicker(o, {
					customDays: ["????", "????", "????", "????", "????", "????", "????"],
					customMonths: [
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
						"??????",
					],
					formatter: (e, t, o) => {
						const l = t.toLocaleDateString()
						e.value = l
					},
					onSelect: function (e, t, o) {
						input_focus_add(e.el)
					},
				})
		}
}
function input_placeholder_add(e) {
	const t = e.getAttribute("data-value")
	"" == e.value && "" != t && (e.value = t)
}
function input_focus_add(e) {
	e.classList.add("_focus"), e.parentElement.classList.add("_focus")
}
function input_focus_remove(e) {
	e.classList.remove("_focus"), e.parentElement.classList.remove("_focus")
}
function input_clear_mask(e, t) {
	e.inputmask.remove(), (e.value = t), input_focus_remove(e)
}
inputs_init(inputs)
let quantityButtons = document.querySelectorAll(".quantity__button")
if (quantityButtons.length > 0)
	for (let e = 0; e < quantityButtons.length; e++) {
		const t = quantityButtons[e]
		t.addEventListener("click", function (e) {
			let o = parseInt(t.closest(".quantity").querySelector("input").value)
			t.classList.contains("quantity__button_plus")
				? o++
				: (o -= 1) < 1 && (o = 1),
				(t.closest(".quantity").querySelector("input").value = o)
		})
	}
const priceSlider = document.querySelector(".price-filter__slider")
if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [0, 2e5],
		connect: !0,
		tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
		range: { min: [0], max: [2e5] },
	})
	const e = document.getElementById("price-start"),
		t = document.getElementById("price-end")
	function setPriceValues() {
		let o, l
		"" != e.value && (o = e.value),
			"" != t.value && (l = t.value),
			priceSlider.noUiSlider.set([o, l])
	}
	e.addEventListener("change", setPriceValues),
		t.addEventListener("change", setPriceValues)
}
let ua = window.navigator.userAgent,
	msie = ua.indexOf("MSIE "),
	isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i)
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i)
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i)
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i)
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i)
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			)
		},
	}
function isIE() {
	return (
		(ua = navigator.userAgent).indexOf("MSIE ") > -1 ||
		ua.indexOf("Trident/") > -1
	)
}
function testWebP(e) {
	let t = new Image()
		; (t.onload = t.onerror = function () {
			e(2 == t.height)
		}),
			(t.src =
				"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA")
}
isIE() && document.querySelector("body").classList.add("ie"),
	isMobile.any() && document.querySelector("body").classList.add("_touch"),
	testWebP(function (e) {
		1 == e
			? document.querySelector("body").classList.add("_webp")
			: document.querySelector("body").classList.add("_no-webp")
	})
let slider_promo = new Swiper(".promoSlider", {
	observer: !0,
	observeParents: !0,
	autoHeight: !0,
	speed: 400,
	a11y: !1,
	slidesPerView: 1,
	pagination: {
		el: ".promoSlider__pagination",
		type: "bullets",
		clickable: "true",
	},
	breakpoints: { 320: { spaceBetween: 50 } },
})
function initMedia(e, t) {
	e.forEach((e) => {
		window.matchMedia("(max-width:" + e + "px)").addListener(t)
	})
}
let iconMenu = document.querySelector(".iconMenu"),
	closeMenu = document.querySelector(".iconMenu--close"),
	menuBody = document.querySelector(".menu__body"),
	menu = document.querySelector(".menu")
if (null != iconMenu) {
	let e = 500,
		t = document.querySelector(".menu__body")
	iconMenu.addEventListener("click", function (o) {
		unlock &&
			(body_lock(e),
				iconMenu.classList.toggle("_active"),
				t.classList.toggle("_active"),
				menu.classList.toggle("_active"),
				document.querySelector(".header__row--top").classList.toggle("_active"))
	})
}
function menu_close() {
	iconMenu.classList.remove("_active"),
		menuBody.classList.remove("_active"),
		menu.classList.remove("_active")
}
closeMenu.addEventListener("click", function (e) {
	menu_close(),
		document.querySelector(".header__row--top").classList.remove("_active"),
		body_lock(500)
})
let myMap = null
function map(e) {
	myMap = new ymaps.Map(
		"map",
		{ controls: ["zoomControl"], center: [47.225101, 39.642132], zoom: 16 },
		{
			zoomControlPosition: { right: "50px", top: "50px" },
			zoomControlSize: "large",
		}
	)
	let t = new ymaps.Placemark(
		[47.225101, 39.642132],
		{
			iconCaption: "?????????????????????? ??????????, 121",
			hasBalloon: !1,
			hideIconOnBalloonOpen: !1,
		},
		{ preset: "islands#redDotIcon" }
	)
	myMap.geoObjects.add(t), myMap.behaviors.disable("scrollZoom")
	const o = myMap.getGlobalPixelCenter(),
		l = initMedia
	function n(e) {
		window.innerWidth <= 479
			? myMap.setGlobalPixelCenter([10236151.990771443, 5898517.634751318])
			: window.innerWidth <= 991
				? myMap.setGlobalPixelCenter([10236055.920138508, 5898530.350083349])
				: myMap.setGlobalPixelCenter([o[0], o[1]])
	}
	n(), l([991, 479], n)
}
let controller = new ScrollMagic.Controller()
if (document.querySelector("#map")) {
	const e = document.querySelector("[data-map]")
	let t = new ScrollMagic.Scene({ triggerElement: ".reviews", triggerHook: 1 })
		.on("start", function (o) {
			e.setAttribute("src", e.dataset.map), t.destroy(!0)
		})
		.addTo(controller)
	function onloadMap(e) {
		let t = new ScrollMagic.Scene({
			triggerElement: ".contacts",
			triggerHook: 0.8,
		})
			.on("start", function (e) {
				map(!0), t.destroy(!0)
			})
			.addTo(controller)
	}
}
let serviceItem = document.querySelector(".menu__item--drop"),
	serviceLink = document.querySelector(".menu__link--drop")
if (serviceItem && serviceLink) {
	let e = serviceItem.querySelector(".menu__dropBox")
	e &&
		serviceLink.addEventListener("click", (t) => {
			t.preventDefault(),
				document.body.classList.contains("_touch") &&
				((serviceLink.style.pointerEvents = "none"),
					window.innerWidth < 768
						? (_slideToggle(e),
							setTimeout(() => {
								serviceLink.style.pointerEvents = "all"
							}, 500))
						: window.innerWidth >= 768 &&
						document.body.classList.contains("_touch") &&
						((e.style.display = "block"),
							serviceItem.classList.contains("_active") &&
							(e.style.display = "none"),
							(serviceLink.style.pointerEvents = "all")),
					serviceItem.classList.toggle("_active"))
		})
}
document.querySelector(".menu") &&
	initMedia([767], (e) => {
		!e.matches &&
			unlock &&
			document.querySelector(".menu._active") &&
			(body_lock(0),
				iconMenu.classList.toggle("_active"),
				menuBody.classList.toggle("_active"),
				menu.classList.toggle("_active"),
				document.querySelector(".header__row--top").classList.toggle("_active"))
	})
let goto_links = document.querySelectorAll("._goto")
if (goto_links)
	for (let e = 0; e < goto_links.length; e++) {
		let t = goto_links[e]
		t.addEventListener("click", function (e) {
			let o = t.getAttribute("href").replace("#", "")
			_goto(document.querySelector("." + o), 800), e.preventDefault()
		})
	}
function _goto(e, t, o = 50) {
	let l = { speedAsDuration: !0, speed: t, offset: o, easing: "easeInOutCubic" }
	new SmoothScroll().animateScroll(e, "", l)
}
function scroll_scroll() {
	let e = pageYOffset,
		t = document.querySelector("header.header")
	null !== t &&
		(e > 10 ? t.classList.add("_scroll") : t.classList.remove("_scroll"))
}
window.addEventListener("scroll", scroll_scroll)
