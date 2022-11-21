import React from 'react';
import './style.scss'

function Button(props) {
    return (
        <button className='btn' onClick={props.onClick}>{props.title}</button>
    );
}

export default Button;