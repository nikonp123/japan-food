import Promo from '../Promo'
import MealList from '../MealList'
import React from 'react';

function Meals(props) {
    return (
        <React.Fragment>
            <Promo/>
            <MealList/>     
        </React.Fragment>    
    );
}

export default Meals;