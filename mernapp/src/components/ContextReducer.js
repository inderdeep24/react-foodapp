import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CardStateContext = createContext();
const CardDispatchContext = createContext();

const reducer = (state, action) => {
  // Your reducer logic here
  switch (action.type) {
    case "ADD":
      const newState = [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
      localStorage.setItem('cart', JSON.stringify(newState)); // Save cart data to local storage
      return newState;

    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;

    case "DROP":
      let empArray = []
      return empArray;

    case "UPDATE":
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.qty, parseInt(action.qty), action.price + food.price)
          arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price + food.img }
        }
        return arr
      })
      return arr
    default:
      console.log("error in reducer")
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('cart')) || []); // Load cart data from local storage

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state)); // Update local storage whenever cart state changes
  }, [state]);


  return (
    <CardDispatchContext.Provider value={dispatch}>
      <CardStateContext.Provider value={state}>
        {children}
      </CardStateContext.Provider>
    </CardDispatchContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CardStateContext);
};

export const useDispatchCart = () => {
  return useContext(CardDispatchContext);
};
