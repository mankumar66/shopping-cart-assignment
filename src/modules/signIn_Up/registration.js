const cnfmPasswordField = document.getElementById("cnfmPswdContainer");
const passwordField = document.getElementById("pswdContainer");
const submitBtn = document.getElementById("submitButton");

if (cnfmPasswordField && passwordField) {
  const cnfmPasswordFieldText = cnfmPasswordField.innerText;
  const passwordFieldText = passwordField.innerText;
  const handleNavigation = e => {
    if (cnfmPasswordFieldText !== passwordFieldText) {
      alert("not matched");
    }
  };
  
  if (submitBtn) submitBtn.addEventListener("click", handleNavigation);
}