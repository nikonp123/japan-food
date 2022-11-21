import React from 'react';
import Input from '../../../UI/Input';
import './style.scss'

function Form(props) {
    return (
        <form className='form'>
            <Input label='Кол-во' input={{
                id: props.id,
                type: 'number',
                min: '1',
                step: '1',
                defaultValue: '1'    
            }}/>
            <button>Добавить</button>
        </form>
    );
}

export default Form;