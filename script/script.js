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
const imageMain = document.querySelector('.img-main');
const images = document.querySelectorAll('.img-slide');

const header = document.querySelector('.header-bg');
const sectionImages = document.querySelector('.product-images');
const modal = sectionImages.cloneNode(true);
document.body.insertBefore(modal, header);
modal.classList.add('modal');
const btnCloseModal = document.querySelector('.modal .btn-close-modal');

const imageMainModal = document.querySelector('.modal .img-main');
const imagesModal = document.querySelectorAll('.modal .img-slide');

images.forEach((img) => {
  img.addEventListener('click', changeImage);
});

imagesModal.forEach((img) => {
  img.classList.add('img-modal');
  img.addEventListener('click', changeImage);
});


function changeImage(){
  const oldSrc = this.firstElementChild.getAttribute('src');
  const src = oldSrc.replace("-thumbnail", "");

  if(this.className.includes('img-modal')) {
    imagesModal.forEach(img => img.classList.remove('active'));
    imageMainModal.src = src;
  }else {
    images.forEach(img => img.classList.remove('active'));
    imageMain.src = src;
    imageMain.classList.add('anima');
  }
  this.classList.add('active');
  setTimeout(() => {
    imageMain.classList.remove('anima');
  }, 300);
}

//---------------------------------------
//Slide images with btn
const btnSlidePrevious = document.querySelectorAll('.btn-slide.previous')[1];
const btnSlideNext = document.querySelectorAll('.btn-slide.next')[1];
const srcMainImages = [
  '/images/image-product-1.jpg',
  '/images/image-product-2.jpg',
  '/images/image-product-3.jpg',
  '/images/image-product-4.jpg'
];

btnSlideNext.addEventListener('click', nextImage);
let counter = 0;
let counterModal = 0;

function nextImage() {
  //for mobile
  if(!this.className.includes('btn-modal')) {
    if(counter < srcMainImages.length - 1) {
      counter += 1;
      imageMain.classList.add('anima');
    };
    imageMain.src = srcMainImages[counter];
    setTimeout(() => {
      imageMain.classList.remove('anima');
    }, 300);
  }

  //for modal
  if(this.className.includes('btn-modal')) {
    if(counterModal < srcMainImages.length - 1) {
      counterModal += 1;
    };
    imageMainModal.src = srcMainImages[counterModal];
    
    //link previous button with current image thumbnail
    imagesModal.forEach(img => img.classList.remove('active'));
    const currentImage = imagesModal[counterModal];
    currentImage.classList.add('active');
  };
};

btnSlidePrevious.addEventListener('click', previousImage);

function previousImage() {
  //for mobile
  if(!this.className.includes('btn-modal')) {
    if(counter > 0) {
      counter -= 1;
      imageMain.classList.add('anima');
    };
    imageMain.src = srcMainImages[counter];
    setTimeout(() => {
      imageMain.classList.remove('anima');
    }, 300);
  }

  //for modal
  if(this.className.includes('btn-modal')) {
    if(counterModal > 0) {
      counterModal -= 1;
    };
    imageMainModal.src = srcMainImages[counterModal];

    //link previous button with current image thumbnail
    imagesModal.forEach(img => img.classList.remove('active'));
    const currentImage = imagesModal[counterModal];
    currentImage.classList.add('active');
  };
};

//---------------------------------------------------

btnCloseModal.addEventListener('click', closeModalSlide )

imageMain.addEventListener('click', openModalSlide);

function openModalSlide() {
  const small = window.matchMedia('(min-width: 761px)');
  if(small.matches) {
    modal.classList.add('active');
    modal.style.height = `${document.body.scrollHeight}px`;

    const btnModalPrevious = document.querySelector('.modal .btn-slide.previous');
    const btnModalNext = document.querySelector('.modal .btn-slide.next');

    btnModalNext.classList.add('btn-modal');
    btnModalPrevious.classList.add('btn-modal');

    btnModalNext.addEventListener('click', nextImage);
    btnModalPrevious.addEventListener('click', previousImage);
  };
};

function closeModalSlide() {
  modal.classList.remove('active');
}
