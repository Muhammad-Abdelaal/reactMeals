import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import useInput from '../Hooks/useInput';
import  './cart-form.css';
function CartForm (props) {
    const validationLogic = value => value.trim() !=='';
    const [
        enteredName,
        setNameisTouched,
        isNameValid,
        nameHasError,
        nameChangeHandler,
        nameBlurHandler,
        nameRestValue
    ] = useInput(validationLogic);
    const [
        enteredStreet,
        setStreetisTouched,
        isStreetValid,
        streetHasError,
        streetChangeHandler,
        streetBlurHandler,
        streetRestValue
    ] = useInput(validationLogic);
    const [
        enteredPostalCode,
        setPostalCodeisTouched,
        isPostalCodeValid,
        postalCodeHasError,
        postalCodeChangeHandler,
        postalCodeBlurHandler,
        postalCodeRestValue
    ] = useInput(validationLogic);
    const [
        enteredCity,
        setCityisTouched,
        isCityValid,
        cityHasError,
        cityChangeHandler,
        cityBlurHandler,
        cityRestValue
    ] = useInput(validationLogic);

    function settingAllInputsTouched (touched) {
        setNameisTouched(touched);
        setStreetisTouched(touched);
        setPostalCodeisTouched(touched);
        setCityisTouched(touched);
    }

    const formIsValid = isNameValid && isStreetValid && isPostalCodeValid && isCityValid;
    const cartCTX = useContext(CartContext);
    const user = {Name: enteredName , City:enteredCity , PostalCode:enteredPostalCode , Street:enteredStreet , Orders:{...cartCTX.items , TotalAmount:cartCTX.totalAmount.toFixed(2)}}
   async function postUserDataToFB() {
        const response = await fetch ('************************',
         {
            method:'POST',
            body:JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
         }
        );
        const data = await response.json();
    }

    function formSubmitHandler (e) {
        e.preventDefault();
        settingAllInputsTouched(true);
        if(!formIsValid) {
            return;
        }
        postUserDataToFB();
        nameRestValue();
        streetRestValue();
        postalCodeRestValue();
        cityRestValue()
        //POSTING DATA TO FIREBASE;

    }
    const nameInputClasses = nameHasError ? 'cart-form__input-div invalid' : 'cart-form__input-div';
    const streetInputClasses = streetHasError ? 'cart-form__input-div invalid' : 'cart-form__input-div';
    const postalCodeInputClasses = postalCodeHasError ? 'cart-form__input-div invalid' : 'cart-form__input-div';
    const cityInputClasses = cityHasError ? 'cart-form__input-div invalid' : 'cart-form__input-div';

    function closeForm() {
        props.closeCartForm(false);
    }
    
    return(
        <form className= 'cart-form' onSubmit={formSubmitHandler}>
            <div className= {nameInputClasses}>
                <label>Your Name</label>
                <input type='text' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
            </div>
            <div className= {streetInputClasses}>
                <label>Street</label>
                <input type='text' value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurHandler}/>
            </div>
            <div className= {postalCodeInputClasses}>
                <label>Postal Code</label>
                <input type='text' value={enteredPostalCode} onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler}/>
            </div>
            <div className= {cityInputClasses}>
                <label>City</label>
                <input type='text' value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurHandler}/>
            </div>
            <div className='cart-form__action'>
                <button onClick={closeForm}>cancel</button>
                <button type='submit'>Checkout </button>
            </div>
            
        </form>
    )
}

export default CartForm;