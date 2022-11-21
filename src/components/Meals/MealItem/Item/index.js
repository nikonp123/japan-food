import React from 'react';
import Form from '../Form';
import './style.scss'

function Item(props) {

    const formattedPrice=`$${props.price.toFixed(2)}`;
    return (
        <li className='meal'>
            <div>
                <h3>{props.name}</h3>
                <div className='description'>{props.description}</div>
                <div className='price'>{formattedPrice }</div>
            </div>
            <div><Form id={props.id}/></div>
        </li>
    );
}

export default Item;