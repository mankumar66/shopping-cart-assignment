const cnfmPasswordField = document.getElementById("cnfmPswdContainer");
const passwordField = document.getElementById("pswdContainer");
if (cnfmPasswordField && passwordField) {
  const cnfmPasswordFieldText = cnfmPasswordField.innerText;
  const passwordFieldText = passwordField.innerText;
  const handleNavigation = e => {
    if (cnfmPasswordFieldText !== passwordFieldText) {
      alert("not matched");
    }
  };
  const submitBtn = document.getElementById("submitButton");
  if (submitBtn) submitBtn.addEventListener("click", handleNavigation);
}