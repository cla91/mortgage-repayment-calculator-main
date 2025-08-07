import handleError from "./handleError";
import MortgageCalculator from "./MortgageCalculator";
import Formatter from "./Formatter";

const form = document.forms[0];

export default function handleForm() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let isValid = true;
    [...formData.entries()].forEach((data) => {
      if (data[1] == "") {
        const currentInput = form.querySelector(`[name=${data[0]}]`);
        handleError(currentInput, "This field is required");
        isValid = false;
      }
      if (data[1] == "0") {
        const currentInput = form.querySelector(`[name=${data[0]}]`);
        handleError(currentInput, "Input a valid number");
        isValid = false;
      }
    });
    if ([...formData.entries()].length < 4) {
      const radioInput = form.querySelector("[name=mortgage-type]");
      handleError(radioInput, "This field is required");
      isValid = false;
    }
    if (isValid) {
      let amount = Formatter.cleanNumber(formData.get("amount"));
      let years = Formatter.cleanNumber(formData.get("term"));
      let interest = Formatter.cleanNumber(formData.get("interest"), true);
      let mortgageType = formData.get("mortgage-type");
      const mortgageCalculator = new MortgageCalculator(
        amount,
        years,
        interest,
        mortgageType
      );
      mortgageCalculator.displayResults();
    }
  });
}
