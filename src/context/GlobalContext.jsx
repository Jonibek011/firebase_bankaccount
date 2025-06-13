import { createContext, useReducer } from "react";

export const mainContext = createContext();

//firestore

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "UserState":
      return { ...state, readyState: true };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    readyState: false,
    loading: false,
  });

  return (
    <mainContext.Provider value={{ ...state, dispatch }}>
      {children}
    </mainContext.Provider>
  );
}
