import { Fragment, useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown , setIsCartShown] = useState(false);

  function showCart () {
    setIsCartShown(true);
  }
  
  function hideCart () {
    setIsCartShown(false);
  }
  return (
    <CartProvider>
      {isCartShown && <Cart hideCart = {hideCart}/>}
      <Header showCart = {showCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
