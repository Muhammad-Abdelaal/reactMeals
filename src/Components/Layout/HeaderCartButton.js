import './HeaderCartButton.css';
import './HeaderCartButton.css';
import CartIcon from '../Cart/CartIcon';
import { useContext , useEffect ,useState} from 'react/cjs/react.development';
import CartContext from '../../store/cart-context';
function HeaderCartButton (props) {
    const [isCartBumping , setIsCartBumping] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx ;
    const numberOfCartItems = cartCtx.items.reduce((currentNumber,item)=>{
        return currentNumber + item.amount
    } , 0);
    
    const cartBtnClasses =   `button ${isCartBumping ?'bump' : ''} `
    useEffect(
        function addingBumbToCartItem () {
            if(items.length === 0 ) {
                return;
            }
            setIsCartBumping(true);

           const timer =  setTimeout(() => {
                setIsCartBumping(false);
            }, 300);

            return ()=> {
                clearTimeout(timer)
            }
        }   
    , [items])
    return(
        <button onClick = {props.showCart} className = {cartBtnClasses}>
            <span className = 'icon'>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className = 'badge'>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;