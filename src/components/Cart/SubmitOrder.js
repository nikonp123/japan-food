import React, { useState } from 'react';
import styles from './SubmitOrder.module.css';

function SubmitOrder(props) {
  const [name, setName] = useState('');
  const [adres, setAdres] = useState('');
  const [phone, setPhone] = useState('');

  const confirmOrderHandler = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(adres);
    console.log(phone);
  };

  const nameInputChangeHandler = (e) => {
    setName(e.target.value);
  };

  const adressInputChangeHandler = (e) => {
    setAdres(e.target.value);
  };

  const phoneInputChangeHandler = (e) => {
    setPhone(e.target.value);
  };

  return (
    <form onSubmit={confirmOrderHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Введите имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputChangeHandler}
          //   placeholder="введите имя"
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="adres">Введите адрес:</label>
        <input
          type="text"
          id="adres"
          value={adres}
          onChange={adressInputChangeHandler}
          //   placeholder="введите адрес"
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="phone">Введите телефон:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={phoneInputChangeHandler}
          //   placeholder="введите телефон"
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Подтвердить</button>
        <button type="button" onClick={props.onCancel}>
          Отменить
        </button>
      </div>
    </form>
  );
}

export default SubmitOrder;
