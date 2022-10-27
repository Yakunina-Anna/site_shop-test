// document.getElementsByClassName('header__menu').onclick = function () {
//    document.getElementById('main').classList.add('main--main-bg');
//    document.getElementsByClassName('main').classList.toggle('main--main-bg');
// }

// const list = document.querySelectorAll('.CatalogMenu li a')
// list.forEach(item => {
//    item.addEventListener('click', (e) => {
//       list.forEach(el => { el.classList.remove('active'); });
//       item.classList.add('active')
//    })
// })
// const menu = document.querySelector(".header__search");
// const button = document.querySelector(".header__search-btn");

// window.addEventListener('click', function (e) {
//    document.querySelector(".header__search-btn").onclick = function () {
//       if (!menu.contains(e.target) && !button.contains(e.target)) {
//          document.querySelector(".header__search").classList.toggle("open");
//          document.querySelector(".header__search-field").classList.toggle("open");
//          menu.classList.add('hide');
//       }


// //SEARCH
// document.querySelector(".header__search-btn").onclick = function () {
//    document.querySelector(".header__search").classList.toggle("open");
//    document.querySelector(".header__search-field").classList.toggle("open");
//    this.classList.remove("open");
// }

"use strict";

// MOBILE MENU   
document.querySelector(".header__menu").onclick = function () {
   document.querySelector(".header__menu-content").classList.toggle("open");
}

document.querySelector(".header__close").onclick = function () {
   document.querySelector(".header__menu-content").classList.remove("open");
}

let search_btn = document.querySelector('.header__search-btn');
let search = document.querySelector('.header__search');

const toggleSearch = () => {
   search.classList.toggle('open');
}

search_btn.addEventListener('click', e => {
   e.stopPropagation();

   toggleSearch();
});

// document.addEventListener('click', e => {
//    let target = e.target;
//    let its_search = target == search || search.contains(target);
//    let its_search_btn = target == search_btn;
//    let search_btn_is_active = search.classList.contains('active');

//    if (!its_search && !its_search_btn && search_btn_is_active) {
//       toggleMenu();
//    }
// })




// const menu = Array.from(document.querySelectorAll('.header__menu'));
// const triggers = Array.from(document.querySelectorAll('.header__menu-content'));

// triggers.forEach((item, i) => { // проходимся по каждому тригеру
//    item.addEventListener('click', (e) => { // ставим на него слушатель события клика
//       menu[i].classList.toggle('active'); // что-то делаем
//    });
// });

// let = obj = document.querySelectorAll('.header__menu-list');

// function menu() {
//    this.className = 'open';
// }

// for (let i = 0; i < obj.length; i++) {
//    obj[i].onclick = menu;

// }

