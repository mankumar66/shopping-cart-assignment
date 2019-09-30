
const filterSelection = (category) => {
    let productList, i;
    productList = document.getElementsByClassName("product");
    if (category == "all") category = "";
    for (i = 0; i < productList.length; i++) {
        if (productList[i].className.indexOf(category) > -1) {
            productList[i].style.display = "flex";
        } else {
            productList[i].style.display = "none";
        }
    }
}

let filterContainer = document.getElementById("filterContainer");
let filterLinks = filterContainer.getElementsByClassName("filtercategory");
for (let i = 0; i < filterLinks.length; i++) {
    filterLinks[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        let tempActiveElem = 0;
        tempActiveElem = this === current[0] ? 1 : 0;
        current.length > 0 ? current[0].className = current[0].className.replace(" active", "") : null;
        tempActiveElem === 0 ? this.className += " active" : filterSelection("all");
    });
}
const filterSelectionDropdown = () => {
    var x =document.getElementById("filterContainerDropdown").value;
    filterSelection(x);
}
filterSelection("all");