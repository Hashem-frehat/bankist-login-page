'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section4 = document.querySelector('#section--4');
const navlinksscr = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelectorAll(
  '.operations__tab-container button'
);
const tabscontent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const slider = document.querySelectorAll('.slide');
// const idlink = document.querySelectorAll('id');

// button  open account and close \\\\\\\\\\\\\\\\\\\\

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// learnmore scroler \\\\\\\\\\\\\\\\\\\\\\\\\\

btnscrollto.addEventListener('click', function () {
  // const scrolltosection = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: scrolltosection.left + window.pageXOffset,
  //   top: scrolltosection.top + window.pageYOffset,
  //   behavior: 'smooth',
  section1.scrollIntoView({ behavior: 'smooth' });
});

// window calc scroler  \\\\\\\\\\\\\\\\\\\\\\\\\

// window.addEventListener('scroll', () => {
//   let scrolltop = document.documentElement.scrollTop;
//   let scrolltopp = Number.parseInt(scrolltop);
//   console.log(scrolltopp);
// });

// nav link scrooler  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// if selected the parent of element

navlinksscr.addEventListener('click', function (el) {
  el.preventDefault();
  console.log(el.target);
  if (el.target.classList.contains('nav__link')) {
    const id = el.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// if selecteed just the element

// navlinksscr.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// tabbed component \\\\\\\\\\\\\\\\\\\\\\\\\

const tabarray = Array.from(tabscontainer);
const tabsscontent = Array.from(tabscontent);

tabarray.forEach(ele => {
  ele.addEventListener('click', function (e) {
    tabarray.forEach(ele => {
      ele.classList.remove('operations__tab--active');
    });
    e.target.classList.add('operations__tab--active');

    tabsscontent.forEach(cnt => {
      cnt.style.display = 'none';
    });

    document.querySelector(e.target.dataset.tab).style.display = 'block';
  });
});

// nav links hover

nav.addEventListener('mouseover', function (e) {
  const link = e.target;
  const sibling = link.closest('.nav').querySelectorAll('.nav__link');

  sibling.forEach(function (el) {
    if (el !== link) {
      el.style.opacity = 0.5;
    }
  });
});
nav.addEventListener('mouseout', function (e) {
  const link = e.target;
  const sibling = link.closest('.nav').querySelectorAll('.nav__link');

  const logo = link.closest('.nav').querySelector('img');

  sibling.forEach(function (el) {
    if (el !== link) {
      el.style.opacity = 1;
    }
  });
});

const stickynav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headeropserver = new IntersectionObserver(stickynav, {
  root: null,
  threshhold: 0,
});

headeropserver.observe(header);

// show all section

const allsection = document.querySelectorAll('.section');
const callbacksection = function (entries) {
  // console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionopserver = new IntersectionObserver(callbacksection, {
  root: null,
  threshold: 0.15,
});
allsection.forEach(function (section) {
  sectionopserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loding image

const imgtarget = document.querySelectorAll(`img[data-src]`);
const loadimg = function (entries, obsever) {
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  obsever.unobserve(entry.target);
};
const imgobserve = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
});

imgtarget.forEach(function (img) {
  imgobserve.observe(img);
});

// slider \\\\\\\\\\\\\\\
const maxslide = slider.length;
const rightbtn = document.querySelector('.slider__btn--right');
const lefttbtn = document.querySelector('.slider__btn--left');
let curentslide = 0;
slider.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

rightbtn.addEventListener('click', function () {
  if (curentslide === maxslide - 1) {
    curentslide = 0;
  } else {
    curentslide++;
  }

  slider.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curentslide)}%)`)
  );
});
lefttbtn.addEventListener('click', function () {
  if (curentslide === 0) {
    curentslide = maxslide - 1;
  } else {
    curentslide--;
  }

  slider.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curentslide)}%)`)
  );
});
