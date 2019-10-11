let minusBtn = document.getElementsByClassName("minusBtn--js");
let cartDiv = document.getElementById("cart--js");
let plusBtn = document.getElementsByClassName("plusBtn--js");
let cartContainer = document.getElementById("cartContainer--js");
const dynamicCartHTML = (apiRes) => {
  return `<div class="cartHeader" id="cartHeader--js">
  <h4>My Cart <span>(${apiRes.totalItems} item)</span></h4>
  </div>
  <div id="cartItems">
    <div id="listItemContainer"></div>
  <div class="cartButton">
    <span id="promoSpan">
      Promo code can be applied on product page
    </span>
    <button>
      <span>Proceed to Checkout</span>
      <span id="totalCartCost--js">Rs.${apiRes.totalPrice} ></span>
    </button>
  </div>
  </div>`
}
const liListItems = (apiRes) => {
  const ulItem = document.createElement("ul");
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
const emptyCartHTML = `
  <div class="cartHeader" id="cartHeader--js">
    <h4>My Cart</h4>
  </div>
  <div id="cartEmpty">
    <div class="cartEmptyText">
    <h4>No items in your cart</h4>
    <span>Your favourite items are just a click away</span>
  </div>
  <div class="cartButton">
    <button>Start Shopping</button>
  </div>`;
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
}
const showCartOverlay = () => {
  let overlay = document.getElementById("overlay--js");
  fetch("http://localhost:3000/api/cart")
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.length === 0) {
        cartContainer.innerHTML = emptyCartHTML;
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
  fetch("http://localhost:3000/api/remove", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(res => {
      console.log("testing");
      if (res.totalItems === 0) {
        if (document.getElementById("cartItems")) {
          cartContainer.innerHTML = emptyCartHTML;
        }
      }
      else { renderCart(res); }
      document.getElementById("itemCount").innerText = res.totalItems;
    })
    .catch(err => console.log(err))
}

const increaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  fetch("http://localhost:3000/api/addToCart", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
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
