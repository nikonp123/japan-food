import React from 'react';
import './style.scss'
import CartIcon from '../../Cart/CartIcon'

function HeaderCartButton(props) {
    return (

        <button className='button'>
            <span className='icon'>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className='badge'>2</span>
        </button>
    );
}

export default HeaderCartButton;