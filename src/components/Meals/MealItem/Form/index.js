import React, { useRef, useState } from 'react';
import Input from '../../../UI/Input';
import './style.scss'

function Form(props) {

    const [isAmountValid,setIsAmountValid] = useState(true);

    const amountInputRef = useRef();
    
    const submitHandler = (event) => {
        event.preventDefault();

        //лучше было ч/з управляемый компонент: связать input со state
        const inputAmount = amountInputRef.current.value;
        // const inputAmount = Number(amountInputRef.current.value);
        // const inputAmount = +amountInputRef.current.value;
        if (inputAmount.trim().length ===0 || +inputAmount<1 || +inputAmount>10) {
            setIsAmountValid(false);
            return;     
        }
        props.onAddToCart(+inputAmount);
    }

    return (
        <form className='form' onSubmit={submitHandler}>
            <Input 
                ref = {amountInputRef}
                label='Кол-во' 
                input={{
                    id: props.id,
                    type: 'number',
                    min: '1',
                    step: '1',
                    defaultValue: '1'    
                }}/>
            <button>Добавить</button>
            {!isAmountValid && <p>Введите кол-во от 1 до 10!</p>}
        </form>
    );
}

export default Form;