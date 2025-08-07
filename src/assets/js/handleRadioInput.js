import handleError from "./handleError";
const radioInputs = document.querySelectorAll("input[type=radio]");

export default function handleRadioInput() {
  supportHas();
  removeError();
}

function removeError() {
  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      handleError(input, "");
    });
  });
}

function supportHas() {
  if (!CSS.supports("selector(:has(*))")) {
    radioInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const allRadioLabels = document.querySelectorAll(".radio-label");
        allRadioLabels.forEach((label) => {
          label.classList.remove("active");
        });
        if (input.checked) {
          input.closest("label").classList.add("active");
        }
      });
    });
  }
}
