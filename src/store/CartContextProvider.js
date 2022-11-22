
import React, { useReducer } from 'react';
import CartContext from './cart-context';
import { ADD_ITEM, REMOVE_ITEM } from './types';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cardReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            {const updateTotalAmount = state.totalAmount + action.item.price*action.item.amount;

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            let updateItem;
            let updateItems;
            
            if (existingCartItemIndex !== -1) {
                const existingCartItem = state.items[existingCartItemIndex];
                updateItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount              
                };   
                updateItems = [...state.items];
                updateItems[existingCartItemIndex] = updateItem;    
            } else {
                updateItem = {...action.item};
                updateItems = state.items.concat(updateItem);
            }

            return {
                items: updateItems,
                totalAmount: updateTotalAmount
            }}
        case REMOVE_ITEM:
            {

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id); 
            const existingCartItem = state.items[existingCartItemIndex];
            const updateTotalAmount = state.totalAmount - existingCartItem.amount;
            let updateItem;
            let updateItems;

            if (existingCartItem.amount===1) {
                updateItems = state.items.filter(item => item.id != action.id)
            } else {
                updateItem = {...existingCartItem,amount:existingCartItem.amount-1};
                updateItems = [...state.items];
                updateItems[existingCartItemIndex] = updateItem;
            }   

            return {
                items: updateItems,
                totalAmount: updateTotalAmount
            }}              
        default:
            return defaultCartState;
    }
    
};

function CartContextProvider(props) {
    
    const [cardState, dispatchCardAction] = useReducer(cardReducer,defaultCartState);

    const addItemHandler = (item) => {
        dispatchCardAction({
            type: ADD_ITEM,
            item
        })
    }

    const removeItemHandler = (id) => {
        dispatchCardAction({
            type: REMOVE_ITEM,
            id
        })
    }

    const cartContext = {
        items: cardState.items,
        totalAmount: cardState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
}

export default CartContextProvider;