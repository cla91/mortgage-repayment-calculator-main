import handleError from "./handleError";

export default class Formatter {
  static cleanNumber(number, decimal) {
    return decimal
      ? String(number).replace(/[^0-9.]/g, "")
      : String(number).replace(/[^0-9]/g, "");
  }
  static formatNumber(number, input) {
    if (isNaN(parseFloat(number))) {
      handleError(input, "Input a valid number.");
      return number;
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      trailingZeroDisplay: "stripIfInteger",
    }).format(parseFloat(number));
  }
}
