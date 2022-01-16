import { useState } from "react";

function useInput (valueValidation) {
    const [enteredValue , setEnteredValue ] = useState('');
    const [isInputTouched , setIsInputTouched] = useState(false);

   const isEnteredValueValid = valueValidation(enteredValue);
    const inputHasError = !isEnteredValueValid && isInputTouched ; 

    function onBlurHandler () {
        setIsInputTouched(true);
    }

    function onChangeHandler (e) {
        setIsInputTouched(true);
        setEnteredValue(e.target.value);
    }

    function resetValue() {
        setIsInputTouched(false);
        setEnteredValue('');
    }

    return [
        enteredValue,
        setIsInputTouched,
        isEnteredValueValid,
        inputHasError,
        onChangeHandler,
        onBlurHandler,
        resetValue
    ]
}

export default useInput;