import {getRequest, postRequest} from '../../helper/requestCenter';

let minusBtn = document.getElementsByClassName("minusBtn--js");
let cartDiv = document.getElementById("cart--js");
let plusBtn = document.getElementsByClassName("plusBtn--js");
let cartContainer = document.getElementById("cartContainer--js");
let overlay = document.getElementById("overlay--js");


var dynamicCartHTML = (apiRes) => {
  return `<div class="cartHeader" id="cartHeader--js">
  <h4>My Cart <span>(${apiRes.totalItems} item)</span></h4>
  <button class="closeOverlay--js">x</button>
  </div>
  <div id="cartItems">
    <div id="listItemContainer"></div>
  <div class="cartButton">
    <span id="promoSpan">
      Promo code can be applied on product page
    </span>
    <button class="closeOverlay--js">
      <span>Proceed to Checkout</span>
      <span id="totalCartCost--js">Rs.${apiRes.totalPrice} ></span>
    </button>
  </div>
  </div>`
}

var liListItems = (apiRes) => {
  var ulItem = document.createElement("ul");
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
      <span>Rs.${apiRes.items[key].price}</span>
    </div></li>`
  }
  ulItem.innerHTML += `<div class="lowestPriceBranding">
                        <img src="/static/images/lowest-price.png" alt="lowest price image" />
                        <span>You won't find it cheaper anywhere</span>
                      </div>`
  return ulItem;
}

var emptyCartHTML = `
  <div class="cartHeader" id="cartHeader--js">
    <h4>My Cart</h4>
    <button class="closeOverlay--js">x</button>
  </div>
  <div id="cartEmpty">
    <div class="cartEmptyText">
    <h4>No items in your cart</h4>
    <span>Your favourite items are just a click away</span>
  </div>
  <div class="cartButton">
    <button class="closeOverlay--js">Start Shopping</button>
  </div>`;
var hideCartOverlay = () => {
  let closeOverlayBtn = document.getElementsByClassName("closeOverlay--js");
  if (closeOverlayBtn) {
    for (let i = 0; i < closeOverlayBtn.length; i++) {
      closeOverlayBtn[i].addEventListener("click", ()=> overlay.style.display = "none");
    }
  }
}
var renderCart = (res) => {
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
var showCartOverlay = () => {
  getRequest("http://localhost:3000/api/cart")
    .then(res => {
      console.log(res);
      if (res.length === 0 || res.totalItems ===0) {
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

var decreaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  postRequest("http://localhost:3000/api/remove", data)
    .then(res => {
      console.log("testing");
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

var increaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  postRequest("http://localhost:3000/api/addToCart",data)
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
