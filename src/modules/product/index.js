import { postRequest } from './../../helper/requestCenter';
import apiConst from './../../utils/locales';

let filterContainer = document.getElementById("filterContainer");
let filterContainerDD = document.getElementById("filterContainerDropdown");
let addToCartButton = document.getElementsByClassName("addToCart");


const filterSelection = category => {
  let productList, i;
  /* Get all products by className */
  productList = document.getElementsByClassName("product");
  if (category == "all") category = "";
  if (productList) {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].className.indexOf(category) > -1) {
        productList[i].style.display = "flex";
      } else {
        productList[i].style.display = "none";
      }
    }
  }
};

if (filterContainer) {
  let filterLinks = filterContainer.getElementsByClassName("filter-category");
  for (let i = 0; i < filterLinks.length; i++) {
    filterLinks[i].addEventListener("click", e => {
      let current = document.getElementsByClassName("active");
      /* Double click handle of filter category */
      let tempActiveElem = 0;
      tempActiveElem = e.currentTarget === current[0] ? 1 : 0;
      current.length > 0 ?
        current[0].className = current[0].className.replace(" active", "") :
        null;
      if (tempActiveElem === 0) {
        e.currentTarget.className += " active";
        filterSelection(e.target.id);
      } else filterSelection("all");
    });
  }
}

/* Event binding for mobile view dropdown */
if (filterContainerDD) {
  filterContainerDD.addEventListener("click", e => filterSelection(e.target.value));
}

/* Event binding for 'Buy Now' button */
if (addToCartButton) {
  for (let i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener("click", e => addToCart(e.currentTarget.id));
  }
}

/* Api post call on Buy Now */
const addToCart = (id) => {
  let data = { "id": id };
  postRequest(apiConst.API_ADD_TO_CART, data)
    .then(res => {
      if (document.getElementById("itemCount")) {
        document.getElementById("itemCount").innerText = res.cartItems.totalItems;
      }
    })
    .catch(err => console.log(err))
}

/* Load complete products data */
filterSelection("all");
