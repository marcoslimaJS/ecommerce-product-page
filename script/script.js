//Menu Mobile
const menu = document.querySelector(".menu-nav");
const btnMenu = document.querySelector("#btn-menu");

btnMenu.addEventListener('click', openMobileMenu);

function openMobileMenu() {
  menu.classList.toggle('active');

  if(btnMenu.firstChild.src.includes("open")) {
    btnMenu.firstChild.src = './images/icon-menu-close.svg';
  } else {
    btnMenu.firstChild.src = './images/icon-menu-open.svg';
  }
}

//----------------------------------------------------

const totalPrice = document.querySelector('#amount');
const discount = document.querySelector('#discount');
const pricePrevious = document.querySelector('#previous');
const quantityOfProduct = document.querySelector('#quantity-amount');
const btnAddProduct = document.querySelector('#product-more');
const btnRemoveProduct = document.querySelector('#product-less');
const btnAddToCard = document.querySelector('#btn-buy');

const cartEmpety = document.querySelector('.cart-empty');
const cart = document.querySelector('#cart');
const cartModalPopup = document.querySelector('.cart-modal-popup');
const cartProduct = document.querySelector('#cart-modal-product');
const cartNumber = document.querySelector('#cart-number');


btnAddProduct.addEventListener('click', addUnit);

function addUnit() {
  const unitNumber = parseInt(quantityOfProduct.innerText) + 1;
  quantityOfProduct.innerText = unitNumber;
  updatePrice(unitNumber);
}

btnRemoveProduct.addEventListener('click', decrementUnit)

function decrementUnit() {
  let unitNumber = parseInt(quantityOfProduct.innerText) - 1;
  if(unitNumber < 0) {
    unitNumber = 0;
  }
  quantityOfProduct.innerText = unitNumber;
  updatePrice(unitNumber)
}

function updatePrice(unitNumber) {
  const desconto = parseFloat(discount.innerText);
  const priceBase = parseFloat(pricePrevious.innerText);
  let newUnitPrice = priceBase - (priceBase / 100) * desconto;
  let finalPrice = newUnitPrice * unitNumber;
  
  function addToCard() {
    const modalPopup = `
          <div class="cart-content">
            <div class="cart-item">
              <div class="cart-img">
                <img src="./images/image-product-1-thumbnail.jpg" alt="Img">
              </div>
              <div class="cart-description">
                <p class="cart-product-name">Fall Limited Edition Sneakers</p>
                <p class="cart-name-mobile">Autumn Limited Edition...</p>
                <p class="cart-price">${newUnitPrice}.00 x${unitNumber} <span class="cart-price-total">${finalPrice}.00</span></p>
              </div>
              <button class="cart-delete" id="cart-delete">
                <img src="./images/icon-delete.svg" alt="X">
              </button>
            </div>
            <button class="btn btn-cart-checkout">
              Checkout
            </button>
          </div>
    `;
    if(unitNumber != 0) {
      cartProduct.innerHTML = modalPopup;
      const cartDelete = document.querySelector('#cart-delete');
      cartDelete.addEventListener('click', clearCart);
      addNumberOfItems(unitNumber);
    }
    
  };
  btnAddToCard.addEventListener('click', addToCard)
}

function addNumberOfItems(unitNumber) {
  cartNumber.classList.add('active');
  cartNumber.innerText = unitNumber;
}

cart.addEventListener('click',() => {
  cartModalPopup.classList.toggle('active');
});

function clearCart() {
  cartProduct.innerHTML = cartEmpety.outerHTML;
  cartNumber.classList.remove('active');
}

//------------------------------------------------
//Slide images

const imageMain = document.querySelector('.product-img-main img');
const images = document.querySelectorAll('.img-slide');


images.forEach((img) => {
  img.addEventListener('click', changeImage)
})


function changeImage(event){
  const oldSrc = this.firstElementChild.getAttribute('src');
  const src = oldSrc.replace("-thumbnail", "");

  images.forEach(img => img.classList.remove('active'));
  this.classList.add('active')
  //imageMain.classList.toggle('ativo');

  imageMain.src = src
}