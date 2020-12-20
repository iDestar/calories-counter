const ActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const FormulaFactor = {
  WEIGHT: 10,
  HEIGHT: 6.25,
  AGE: 5,
};

const GenderFactor = {
  FEMALE: -160,
  MALE: 5,
};

const CaloriesMinMax = {
  MIN: 0.85,
  MAX: 1.15,
};

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector(`.counter__form`);
    this.elements = this.form.elements;
    this.parameters = this.elements.parameters.elements;
    this.age = this.elements.age;
    this.weight = this.elements.weight;
    this.height = this.elements.height;
    this.gender = this.form.elements.gender;
    this.activity = this.elements.activity;
    this.submit = this.elements.submit;
    this.reset = this.elements.reset;

    this.parametersValue = Array.from(this.parameters);

    this.resultForm = this.root.querySelector(`.counter__result`);
    this.caloriesNormOutput = this.resultForm.querySelector(`#calories-norm`);
    this.caloriesMinOutput = this.resultForm.querySelector(`#calories-minimal`);
    this.caloriesMaxOutput = this.resultForm.querySelector(`#calories-maximal`);

    this._onFormInput = this._onFormInput.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }
  _init() {
    this.form.addEventListener('input', this._onFormInput);
    this.form.addEventListener('submit', this._onFormSubmit);
    this.form.addEventListener('reset', this._onFormReset);
  }
  _onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersValue.some((el) => el.value);
  }
  _onFormSubmit(evt) {
    evt.preventDefault();

    console.log(this.parametersValue);

    const result = {
      norm: this.getCaloriesNorm(),
      max: this.getCaloriesMax(),
      min: this.getCaloriesMin(),
    };

    this.show(result);
  }
  _onFormReset() {
    this.submit.disabled = true;
    this.reset.disabled = true;
    this.hide();
  }
  show(result) {
    this.resultForm.classList.remove(`counter__result--hidden`);

    this.caloriesNormOutput.textContent = result.norm;
    this.caloriesMaxOutput.textContent = result.max;
    this.caloriesMinOutput.textContent = result.min;
  }
  hide() {
    this.resultForm.classList.add(`counter__result--hidden`);
    this.caloriesNormOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;
    this.caloriesMinOutput.textContent = 0;
  }
  getCaloriesNorm() {
    const age = this.age.value * FormulaFactor.AGE;
    const height = this.height.value * FormulaFactor.HEIGHT;
    const weight = this.weight.value * FormulaFactor.WEIGHT;
    const gender = GenderFactor[this.gender.value.toUpperCase()];
    const activity = ActivityRatio[this.activity.value.toUpperCase()];

    return Math.round((weight + height - age + gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMax.MIN);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMax.MAX);
  }
}
