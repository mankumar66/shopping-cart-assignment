const showCartOverlay = () => {
    let overlay = document.getElementById("overlay--js");
    if(overlay){
      overlay.style.display = "flex";
    }
  }
  let cartDiv = document.getElementById("cart--js");
  if (cartDiv) {
    cartDiv.addEventListener("click", showCartOverlay );  
  }