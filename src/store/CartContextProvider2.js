
import React, { useReducer } from 'react';
import CartContext from './cart-context';
import { ADD_ITEM, REMOVE_ITEM } from './types';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cardReducer = (state, action) => {
    if (action.type === ADD_ITEM) {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
    
        const existingCartItemIndex = state.items.findIndex((item) => {
          return item.id === action.item.id;
        });
    
        const existingCartItem = state.items[existingCartItemIndex];
    
        let updatedItem;
        let updatedItems;
    
        if (existingCartItem) {
          updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
    
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItem = {
            ...action.item,
          };
          updatedItems = state.items.concat(updatedItem);
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    
    if (action.type === REMOVE_ITEM) {
        const existingCartItemIndex = state.items.findIndex((item) => {
          return item.id === action.id;
        });
    
        const existingCartItem = state.items[existingCartItemIndex];
    
        const updatedTotalAmount = state.totalAmount - existingCartItem.amount;
    
        let updatedItems;
        if (existingCartItem.amount === 1) {
          updatedItems = state.items.filter((item) => item.id != action.id);
        } else {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    
      return defaultCartState;
        
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