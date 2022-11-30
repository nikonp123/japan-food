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
      }
      setMeals(loadedMeals);
    };

    fetchProducts(requestOptins, manageData);

    // const timer = setTimeout(() => {
    //   fetchProducts(requestOptins, manageData);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, [fetchProducts]);

  let content = '';
  if (isLoading) {
    content = <p className="meals loading">Loading...</p>;
  } else if (error) {
    content = <p className="meals error">{error}</p>;
  } else {
    content = meals.map((el) => (
      <Item
        key={el.id}
        id={el.id}
        name={el.name}
        description={el.description}
        price={el.price}
      />
    ));
  }

  return (
    <section className="meals">
      {/* {error && <p>{error}</p>} */}
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default MealList;
