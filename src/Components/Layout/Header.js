import {Fragment} from 'react';
import './Header.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header (props) {
  return(
      <Fragment>
        <header className = 'header'>
            <h1>ReactMeals</h1>
            <HeaderCartButton showCart = {props.showCart}/>
        </header>
        <div className = "main-image">
            <img src = {mealsImage} alt = 'a table full of food'/>
        </div>
      </Fragment>
  );
}

export default Header;