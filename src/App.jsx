//react router dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/Rootlayout";

import useGlobalContext from "./hooks/useGlobalContext";

//toastify
import { toast } from "react-hot-toast";
//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

//pages
import {
  Home,
  About,
  Contact,
  ProtectedRoutes,
  Login,
  Products,
} from "./pages";

//loader
import { loader as HomeLoader } from "./pages/home";
import { loader as ProductsLoader } from "./pages/products";
import { action as HomeAction } from "./pages/home";
import { useEffect } from "react";
function App() {
  const { user, dispatch, readyState } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          loader: HomeLoader,
          action: HomeAction,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "product/:id",
          element: <Products />,
          loader: ProductsLoader,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
      dispatch({ type: "UserState" });
    });
  }, []);
  return <>{readyState && <RouterProvider router={routes} />}</>;
}

export default App;
