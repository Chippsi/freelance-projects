"use strict";

//? User Agents
let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE ");
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

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
} //? WEBP supported


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
}); //?-------------------------------------------

function Body() {
  this.target = document.body;
  this.state = 'unlock';

  this.setState = () => {
    return this.state === 'unlock' ? this.lock() : this.unlock();
  };

  this.lock = () => {
    this.target.style.overflow = 'hidden';
    this.target.style.height = '100vh';
    return this.state = 'lock';
  };

  this.unlock = () => {
    this.target.style.overflow = 'auto';
    this.target.style.height = '';
    return this.state = 'unlock';
  };
}

function Tabs() {
  this.activeTab = null;
  this.activeBlock = null;
  this.indexActiveBlock = null;
  this.targets = null;
  this.blocks = null;

  this.init = callback => {
    this.targets = document.querySelectorAll('[data-tab]');
    this.blocks = document.querySelectorAll('[data-tabblock]');
    this.activeTab = document.querySelector('[data-tab][data-active]');
    this.activeBlock = document.querySelector('[data-tabblock][data-active]');
    this.indexActiveBlock = Array.from(this.blocks).findIndex(item => this.activeBlock);
    this.targets.forEach(tab => {
      tab.addEventListener('click', event => {
        if (event.currentTarget === this.activeTab) return;
        this.activeTab.removeAttribute('data-active');
        this.activeTab = event.currentTarget;
        this.activeTab.setAttribute('data-active', '');
        this.activeBlock.removeAttribute('data-active');
        this.indexActiveBlock = Array.from(this.blocks).findIndex(item => item.dataset['tabblock'] === this.activeTab.dataset.tab);
        this.activeBlock = this.blocks[this.indexActiveBlock];
        this.activeBlock.setAttribute('data-active', '');
      });

      if (callback) {
        tab.addEventListener('click', event => {
          callback();
        });
      }
    });
  };
}

const body = new Body();
const tabs = new Tabs();
tabs.init(activeSliderChange); //Menu

function Menu(delay, closeOverlay = true) {
  this.state = null;
  this.delay = delay;
  this.closeOverlay = closeOverlay;

  this.setState = (lock = true) => {
    if (lock) {
      body.setState();
    }

    this.icon.style.pointerEvents = 'none';
    this.menu.style.pointerEvents = 'none';
    this.icon.classList.toggle('iconMenu--active');
    this.menu.classList.toggle('menu--active');
    setTimeout(() => {
      this.icon.style.pointerEvents = '';
      this.menu.style.pointerEvents = '';
    }, delay);
    return this.state = this.state === 'closed' ? 'opened' : 'closed';
  };

  this.init = delay => {
    this.icon = document.querySelector('.iconMenu');
    this.menu = document.querySelector('.menu');
    if (this.icon && this.menu) this.icon.addEventListener('click', () => this.setState(this.delay));
    if (this.closeOverlay) this.menu.addEventListener('click', event => {
      if (event.target === this.menu) this.setState(this.delay);
    });
    return this.state = 'closed';
  };
}

const menu = new Menu(600);
menu.init(); //=================
// hero slider

