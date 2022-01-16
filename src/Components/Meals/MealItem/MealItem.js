import { useContext } from 'react/cjs/react.development';
import './MealItem.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
function MealItem (props) {
    const price = `$${props.price.toFixed(2)}`;
    
    const cartCtx = useContext(CartContext);

    function addToCartHandler (amount) {
        cartCtx.addItem({id:props.id , name:props.name , price:props.price , amount:amount});
        console.log(cartCtx.items)
    }
    return(
        <li className = 'meal'>
            <div>
                <h3>{props.name}</h3>
                <div className = 'description'>{props.description}</div>
                <div className = 'price'>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart = {addToCartHandler} id={props.id} />
            </div>
        </li>
    );
}

export default MealItem;