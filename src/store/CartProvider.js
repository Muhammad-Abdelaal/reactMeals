import {useReducer} from 'react';
import CartContext from "./cart-context";



const defaultCartState = {
    items:[],
    totalAmount:0
}

function cartReducer(state , action ) {
    if(action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let updatedItems;

        const existingItemIndex = state.items.findIndex(function findingIndexOfExistingItem (item){
            return item.id === action.item.id;
        });

        const existingItem = state.items[existingItemIndex];
        if(existingItem) {
            let updatedItem = {...existingItem , amount: existingItem.amount + action.item.amount}
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem
        }
        else {
             updatedItems = state.items.concat(action.item) ;
        }
        
        return {
            items: updatedItems ,
            totalAmount:newTotalAmount
        };
    };

    if(action.type ==='REMOVE') {
        const existingItemIndex = state.items.findIndex(function findingIndexOfExistingItem (item){
            return item.id === action.id;
        });
        const existingItem = state.items[existingItemIndex];
        const newTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1 ) {
            updatedItems = state.items.filter(function removingExistingItemFromCart (item) {
              return  item.id !== action.id
            });

        }
        else {
           const updatedItem = {...existingItem, amount: existingItem.amount - 1};
           updatedItems = [...state.items];
           updatedItems[existingItemIndex] = updatedItem

        }
        return {
            items: updatedItems ,
            totalAmount:newTotalAmount
        };
    }
    return defaultCartState;
};

function CartProvider (props) {

    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartState);
    
    function addItemToCartHandler (item) {
        dispatchCartAction({type:'ADD' , item:item});
    };

    function removeItemFromCartHandler(id) {
        dispatchCartAction({type:'REMOVE' , id:id});
    };

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler ,
        removeItem:removeItemFromCartHandler 
    };
 
    return(
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;