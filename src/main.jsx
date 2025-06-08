import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
//context
import { GlobalContextProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </GlobalContextProvider>
);
