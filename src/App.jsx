//react router dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/Rootlayout";

import useGlobalContext from "./hooks/useGlobalContext";

//toastify
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
  Register,
  Profile,
} from "./pages";

//loader
import { loader as ProductsLoader } from "./pages/products";

//action
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/login";
//react
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
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
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