let heroSlider = new Swiper('.heroSlider', {
  allowTouchMove: true,
  //!
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  loop: true,
  speed: 800,
  loopPreventsSlide: false,
  loopAdditionalSlides: 3,
  watchSlidesVisibility: true,
  preloadImages: false,
  controller: {
    by: 'slide'
  },
  lazy: {
    loadOnTransitionStart: true
  },
  on: {
    beforeInit: swiper => {
      swiper.el.querySelectorAll('.swiper-slide').forEach((el, index) => {
        el.querySelector('.heroSlider__count').innerHTML = index >= 10 ? index + 1 : `0${index + 1}`;
      });
    }
  }
});
let heroSliderPreview = new Swiper('.heroSliderPreview', {
  allowTouchMove: false,
  observer: true,
  observeParents: true,
  slidesPerView: 3,
  loop: true,
  speed: 800,
  loopPreventsSlide: false,
  loopAdditionalSlides: 3,
  watchSlidesVisibility: true,
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true
  },
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 4
    },
    992: {
      slidesPerView: 3
    }
  },
  on: {
    //document.querySelector('.heroSliderPreview').style.pointerEvents = 'none';
    beforeInit: swiper => {
      swiper.el.querySelectorAll('.swiper-slide').forEach((el, index) => {
        el.querySelector('.heroSliderPreview__count').innerHTML = index >= 10 ? index + 1 : `0${index + 1}`;

        if (!index) {
          el.parentNode.append(el.cloneNode(true));
          el.remove();
        }
      });
    },
    slideChangeTransitionStart: () => {
      document.querySelector('.heroSliderPreview').style.pointerEvents = 'none';
    },
    slideChangeTransitionEnd: () => {
      document.querySelector('.heroSliderPreview').style.pointerEvents = 'all';
    }
  }
});
heroSlider.controller.control = heroSliderPreview;

function slideChange() {
  heroSliderPreview.on('click', event => {
    let swipeCount = event.clickedIndex - event.activeIndex;

    if (swipeCount >= 0) {
      for (let i = 0; i <= swipeCount; i++) {
        heroSliderPreview.slideNext();
        heroSlider.slideNext();
      }

      return;
    }

    for (let i = 0; i > swipeCount; i--) {
      heroSliderPreview.slidePrev();
      heroSlider.slidePrev();
    }
  });
}

slideChange(); //product sliders

const productSliders = [];
let activeProductSlider;

function productSlidersInit(options) {
  const allSliders = document.querySelectorAll('.itemsSlider');
  if (!allSliders.length) return;
  allSliders.forEach(item => {
    if (!document.querySelector('.wrapperHome') && !document.querySelector('.wrapperComparison')) {
      const btns = item.closest('.newItems__body').querySelectorAll('.newItems__sliderBtn');
      options.navigation = {
        nextEl: btns[1],
        prevEl: btns[0]
      };
    }

    const newSlider = new Swiper(item, options);

    if (document.querySelector('.wrapperHome')) {
      newSlider.navigation.destroy();
    }

    productSliders.push(newSlider);
  });

  if (document.querySelector('.wrapperHome')) {
    activeProductSlider = productSliders[tabs.indexActiveBlock];
    activeProductSlider.navigation.init();
    activeProductSlider.navigation.update();
  }
}

productSlidersInit({
  observer: true,
  observeParents: true,
  slidesPerView: 4,
  speed: 600,
  navigation: {
    nextEl: '.newItems__sliderBtn--next',
    prevEl: '.newItems__sliderBtn--prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    }
  }
});

function activeSliderChange() {
  if (activeProductSlider === productSliders[tabs.indexActiveBlock]) return;
  activeProductSlider.navigation.destroy();
  activeProductSlider = productSliders[tabs.indexActiveBlock];
  activeProductSlider.navigation.init();
  activeProductSlider.navigation.update();
} // Compare Sliders


const compireSliderSettings = {
  observer: true,
  observeParents: true,
  speed: 600,
  simulateTouch: false,
  breakpoints: {
    0: {
      slidesPerView: 2,
      freeMode: true,
      freeModeMomentum: false
    },
    480: {
      freeMode: false,
      slidesPerView: 2
    },
    1220: {
      slidesPerView: 3
    }
  }
};
compareSlidersInit();

