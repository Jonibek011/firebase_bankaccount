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
import { lazy, Suspense, useEffect } from "react";
//pages
import {
  Home,
  About,
  Contact,
  ProtectedRoutes,
  Login,
  Register,
  Profile,
} from "./pages";

const Fund = lazy(() => import("./pages/expense/Fund"));
const Statistics = lazy(() => import("./pages/expense/Statistics"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Expense = lazy(() => import("./pages/Expense"));
const Chat = lazy(() => import("./pages/Chat"));

//action
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/login";

import { action as TaskAction } from "./pages/Tasks";
import { action as ExpenseAction } from "./pages/Expense";
//react

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
          path: "profile",
          element: <Profile />,
        },
        {
          path: "dashboard",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "tasks",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Tasks />
            </Suspense>
          ),
          action: TaskAction,
        },
        {
          path: "expense",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Expense />
            </Suspense>
          ),
          action: ExpenseAction,
        },
        {
          path: "chat",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Chat />
            </Suspense>
          ),
        },
        {
          path: "expense/fund",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Fund />
            </Suspense>
          ),
        },
        {
          path: "expense/statistics",
          element: (
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Statistics />
            </Suspense>
          ),
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
