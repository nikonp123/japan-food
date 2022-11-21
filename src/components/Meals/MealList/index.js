import React from 'react';
import './style.scss'
import Card from '../../UI/Card'
import Item from '../MealItem/Item'

const DUMMY_MEALS = [
  {
    id: "m1",
    name: 'Ролл "Наоми"',
    description:
      "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Спайс в лососе",
    description: "Рис, лосось, соус спайс",
    price: 3.99,
  },
  {
    id: "m3",
    name: "Суши с угрем",
    description: "Угорь копченый, соус унаги, кунжут",
    price: 4.99,
  },
  {
    id: "m4",
    name: 'Салат "Поке с лососем"',
    description:
      "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
    price: 7.99,
  },
];

const MealList = () => {

    const mealsList = DUMMY_MEALS.map(el=>
      <Item 
        key={el.id}
        name={el.name} 
        description={el.description} 
        price={el.price}
      />)
    return (
    <section className='meals'>
        <Card>
          <ul>
            {mealsList}
          </ul>
        </Card>
    </section>
  );
};

export default MealList;