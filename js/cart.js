'use strict';
const productsBtn = document.querySelectorAll('.products__btn'); //Получаем все кнопки add to cart
const cartProductsList = document.querySelector('.cart-content'); //Получаем
const cart = document.querySelector('.header__topline-right-cart');//Получаем саму корзину
const cartQuantity = document.querySelector('.header__topline-right-count'); //Получаем счётчик товаров
const fullPrice = document.querySelector('.fullprice'); //Получаем ссылку на итоговую стоимость продуктов в корзине
let title = document.querySelector('.products__title');
let price = 0; //итоговое число которое будет пересчитываться
let count = 1;
let allProducts = [];

console.log(count);

/**
 * 
 * @returns Создаём генератор рандомного id к товарам
 */
const randomId = () => {
   return Math.random().toString(36).substring(2);
}

/**
 * 
 * @param {*} str 
 * @returns С помощью регулярного выражения убираем из цены точку, знак доллара и нули
 */
const priceWithoutSpaces = (str) => {
   return str.replace(/[^.\d]/g, '');
};
/**
 * 
 * @param {*} str 
 * @returns И обратно меняем как оно было!
 */
const normalPrice = (str) => {
   return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

productsBtn.forEach(el => { // Пробегаемся по всем кнопкам
   // Находим родителя productsBtn с помощью .closest('.products__item')
   // и добавляем аттрибут к каждому продукту .setAttribute data-id продуктам с помощью функции randomId
   el.closest('.products__item').setAttribute('data-id', randomId());
   el.addEventListener('click', (currentElem) => {
      let self = currentElem.currentTarget; // Текущий элемент по которому кликаем
      let parentProduct = self.closest('.products__item'); // при клике находим текущий продукт
      let id = parentProduct.dataset.id // при клике получаем дата аттрибут id
      // Получаем c помощью .getAttribute('src') изображение при клике
      let img = parentProduct.querySelector('.products__img-card').getAttribute('src');
      let title = parentProduct.querySelector('.products__title').textContent; // Получим название товара
      // Получаем цену товара в целом числовом варианте  без знака доллара и точки
      let priceNumber = parseInt(priceWithoutSpaces(parentProduct.querySelector('.products__price').textContent));

      if (allProducts.length == 0){
         makeElem(id,priceNumber,img, title)
      } 
      else{
      let elemAvaliable = false;
      allProducts.forEach(element => {
         if (element.id === id) {
            element.count++;
            document.querySelector('.cart-product__count').textContent = `${element.count} шт.`;
            elemAvaliable = true;
            return;
         }
         })
         console.log(elemAvaliable)
         if(elemAvaliable === false){
            makeElem(id,priceNumber,img, title)
         }
      };

   });
});


function makeElem(id,priceNumber,img, title) {
   let currentElem = {};
   currentElem.id = id;
   currentElem.count = count;
   allProducts.push(currentElem);
   plusFullPrice(priceNumber);
   printFullPrice();
   cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
   printQuantity();
}

// При добавление продукта в корзину сумма будет суммироваться +
const plusFullPrice = (currentPrice) => {
   return price += currentPrice;
};

// При удалении продукта из корзины сумма будет суммироваться -
const minusFullPrice = (currentPrice) => {
   return price -= currentPrice;
};


//Количество элементов внутри в корзине
const printQuantity = () => {
   let length = cartProductsList.querySelector('.simplebar-content').children.length;
   cartQuantity.textContent = length;
   if (length > 0) {
      cartProductsList.classList.add('active');
   } else {
      cartProductsList.classList.remove('active');
   };
   // length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

// Выводим общую стоимость в корзине
const printFullPrice = () => {
   fullPrice.textContent = `$${normalPrice(price)}`;

};

/**
 *  Вставляем разметку, при добавлении товаров в корзину
 * @param {*} img 
 * @param {*} title 
 * @param {*} price 
 * @param {*} id 
 * 
 * @returns 
 */
const generateCartProduct = (img, title, price, id) => {
      return `
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img" width="70px" height="70px">
				<div class="cart-product__text">
					<h3 class="cart-product__title">Название товара ${title}</h3>
               <div class="cart-product__count">${count} Шт</div>
					<span class="cart-product__price">Цена $${normalPrice(price)}</span>
				</div>
				<button class="cart-product__delete">Удалить товар</button>
			</article>
		</li>
	`;
};

/**
 * 
 * @param {*} productParent Функция удаление продуктов из корзины
 */
const deleteProducts = (productParent) => {
   let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
   allProducts.forEach(element => {
   let id = productParent.querySelector('.cart-product').dataset.id;
      if(element.id == id){
         let preres = allProducts.indexOf(element);
         allProducts.splice(preres);
      }
   })
   minusFullPrice(currentPrice);
   printFullPrice();
   productParent.remove();

   printQuantity();
};

cartProductsList.addEventListener('click', (elem) => {
   if (elem.target.classList.contains('cart-product__delete')) {
      deleteProducts(elem.target.closest('.cart-content__item'));
   }
});
