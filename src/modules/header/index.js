let minusBtn = document.getElementsByClassName("minusBtn--js");
let cartDiv = document.getElementById("cart--js");
let plusBtn = document.getElementsByClassName("plusBtn--js");
const showCartOverlay = () => {
  let overlay = document.getElementById("overlay--js");
  if (overlay) {
    overlay.style.display = "flex";
  }
}
if (cartDiv) {
  cartDiv.addEventListener("click", showCartOverlay);
}
const decreaseCartCount = (e) => {
  let data = { "id": e.target.parentNode.id };
  fetch("http://localhost:3000/api/remove", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log("testing");
      /* if (document.getElementById("itemCount")) {
        document.getElementById("itemCount").innerText = res.cartItems.totalItems;
        window.location.href = "/products";
      } */
    })
    .catch(err => console.log(err))
}

const increaseCartCount = (e) => {

}

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