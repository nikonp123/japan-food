import React, { useEffect, useState } from 'react';
import './style.scss';
import Card from '../../UI/Card';
import Item from '../MealItem/Item';
import useHttp from '../../../hooks/use-http';

const MealList = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendHttpRequest: fetchProducts } = useHttp();

  useEffect(() => {
    const requestOptins = {
      url: 'https://modernreactcustomhooks-default-rtdb.firebaseio.com/meals.json',
    };
    const manageData = (mealsData) => {
      const loadedMeals = [];
      for (const key in mealsData) {
        loadedMeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
        // if (Object.hasOwnProperty.call(mealsData, key)) {
        //   const element = mealsData[key];
        // }
      }
      setMeals(loadedMeals);
    };

    fetchProducts(requestOptins, manageData);
  }, [fetchProducts]);

  const mealsList = meals.map((el) => (
    <Item
      key={el.id}
      id={el.id}
      name={el.name}
      description={el.description}
      price={el.price}
    />
  ));

  return (
    <section className="meals">
      {error && <p>{error}</p>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
