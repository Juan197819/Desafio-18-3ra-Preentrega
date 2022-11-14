let phoneInputField,phoneInput
function prefijosTel() {
  if ( document.querySelector("#phone")) {
    phoneInputField = document.querySelector("#phone");
    phoneInput = window.intlTelInput(phoneInputField, {
      utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    })
  }
}

function process(e) {
  e.preventDefault();
  const phoneNumber = phoneInput.getNumber();
  phoneInputField.value =phoneNumber;
}
prefijosTel()