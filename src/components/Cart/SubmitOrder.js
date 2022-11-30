import React from 'react';
import useClasses from '../../hooks/use-classes';
import useInput from '../../hooks/use-input';
import styles from './SubmitOrder.module.css';

function SubmitOrder(props) {
  const funcValidate = (val) => val.trim() !== '';
  const {
    value: name,
    isEnteredlValid: isEnteredNameValid,
    hasError: hasNameInputError,
    inputChangeHandler: nameInputChangeHandler,
    inputLostFocusHandler: nameInputLostFocusHandler,
    resetValues: resetNameInputValues,
  } = useInput(funcValidate);

  const {
    value: address,
    isEnteredlValid: isEnteredAddressValid,
    hasError: hasAddressInputError,
    inputChangeHandler: addressInputChangeHandler,
    inputLostFocusHandler: addressInputLostFocusHandler,
    resetValues: resetAddressInputValues,
  } = useInput(funcValidate);

  const {
    value: phone,
    isEnteredlValid: isEnteredPhoneValid,
    hasError: hasPhoneInputError,
    inputChangeHandler: phoneInputChangeHandler,
    inputLostFocusHandler: phoneInputLostFocusHandler,
    resetValues: resetPhoneInputValues,
  } = useInput(funcValidate);

  let isFormValid = false;
  if (isEnteredNameValid && isEnteredAddressValid && isEnteredPhoneValid) {
    isFormValid = true;
  }

  const confirmOrderHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    console.log(name);
    console.log(address);
    console.log(phone);

    resetNameInputValues();
    resetAddressInputValues();
    resetPhoneInputValues();
    props.onSubmit({
      name,
      address,
      phone,
    });
    // props.onCancel();
  };

  const classesDivName = useClasses(hasNameInputError);
  const classesDivAddress = useClasses(hasAddressInputError);
  const classesDivPhone = useClasses(hasPhoneInputError);

  //   const classesDivName = `${styles.control} ${
  //     hasNameInputError ? styles.invalid : ''
  //   }`;

  //   const classesDivAddress = `${styles.control} ${
  //     hasAddressInputError ? styles.invalid : ''
  //   }`;

  //   const classesDivPhone = `${styles.control} ${
  //     hasPhoneInputError ? styles.invalid : ''
  //   }`;

  return (
    <form onSubmit={confirmOrderHandler}>
      <div className={classesDivName}>
        <label htmlFor="name">Введите имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputLostFocusHandler}
          //   placeholder="введите имя"
        />
      </div>
      <div className={classesDivAddress}>
        <label htmlFor="address">Введите адрес:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={addressInputChangeHandler}
          onBlur={addressInputLostFocusHandler}
          //   placeholder="введите адрес"
        />
      </div>
      <div className={classesDivPhone}>
        <label htmlFor="phone">Введите телефон:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={phoneInputChangeHandler}
          onBlur={phoneInputLostFocusHandler}
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
