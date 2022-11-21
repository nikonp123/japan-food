import './style.scss'
import React from 'react';
import Modal from '../UI/Modal';

function Cart(props) {
    return (
        <Modal onHideCart={props.onHideCart}>
            cart items
            <div className='total'>
                <span>Итого</span>
            </div>    
            <div className='actions'>
                <button className='button--alt' onClick={props.onHideCart}>Закрыть</button>
                <button className='button--order' onClick={props.onHideCart}>Заказать</button>
            </div>    
        </Modal>
    );
}

export default Cart;