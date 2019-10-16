import constants from './../../utils/locales/en';

const cnfmPasswordField = document.getElementById("cnfmpswd-container--js"),
  passwordField = document.getElementById("pswd-container--js"),
  submitBtn = document.getElementById("submit-button--js"),
  mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  pswdFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/,
  cnfmPasswordDiv = document.getElementById("cnfmPassword"),
  errorContainer = document.getElementById('error-container--js');

const validateForm = () => {
  let inputFields, i, valid = true;
  inputFields = document.getElementsByTagName("input");
  for (i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value == "") {
      // add an "invalid" class to the field
      inputFields[i].className += " invalid";
      // and set the status to false
      valid = false;
    } else if (inputFields[i].type === "email") {
      if (inputFields[i].value.match(mailFormat)) { }
      else {
        inputFields[i].className += " invalid";
        inputFields[i].focus();
        valid = false;
      }
    } else if (inputFields[i].type === "password") {
      if (inputFields[i].value.match(pswdFormat)) {

      }
      else {
        inputFields[i].className += " invalid";
        inputFields[i].focus();
        errorContainer.innerHTML = constants.PASSWORD_VALIDATION_ERROR;
        valid = false;
      }
    }
  }
  if (cnfmPasswordField && passwordField) {
    const cnfmPasswordFieldText = cnfmPasswordDiv.value,
      passwordFieldText = document.getElementById("password").value;
    if (cnfmPasswordFieldText !== passwordFieldText && valid === true) {
      cnfmPasswordDiv.focus();
      cnfmPasswordDiv.className += " invalid"
      errorContainer.innerHTML = constants.PASSWORD_MISMATCH_ERROR;
      valid = false;
    }
  }
  return valid;
};


const handleSubmit = () => {
  if (validateForm()) {
    document.getElementById("regForm").submit();
  }
}
if (submitBtn) submitBtn.addEventListener("click", handleSubmit);
