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
      alert('Form not valid!');
      return;
    }

    // console.log(name);
    // console.log(address);
    // console.log(phone);

    resetNameInputValues();
    resetAddressInputValues();
    resetPhoneInputValues();
    props.onSubmit({
      name,
      address,
      phone,
    });
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
        <label htmlFor="name">??????:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputLostFocusHandler}
          //   placeholder="?????????????? ??????"
        />
      </div>
      <div className={classesDivAddress}>
        <label htmlFor="address">??????????:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={addressInputChangeHandler}
          onBlur={addressInputLostFocusHandler}
          //   placeholder="?????????????? ??????????"
        />
      </div>
      <div className={classesDivPhone}>
        <label htmlFor="phone">??????????????:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={phoneInputChangeHandler}
          onBlur={phoneInputLostFocusHandler}
          //   placeholder="?????????????? ??????????????"
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>??????????????????????</button>
        <button type="button" onClick={props.onCancel}>
          ????????????????
        </button>
      </div>
    </form>
  );
}

export default SubmitOrder;
