import { getPostRequest } from '../../helper/clientApi';
import apiConstants from './../../utils/apiConstants';
import constants from './../../utils/locales/en';

let minusBtn = document.getElementsByClassName("minusBtn--js"),
  cartDiv = document.getElementById("cart--js"),
  plusBtn = document.getElementsByClassName("plusBtn--js"),
  cartContainer = document.getElementById("cart-detail-view--js"),
  overlay = document.getElementById("overlay--js"),
  body = document.getElementsByTagName("body");

const dynamicCartHTML = (apiRes) => {
  return `<div tabindex="0" class="cartHeader" id="cartHeader--js">
  <h4>${constants.CART_HEADER_LABEL} <span>(${apiRes.totalItems} ${constants.CART_ITEM_LABEL})</span></h4>
  <button class="closeOverlay--js">x</button>
  </div>
  <div tabindex="0" id="cartItems">
    <div id="listItemContainer"></div>
  <div tabindex="0" class="cartButton">
    <span id="promoSpan">${constants.CART_PROMO_LABEL}</span>
    <button class="closeOverlay--js">
      <span>${constants.PROCEED_CHECKOUT_LABEL}</span>
      <span>Rs.${apiRes.totalPrice} ></span>
    </button>
  </div>
  </div>`
}

const liListItems = (apiRes) => {
  let ulItem = document.createElement("ul");
  for (var key in apiRes.items) {
    ulItem.innerHTML += `<li tabindex="0"><img src="${apiRes.items[key].item.imageURL}" alt="{${apiRes.items[key].item.name}" />
    <div class="itemDetail">
      <strong>${apiRes.items[key].item.name}</strong>
      <div id="${apiRes.items[key].item.id}">
        <button class="minusBtn--js">-</button>
        <span class="itemQuantity">${apiRes.items[key].quantity}</span>
        <button class="plusBtn--js">+</button>
        <span>X</span>
        <span tabindex="0">Rs.${apiRes.items[key].item.price}</span>
      </div>
    </div>
    <div class="itemCost">
      <span tabindex="0">${constants.RS_LABEL}${apiRes.items[key].price}</span>
    </div></li>`
  }
  ulItem.innerHTML += `<div tabindex="0" class="lowestPriceBranding">
                        <img src="/static/images/lowest-price.png" alt="lowest price image" />
                        <span>${constants.PRICE_BRANDING_LABEL}</span>
                      </div>`
  return ulItem;
}

const emptyCartHTML = `
  <div tabindex="0" class="cartHeader" id="cartHeader--js">
    <h4>${constants.CART_HEADER_LABEL}</h4>
    <button class="closeOverlay--js">x</button>
  </div>
  <div tabindex="0" id="cartEmpty">
    <div class="cartEmptyText">
    <h4>${constants.EMPTY_CART_LABEL}</h4>
    <span>${constants.FAV_ITEM_LABEL}</span>
  </div>
  <div class="cartButton">
    <button class="closeOverlay--js">${constants.START_SHOPPING_LABEL}</button>
  </div></div>`;

const hideCartOverlay = () => {
  let closeOverlayBtn = document.getElementsByClassName("closeOverlay--js");
  if (closeOverlayBtn) {
    for (let i = 0; i < closeOverlayBtn.length; i++) {
      closeOverlayBtn[i].addEventListener("click", () => {
        overlay.style.display = "none";
        body[0].style.overflowY = "scroll";
      })
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
  getPostRequest(apiConstants.GET_CART_API, { method: constants.GET_METHOD })
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
    body[0].style.overflow = "hidden";
  }
}

const decreaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  getPostRequest(apiConstants.REMOVE_FROM_CART_API, { method: constants.POST_METHOD, data: data })
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
  getPostRequest(apiConstants.ADD_TO_CART_API, { method: constants.POST_METHOD, data: data })
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
  cartDiv.addEventListener("keypress", showCartOverlay);
}