function compareSlidersInit() {
  const compareSliders = document.querySelectorAll('.compareSlider');
  const compareParametersSliders = document.querySelectorAll('.compareParametersSlider');
  const sliderBtns = document.querySelectorAll('.compareSlider__btn');
  if (!compareSliders.length && !compareParametersSliders.length && !sliderBtns.length) return;

  for (let i = 0; i < compareSliders.length; i++) {
    const compareSlider = new Swiper(compareSliders[i], {
      navigation: {
        nextEl: sliderBtns[i]
      },
      ...compireSliderSettings
    });
    const compareParametersSlider = new Swiper(compareParametersSliders[i], compireSliderSettings);
    compareSlider.controller.control = compareParametersSlider;
    compareParametersSlider.controller.control = compareSlider;
    compareSlider.on('slideChange', () => loopSlider(compareSlider));
  }
}

function loopSlider(slider) {
  let event = () => {
    slider.slideTo(0);
    slider.navigation.nextEl.removeEventListener('click', event);
  };

  if (slider.isEnd) slider.navigation.nextEl.addEventListener('click', event);
} //colors slider


function colorSliderInit() {
  let colorSlider = new Swiper('.colorsSlider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    speed: 800,
    freeMode: {
      enebled: true,
      momentumBounce: false,
      momentumRatio: 0.1
    }
  });
}

colorSliderInit();
/* let controller = new ScrollMagic.Controller(); */

/* function initMap() {
    let googleMap = new ScrollMagic.Scene({
        triggerElement: '.contacts__map-plug',
        triggerHook: 0.8,
    })
    .on('start', function(event) {
        map();
        googleMap.destroy(true);
    })
    .addTo(controller);
} */

const video = document.querySelector('.process__video');

if (video) {
  const videoBtn = document.querySelector('.process__videoPlay');
  const videoWrp = document.querySelector('.process__videoWrp');
  videoWrp.addEventListener('click', e => {
    e.preventDefault();
    videoBtn.style.transform = 'translate(-50%,-50%) scale(0)';
    video.play();
    video.controls = true;
  });
} // spollers


let accordion;

if (document.body.clientWidth < 768) {
  accordion = new Accordion('.accordion-container');
} else {
  accordion = null;
}

window.addEventListener('resize', e => {
  if (document.body.clientWidth < 768 && accordion === null) {
    accordion = new Accordion('.accordion-container');
  } else if (document.body.clientWidth > 768 && accordion !== null) {
    accordion.destroy();
    accordion = null;
  }
});
const comments = document.querySelectorAll('.history__commentsContainer');

if (comments.length) {
  const accordHistory = new Accordion('.accordHistory');
  comments.forEach(el => new Accordion(el));
} // menu


window.addEventListener('scroll', function () {
  if (window.pageYOffset > 800 && document.body.clientWidth >= 992 && menu.state === 'closed') {
    menu.setState(false);
  } else if (window.pageYOffset < 800 && document.body.clientWidth >= 992 && menu.state === 'opened') {
    menu.setState(false);
  }
});
document.querySelector('.menu__close').addEventListener('click', menu.setState); // placeholder

function placeholder() {
  let inputs = document.querySelectorAll('[data-value]');
  if (!inputs.length) return;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.value = input.dataset.value;
    input.addEventListener('click', e => {
      if (input.value === input.dataset.value) {
        input.value = '';
      }
    });
    input.addEventListener('blur', e => {
      console.log(input.value === '');

      if (input.value === '') {
        input.value = input.dataset.value;
      }
    });
  }
}

placeholder(); //selects

function selectInit() {
  document.querySelectorAll('select').forEach(el => {
    new Choices(el, {
      searchEnabled: false
    });
  });
  document.querySelectorAll('.choices').forEach(el => {
    let placeholderWidth;
    el.addEventListener('click', event => {
      if (document.body.clientWidth < 992) return;

      if (!placeholderWidth) {
        placeholderWidth = el.offsetWidth + 'px';
        el.style.width = placeholderWidth;
      }
    });
  });
}

selectInit(); // products grid

