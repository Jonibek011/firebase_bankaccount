import { createContext, useReducer } from "react";

export const mainContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "UserState":
      return { ...state, readyState: true };
    case "LOGOUT":
      return { ...state, user: null };
    case "LOADING":
      return { ...state, loading: payload };
    case "ADDTASK":
      return { ...state, tasks: payload };
    case "MONTHLYSPEND":
      return { ...state, monthlySpend: payload };
    case "CHART":
      return { ...state, chartData: payload };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    readyState: false,
    loading: false,
    tasks: [],
    monthlySpend: null,
    chartData: [],
  });

  // const data = useAllCollection("tasks", ["userId", "==", state.user.uid]);
  // console.log(state.user.uid);
  return (
    <mainContext.Provider value={{ ...state, dispatch }}>
      {children}
    </mainContext.Provider>
  );
}
