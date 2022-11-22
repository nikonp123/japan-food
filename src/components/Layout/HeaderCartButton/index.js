import {useContext, useEffect, useState} from 'react';
import './style.scss'
import CartIcon from '../../Cart/CartIcon'
import CartContext from '../../../store/cart-context';

function HeaderCartButton(props) {
    const [isButtonAnnimated,setIsButtonAnnimated] = useState(false);
    const cartContext = useContext(CartContext);
    const cartItemsNumber = cartContext.items.reduce((currentValue,item)=>{
        return currentValue+item.amount;
    },0);

    const buttonClasses = 'button' + (isButtonAnnimated ?' bump' :''); 

    useEffect(()=>{
        if (cartContext.items.length===0) {
            return;    
        }
        setIsButtonAnnimated(true);
        const timer = setTimeout(()=>{
            setIsButtonAnnimated(false);
        },300)

        return () => {
            clearTimeout(timer);
        }
    },[cartContext.items])

    return (

        <button className={buttonClasses} onClick={props.onClick}>
            <span className='icon'>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className='badge'>{cartItemsNumber}</span>
        </button>
    );
}

export default HeaderCartButton;