const filterSelection = category => {
  let productList, i;
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

let filterContainer = document.getElementById("filterContainer");
if (filterContainer) {
  let filterLinks = filterContainer.getElementsByClassName("filter-category");
  for (let i = 0; i < filterLinks.length; i++) {
    filterLinks[i].addEventListener("click", e => {
      let current = document.getElementsByClassName("active");
      let tempActiveElem = 0;
      tempActiveElem = e.currentTarget === current[0] ? 1 : 0;
      current.length > 0 ? current[0].className = current[0].className.replace(" active", "") : null;
      if (tempActiveElem === 0) {
        e.currentTarget.className += " active";
        filterSelection(e.target.id);
      } else filterSelection("all");
    });
  }
}

if (document.getElementById("filterContainerDropdown")) {
  var filterContainerDD = document.getElementById("filterContainerDropdown");
  filterContainerDD.addEventListener("click", (e) => filterSelection(e.target.value));
}
filterSelection("all");