function setProductsGrid() {
  const productsBody = document.querySelector('.productsTmp__body');
  const btns = document.querySelectorAll('.productsTmp__layoutBtn');
  let activeBtn = document.querySelector('.productsTmp__layoutBtn._active');

  if (btns.length) {
    for (const btn of btns) {
      btn.addEventListener('click', () => {
        productsBody.classList.toggle('productsTmp__body--line');
        btn.classList.add('_active');
        activeBtn.classList.remove('_active');
        activeBtn = btn;
      });
    }
  }
}

setProductsGrid(); // sort dropdown

function setSortDropdownState(callback) {
  document.querySelectorAll('.productsTmp__sortItem--drop').forEach(parentItem => {
    const target = parentItem.querySelector('span');
    target.addEventListener('click', e => {
      parentItem.classList.toggle('_active');
    });
    parentItem.addEventListener('blur', e => {
      parentItem.classList.remove('_active');
    });
    parentItem.querySelectorAll('.productsTmp__sortItem').forEach(target => {
      target.addEventListener('click', item => {
        parentItem.classList.remove('_active');
        callback();
      });
    });
  });
  document.querySelectorAll('.productsTmp__sortBox > .productsTmp__sortItem').forEach(item => {
    if (item.classList.contains('productsTmp__sortItem--drop')) return;
    item.addEventListener('click', callback);
  });
}

setSortDropdownState(() => {
  //! ?????????????? ???????????????????? ?????????????? ???? ?????????????? ????????????????????
  console.log('????????????????????');
});

if (document.querySelector('.history')) {
  function emoji() {
    const textarea = document.querySelector('.history__textarea');
    new FgEmojiPicker({
      trigger: '.history__smileBox',
      dir: 'js/',
      insertInto: document.querySelector('textarea'),
      position: ['bottom', 'left'],

      emit(obj, triggerElement) {
        if (textarea.value === textarea.dataset.value) {
          textarea.value = '';
        }
      }

    });
  }

  emoji();
} // counters


function countersInit() {
  const counters = document.querySelectorAll('.productCalc__counter');

  for (const counter of counters) {
    const minus = counter.querySelector('.productCalc__counterBtn--minus');
    const plus = counter.querySelector('.productCalc__counterBtn--plus');
    const input = counter.querySelector('.productCalc__inpCount');
    plus.addEventListener('click', () => input.value = +input.value + 1);
    minus.addEventListener('click', () => input.value > 1 ? input.value = +input.value - 1 : false);
    input.addEventListener('blur', () => input.value < 1 || isNaN(Number(input.value)) ? input.value = 1 : false);
  }
}

countersInit(); //textarea

const tareas = document.querySelectorAll('.textarea');
tareas.forEach(area => {
  area.addEventListener('focus', () => {
    area.parentElement.classList.add('_focus');
  });
  area.addEventListener('blur', () => {
    area.parentElement.classList.remove('_focus');
  });
}); //order form

function orderFormInit() {
  const choiceTypeUser = document.querySelector('#usertype');
  if (!choiceTypeUser) return;
  const entityInput = choiceTypeUser.querySelector('#entity');
  const allInputs = choiceTypeUser.querySelectorAll('input');
  allInputs.forEach(input => {
    input.addEventListener('change', e => {
      if (entityInput.checked) {
        document.querySelector('.entityReq').style.display = 'block';
        return;
      }

      document.querySelector('.entityReq').style.display = 'none';
    });
  });
}

orderFormInit(); //gallery

const glCount = document.querySelector('.prodCard__thumbCount');

if (glCount) {
  glCount.innerHTML = `+${fsLightbox.props.sources.length - 3}`;
} //tooltip


function tooltipsInit() {
  const tooltips = document.querySelectorAll('.tippy');
  tooltips.forEach(el => {
    tippy(el, {
      content: el.dataset.tippy
    });
  });
}

tooltipsInit(); //sticky sidebar

let floatSidebar;

function sideBar() {
  const sidebar = document.querySelector('.prodCard__body');
  const element = document.querySelector('.prodCard__sideBody');
  let sticky = new hcSticky(element, {
    stickTo: sidebar,
    top: 140,
    bottom: 20,
    responsive: {
      992: {
        disable: true
      }
    }
  });
}

