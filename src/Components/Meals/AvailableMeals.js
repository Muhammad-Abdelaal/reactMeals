import { useState, useEffect , useCallback } from 'react';
import Card from '../UI/Card';
import './AvailableMeals.css';
import MealItem from './MealItem/MealItem';


function AvailableMeals () {
  const [meals, setMeals] = useState([]);
  const fetchedMeals = [];
    useEffect(() => {
       const fetchingMeals =  fetchingMealsFromBackEnd;
       fetchingMeals();
      },[]);

    async function fetchingMealsFromBackEnd () {
      const response = await fetch('******************************');
      const data = await response.json();
      
      
      for (const key in data) {
        fetchedMeals.push({id:data[key].id , key:data[key].key , name:data[key].name , description:data[key].description , price:data[key].price });
      }
      console.log(data);
     
      setMeals(fetchedMeals);


    }
    const mealsList = meals.map(
      meal => <MealItem 
                  id={meal.id}
                  key = {meal.id}
                  name = {meal.name}
                  description = {meal.description}
                  price = {meal.price}
              />);
    return (
        <section className = 'meals'>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
            
        </section>
    );
} 

export default AvailableMeals;