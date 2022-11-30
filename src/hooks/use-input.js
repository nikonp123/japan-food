import { useState } from 'react';

const useInput = (validateValueFunction) => {
  const initInputText = '';
  const [enteredValue, setEnteredValue] = useState(initInputText);
  const [wasInputTouched, setWasInputlTouched] = useState(false);

  const isEnteredlValid = validateValueFunction(enteredValue);
  const isInputInvalid = !isEnteredlValid && wasInputTouched;

  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputLostFocusHandler = (e) => {
    setWasInputlTouched(true);
  };

  const resetValues = () => {
    setEnteredValue(initInputText);
    setWasInputlTouched(false);
  };

  return {
    value: enteredValue,
    isEnteredlValid,
    hasError: isInputInvalid,
    inputChangeHandler,
    inputLostFocusHandler,
    resetValues,
  };
};

export default useInput;
