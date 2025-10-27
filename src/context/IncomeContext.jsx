import { createContext } from "react";
import { useAllCollection } from "../hooks/useAllCollection";
import useGlobalContext from "../hooks/useGlobalContext";
export const MainIncomContext = createContext();

export function IncomContextProvider({ children }) {
  const { user } = useGlobalContext();

  //firebasedan data olish
  const { data: incomes } = useAllCollection(
    "Incomes",
    user ? ["userId", "==", user.uid] : null
  );

  return (
    <MainIncomContext.Provider value={{ incomes: incomes || [] }}>
      {children}
    </MainIncomContext.Provider>
  );
}
