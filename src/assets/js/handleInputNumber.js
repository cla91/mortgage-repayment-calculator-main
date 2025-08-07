import Formatter from "./Formatter";
import handleError from "./handleError";
const inputNumbers = document.querySelectorAll("input[type=text]");

export default function handleInputNumber() {
  inputNumbers.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);
  });
}

function handleInput(e) {
  if (this.getAttribute("aria-invalid") == "true") {
    handleError(this, "");
  }
  if (this.getAttribute("name") == "interest") {
    this.value = Formatter.cleanNumber(this.value, true);
    return;
  }
  this.value = Formatter.cleanNumber(this.value, false);
}
function handleBlur(e) {
  if (this.value == "") return;
  this.value = Formatter.formatNumber(this.value, this);
}
