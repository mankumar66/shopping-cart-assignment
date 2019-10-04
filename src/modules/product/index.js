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
    filterLinks[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      let tempActiveElem = 0;
      tempActiveElem = this === current[0] ? 1 : 0;
      current.length > 0
        ? (current[0].className = current[0].className.replace(" active", ""))
        : null;
      tempActiveElem === 0
        ? (this.className += " active")
        : filterSelection("all");
    });
  }
}

if (document.getElementsByClassName("filter-category")) {
  const filterCategoryLinks = document.getElementsByClassName(
    "filter-category"
  );
  for (let i = 0; i < filterCategoryLinks.length; i++) {
    filterCategoryLinks[i].addEventListener("click", (e) => filterSelection(e.target.id));
  }
}

if (document.getElementById("filterContainerDropdown")) {
    var filterContainerDD = document.getElementById("filterContainerDropdown");
    filterContainerDD.addEventListener("click", (e) => filterSelection(e.target.value));
}
filterSelection("all");
