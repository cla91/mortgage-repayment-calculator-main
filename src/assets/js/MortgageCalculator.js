import Formatter from "./Formatter";

const resultsEmptyDiv = document.querySelector(".results-empty");
const resultsFullDiv = document.querySelector(".results-full");
const monthlyPaymentSpan = resultsFullDiv.querySelector(
  "[data-monthly-repayments]"
);
const paymentsTypeSpan = resultsFullDiv.querySelector("[data-payments-type]");
const fullRepaymentsSpan = resultsFullDiv.querySelector(
  "[data-full-repayments]"
);

export default class MortgageCalculator {
  constructor(amount, years, interest, type) {
    this.amount = Number(amount);
    this.years = Number(years);
    this.interest = Number(interest);
    this.type = type;

    this.monthlyPayment = 0;
    this.totalRepayments = 0;
    this.totalInterests = 0;

    this.init();
  }
  init() {
    if (this.type == "repayment") {
      this.calculateRepaymentMortgage();
    } else if (this.type == "interest-only") {
      this.calculateInterestsOnlyMortgage();
    }
  }

  calculateRepaymentMortgage() {
    const monthlyInterest = this.interest / 100 / 12;
    const numberOfPayments = this.years * 12;
    // Calculate monthly payment for a repayment mortgage
    this.monthlyPayment =
      this.amount *
      ((monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
        (Math.pow(1 + monthlyInterest, numberOfPayments) - 1));
    this.monthlyPayment = +this.monthlyPayment.toFixed(2);
    //calculate totals
    this.totalRepayments = +(this.monthlyPayment * numberOfPayments).toFixed(2);
    this.totalInterests = +(this.totalRepayments - this.amount).toFixed(2);
  }

  calculateInterestsOnlyMortgage() {
    const monthlyInterest = this.interest / 100 / 12;
    const numberOfPayments = this.years * 12;
    // Monthly payment is only the interest
    this.monthlyPayment = +(this.amount * monthlyInterest).toFixed(2);
    // Total interest is the monthly payment multiplied by the number of payments
    this.totalInterests = +(this.monthlyPayment * numberOfPayments).toFixed(2);
    // Total repayments for interest-only includes the initial capital
    this.totalRepayments = +(this.amount + this.totalInterests).toFixed(2);
  }

  displayResults() {
    monthlyPaymentSpan.innerHTML = `£${Formatter.formatNumber(
      this.monthlyPayment
    )}`;
    if (this.type == "interest-only") {
      paymentsTypeSpan.innerHTML = `Interests`;
      fullRepaymentsSpan.innerHTML = `£${Formatter.formatNumber(
        this.totalInterests
      )}`;
    } else {
      paymentsTypeSpan.innerHTML = `Total`;
      fullRepaymentsSpan.innerHTML = `£${Formatter.formatNumber(
        this.totalRepayments
      )}`;
    }
    resultsEmptyDiv.classList.add("hidden");
    resultsFullDiv.classList.remove("hidden");
  }
}
