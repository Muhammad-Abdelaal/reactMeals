import './MealItemForm.css';
import Input from '../../UI/Input';
import { useRef , useState} from 'react/cjs/react.development';
function MealItemForm(props) {
    const [amountIsValid , setAmountIsValid] = useState(true);
    const inputRef = useRef();
    function formSumbitHandler (e) {
        e.preventDefault();
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ) {
            setAmountIsValid(false);
            console.log(amountIsValid);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
        
    }
    return(
        <form className = 'form' onSubmit = {formSumbitHandler}>
            <Input ref = {inputRef} label = 'Amount' input = {{
                id:'amount_'+ props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
              }}
            />
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
            <button>+ Add</button>
        </form>
    );
}

export default MealItemForm;