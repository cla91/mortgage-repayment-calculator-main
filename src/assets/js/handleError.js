export default function handleError(input, message) {
  if (input.getAttribute("name") == "mortgage-type") {
    const errorMessageElem = input
      .closest(".radio-container")
      .querySelector(".error-message");
    errorMessageElem.innerHTML = `${message}`;
    if (message == "") {
      input.setAttribute("aria-invalid", "false");
      errorMessageElem.classList.add("sr-only");
    } else {
      input.setAttribute("aria-invalid", "true");
      errorMessageElem.classList.remove("sr-only");
    }
    return;
  }
  const inputLabel = input.closest("label");
  const errorMessageElem = inputLabel.querySelector(".error-message");
  if (message == "") {
    errorMessageElem.innerHTML = `${message}`;
    errorMessageElem.classList.add("sr-only");
    inputLabel.classList.remove("error");
    input.setAttribute("aria-invalid", "false");
    return;
  }

  errorMessageElem.innerHTML = `${message}`;
  errorMessageElem.classList.remove("sr-only");
  inputLabel.classList.add("error");
  input.setAttribute("aria-invalid", "true");
}