sideBar(); // Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this; // ???????????? ????????????????


  this.??bjects = [];
  this.daClassname = "_dynamic_adapt_"; // ???????????? DOM-??????????????????

  this.nodes = document.querySelectorAll("[data-da]"); // ???????????????????? ??bjects ????????????????

  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(",");
    const ??bject = {};
    ??bject.element = node;
    ??bject.parent = node.parentNode;
    ??bject.destination = document.querySelector(dataArray[0].trim());
    ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
    ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
    this.??bjects.push(??bject);
  }

  this.arraySort(this.??bjects); // ???????????? ???????????????????? ??????????-????????????????

  this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  }); // ?????????????????????? ?????????????????? ???? ??????????-????????????
  // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????

  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1]; // ???????????? ???????????????? ?? ???????????????????? ????????????????????????

    const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, ??bjectsFilter);
    });
    this.mediaHandler(matchMedia, ??bjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.moveTo(??bject.place, ??bject.element, ??bject.destination);
    }
  } else {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];

      if (??bject.element.classList.contains(this.daClassname)) {
        this.moveBack(??bject.parent, ??bject.element, ??bject.index);
      }
    }
  }
}; // ?????????????? ??????????????????????


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
}; // ?????????????? ????????????????


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);

  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}; // ?????????????? ?????????????????? ?????????????? ???????????? ????????????????


DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}; // ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max


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
da.init(); //ScrollOnClick (Navigation)

let link = document.querySelectorAll('._goto-block');

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
    });
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

        if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
          let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

          for (let index = 0; index < current_links.length; index++) {
            let current_link = current_links[index];
            current_link.classList.add('_active');
          }
        }
      }
    }
  });
} //ScrollOnClick (Simple)


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
  let header = '.header'; //OffsetHeader
  //if (window.innerWidth < 992) {
  //	header = 'header';
  //}

  let options = {
    speedAsDuration: true,
    speed: speed,
    header: header,
    offset: offset,
    easing: 'easeInOutCubic'
  };
  let scr = new SmoothScroll();
  scr.animateScroll(target_block, '', options);
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

window.addEventListener('scroll', scroll_scroll);

function scroll_scroll() {
  //scr_body.setAttribute('data-scroll', pageYOffset);
  let body = document.body;
  let src_value = pageYOffset;
  let header = document.querySelector('header.header');
  let scroll = false;

  if (header !== null) {
    if (src_value > 10) {
      header.classList.add('_scroll');
    } else {
      header.classList.remove('_scroll');
    }
  }
}
/* function map(n) {
	ymaps.ready(init)
	function init() {
		// ???????????????? ??????????.
		let searchInput = new ymaps.SuggestView('adres')
		let myMap = new ymaps.Map("map", {
			center: [47.222080, 39.720353],
			zoom: 12
		})

		let searchControl = new ymaps.control.SearchControl({
			options: {
				// ?????????? ?????????????????????????? ?????????? ???? ?????????????????? ?? ????????????????????????.
				provider: 'yandex#map',
				noSuggestPanel: true,
				noPopup: true,
				noPlacemark: true
			},
		})

		let myPlacemark = new ymaps.Placemark([47.222080, 39.720353], {
		}, {
			preset: 'islands#redIcon'
		})
		myMap.controls.add(searchControl)
		myMap.geoObjects.add(myPlacemark)
		myMap.behaviors.disable('scrollZoom')
		myMap.behaviors.disable('drag')

		searchInput.events.add(['select'], (event) => {
			console.log(event.get('item').value)
			searchControl.search(event.get('item').value).then((res) => {
				const newCoords = res.geoObjects.get(0).geometry.getCoordinates()
				myPlacemark.geometry.setCoordinates(newCoords)
				myMap.setCenter(newCoords)
			})
		})
	}
}
 */