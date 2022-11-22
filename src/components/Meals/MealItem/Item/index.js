import React, { useContext } from 'react';
import CartContext from '../../../../store/cart-context';
import Form from '../Form';
import './style.scss'

function Item(props) {
    const formattedPrice=`$${props.price.toFixed(2)}`;
    const cartContext = useContext(CartContext);
    const onAddToCart = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount,
            price: props.price
        });
    }


    return (
        <li className='meal'>
            <div>
                <h3>{props.name}</h3>
                <div className='description'>{props.description}</div>
                <div className='price'>{formattedPrice }</div>
            </div>
            <div><Form id={props.id} onAddToCart={onAddToCart}/></div>
        </li>
    );
}

export default Item;