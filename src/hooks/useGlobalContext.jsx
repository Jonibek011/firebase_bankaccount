import { useContext } from "react";
import { mainContext } from "../context/GlobalContext";
function useGlobalContext() {
  const context = useContext(mainContext);
  return context;
}

export default useGlobalContext;
