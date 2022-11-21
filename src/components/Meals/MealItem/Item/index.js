import React from 'react';
import './style.scss'

function Item(props) {

    const formattedPrice=`${props.price.toFixed(2)} грн`;
    return (
        <li className='meal'>
            <div>
                <h3>{props.name}</h3>
                <div className='description'>{props.description}</div>
                <div className='price'>{formattedPrice }</div>
            </div>
            <div></div>
        </li>
    );
}

export default Item;