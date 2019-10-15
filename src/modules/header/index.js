import { getPostRequest } from '../../helper/clientApi';
import apiConst from './../../utils/apiConst';
import constants from './../../utils/locales/en';

let minusBtn = document.getElementsByClassName("minusBtn--js");
let cartDiv = document.getElementById("cart--js");
let plusBtn = document.getElementsByClassName("plusBtn--js");
let cartContainer = document.getElementById("cartContainer--js");
let overlay = document.getElementById("overlay--js");


const dynamicCartHTML = (apiRes) => {
  return `<div class="cartHeader" id="cartHeader--js">
  <h4>${constants.CART_HEADER_LABEL} <span>(${apiRes.totalItems} ${constants.CART_ITEM_LABEL})</span></h4>
  <button class="closeOverlay--js">x</button>
  </div>
  <div id="cartItems">
    <div id="listItemContainer"></div>
  <div class="cartButton">
    <span id="promoSpan">${constants.CART_PROMO_LABEL}</span>
    <button class="closeOverlay--js">
      <span>${constants.PROCEED_CHECKOUT_LABEL}</span>
      <span id="totalCartCost--js">Rs.${apiRes.totalPrice} ></span>
    </button>
  </div>
  </div>`
}

const liListItems = (apiRes) => {
  let ulItem = document.createElement("ul");
  for (var key in apiRes.items) {
    ulItem.innerHTML += `<li><img src="${apiRes.items[key].item.imageURL}" alt="{${apiRes.items[key].item.name}" />
    <div id="itemDetail">
      <strong>${apiRes.items[key].item.name}</strong>
      <div id="${apiRes.items[key].item.id}">
        <button class="minusBtn--js">-</button>
        <span class="itemQuantity">${apiRes.items[key].quantity}</span>
        <button class="plusBtn--js">+</button>
        <span>X</span>
        <span>Rs.${apiRes.items[key].item.price}</span>
      </div>
    </div>
    <div class="itemCost">
      <span>${constants.RS_LABEL}${apiRes.items[key].price}</span>
    </div></li>`
  }
  ulItem.innerHTML += `<div class="lowestPriceBranding">
                        <img src="/static/images/lowest-price.png" alt="lowest price image" />
                        <span>${constants.PRICE_BRANDING_LABEL}</span>
                      </div>`
  return ulItem;
}

const emptyCartHTML = `
  <div class="cartHeader" id="cartHeader--js">
    <h4>${constants.CART_HEADER_LABEL}</h4>
    <button class="closeOverlay--js">x</button>
  </div>
  <div id="cartEmpty">
    <div class="cartEmptyText">
    <h4>${constants.EMPTY_CART_LABEL}</h4>
    <span>${constants.FAV_ITEM_LABEL}</span>
  </div>
  <div class="cartButton">
    <button class="closeOverlay--js">${constants.START_SHOPPING_LABEL}</button>
  </div>`;

const hideCartOverlay = () => {
  let closeOverlayBtn = document.getElementsByClassName("closeOverlay--js");
  if (closeOverlayBtn) {
    for (let i = 0; i < closeOverlayBtn.length; i++) {
      closeOverlayBtn[i].addEventListener("click", () => overlay.style.display = "none");
    }
  }
}

const renderCart = (res) => {
  cartContainer.innerHTML = dynamicCartHTML(res);
  document.getElementById("listItemContainer").appendChild(liListItems(res));
  if (minusBtn) {
    for (let i = 0; i < minusBtn.length; i++) {
      minusBtn[i].addEventListener("click", e => decreaseCartCount(e));
    }
  }

  if (plusBtn) {
    for (let i = 0; i < minusBtn.length; i++) {
      plusBtn[i].addEventListener("click", e => increaseCartCount(e));
    }
  }
  hideCartOverlay();
}

const showCartOverlay = () => {
  getPostRequest(apiConst.GET_CART_API,{method: constants.GET_METHOD})
    .then(res => {
      if (res.length === 0 || res.totalItems === 0) {
        cartContainer.innerHTML = emptyCartHTML;
        hideCartOverlay();
      }
      else {
        renderCart(res);
      }
    })
    .catch(err => console.log(err))
  if (overlay) {
    overlay.style.display = "flex";
  }
}

const decreaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  getPostRequest(apiConst.REMOVE_FROM_CART_API,{method: constants.POST_METHOD, data:data})
    .then(res => {
      if (res.totalItems === 0) {
        if (document.getElementById("cartItems")) {
          cartContainer.innerHTML = emptyCartHTML;
          hideCartOverlay();
        }
      }
      else { renderCart(res); }
      document.getElementById("itemCount").innerText = res.totalItems;
    })
    .catch(err => console.log(err))
}

const increaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  getPostRequest(apiConst.ADD_TO_CART_API,{method: constants.POST_METHOD, data:data})
    .then(res => {
      renderCart(res.cartItems);
      if (document.getElementById("itemCount")) {
        document.getElementById("itemCount").innerText = res.cartItems.totalItems;
      }
    })
    .catch(err => console.log(err))
}

if (cartDiv) {
  cartDiv.addEventListener("click", showCartOverlay);
}
