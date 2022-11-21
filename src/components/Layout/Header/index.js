import React from 'react';
import './style.scss'
import imgSushi from '../../../img/sushi.jpg'
import Button from '../../UI/Button'
import HeaderCartButton from '../HeaderCartButton';

function Header(props) {
    return (
        <React.Fragment>
            <header className='header'>
                <h1>Japan's food</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className='main-image'>
                <img src={imgSushi} alt='sushi'/>
            </div>
        </React.Fragment>
    );
}

export default Header;