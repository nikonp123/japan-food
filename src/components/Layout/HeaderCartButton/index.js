import {useContext} from 'react';
import './style.scss'
import CartIcon from '../../Cart/CartIcon'
import CartContext from '../../../store/cart-context';

function HeaderCartButton(props) {

    const cartContext = useContext(CartContext);
    const cartItemsNumber = cartContext.items.reduce((currentValue,item)=>{
        return currentValue+item.amount;
    },0);


    return (

        <button className='button' onClick={props.onClick}>
            <span className='icon'>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className='badge'>{cartItemsNumber}</span>
        </button>
    );
}

export default HeaderCartButton;