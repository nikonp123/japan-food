import './style.scss';
import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';
import useHttp from '../../hooks/use-http';

function Cart(props) {
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccesful, setWasDataSendingSuccesful] = useState(false);
  const cartContext = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;

  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  };

  const { isLoading, error, sendHttpRequest: fetchUserData } = useHttp();

  const submitOrderHandler = async (userData) => {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    const requestOptins = {
      url: 'https://modernreactcustomhooks-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData, orderedMeals: cartContext.items }),
    };
    setIsDataSubmitting(true);
    // await sleep(3000);
    await fetchUserData(requestOptins);
    setIsDataSubmitting(false);
    // await sleep(3000);
    setWasDataSendingSuccesful(true);
    if (error) {
      console.log('My error ' + error);
    }
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className="cart-items">
      {cartContext.items.map(
        (item) => (
          <CartItem
            key={item.id}
            {...item}
            onAdd={addCartItemHandler.bind(null, item)}
            onRemove={removeCartItemHandler.bind(null, item.id)}
          />
        )
        // <li key={item.id}>{item.name}</li>
      )}
    </ul>
  );

  const hasItems = cartContext.items.length > 0;
  let contentSubmit = '';
  if (isSubmitOrderAvailable) {
    contentSubmit = (
      <SubmitOrder onCancel={props.onHideCart} onSubmit={submitOrderHandler} />
    );
  } else {
    contentSubmit = (
      <div className="actions">
        <button className="button--alt" onClick={props.onHideCart}>
          Закрыть
        </button>
        {hasItems && (
          <button className="button--order" onClick={orderHandler}>
            Заказать
          </button>
        )}
      </div>
    );
  }

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className="total">
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {contentSubmit}
    </React.Fragment>
  );

  const dataSubmitingCartModalContent = <p>Отправка данных...</p>;

  const dataWasSubmittedCartModalContent = (
    <React.Fragment>
      <p>Ваш заказ успешно отправлен!</p>
      <div className="actions">
        <button className="button--alt" onClick={props.onHideCart}>
          Закрыть
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmitting && !wasDataSendingSuccesful && cartModalContent}
      {isDataSubmitting && dataSubmitingCartModalContent}
      {wasDataSendingSuccesful && dataWasSubmittedCartModalContent}
    </Modal>
  );
}

export default Cart;
