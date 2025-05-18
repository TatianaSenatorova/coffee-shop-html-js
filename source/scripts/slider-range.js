import { sliderInitValues } from './constants';
import { slider, minPriceInput, maxPriceInput } from './dom-elements.js';

minPriceInput.value = sliderInitValues.START_MIN;
maxPriceInput.value = sliderInitValues.START_MAX;
const inputs = [minPriceInput, maxPriceInput];
let valuesForSlider = [];

noUiSlider.cssClasses.target += 'range';

noUiSlider.create(slider, {
  range: {
    min: sliderInitValues.MIN,
    max: sliderInitValues.MAX,
  },
  connect: true,
  start: [sliderInitValues.START_MIN, sliderInitValues.START_MAX],
  step: sliderInitValues.STEP,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  cssPrefix: 'noui-',
});

slider.noUiSlider.on('update', (values, handle) => {
  inputs[handle].value = values[handle];
});

const onInputsChange = (values) => {
  slider.noUiSlider.set(values);
};

inputs.forEach((input, index) => {
  input.addEventListener('change', ({ target }) => {
    valuesForSlider = index === 0 ? [target.value, null] : [null, target.value];
    onInputsChange(valuesForSlider);
  }
  );
});
