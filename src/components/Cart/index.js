import './style.scss'
import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

function Cart(props) {
    const cartContext = useContext(CartContext);
    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;

    const addCartItemHandler = (item) => {
        cartContext.addItem({...item,amount:1})
    };

    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    };

    const cartItems = ( 
        <ul className='cart-items'>{cartContext.items.map(item => 
            <CartItem key={item.id} {...item} onAdd={addCartItemHandler.bind(null,item)} onRemove={removeCartItemHandler.bind(null,item.id)}/>
            // <li key={item.id}>{item.name}</li>
        )}</ul>
    );

    const hasItems = cartContext.items.length > 0;


    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className='total'>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>    
            <div className='actions'>
                <button className='button--alt' onClick={props.onHideCart}>Закрыть</button>
                {hasItems && <button className='button--order' onClick={props.onHideCart}>Заказать</button>}
            </div>    
        </Modal>
    );
}

export default Cart;