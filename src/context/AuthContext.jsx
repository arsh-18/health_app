import React, { createContext, useContext, useReducer, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// Initial state
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') ||  null,
};

// if(initialState.user)initialState.role = initialState.userole;

// Create context
export const authContext = createContext(initialState);

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        // ...state,
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(state.user));
    localStorage.setItem('token',state.token);
    localStorage.setItem('role',state.role );
    
  },[state])

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
