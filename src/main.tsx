import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Page404 from "./components/Pages/Page404/Page404.tsx";
import TestLoader from "./components/Test/TestLoader/TestLoader.tsx";
import { EMPTY_TEST } from "./Data/const.ts";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RegisterForm from "./components/Pages/RegisterPage/RegisterForm/RegisterForm.tsx";
import SuccesfulRegister from "./components/Pages/RegisterPage/SuccesfulRegister/SuccesfulRegister.tsx";
import LoginPage from "./components/Pages/LoginPage/LoginPage.tsx";
import LoginForm from "./components/Pages/LoginPage/LoginForm/LoginForm.tsx";
import PasswordRecoveryPage from "./components/Pages/PasswordRecoveryPage/PasswordRecoveryPage.tsx";
import RecoveryQuestion from "./components/Pages/PasswordRecoveryPage/RecoveryQuestion/RecoveryQuestion.tsx";
import ResetPassword from "./components/Pages/PasswordRecoveryPage/ResetPassword/ResetPassword.tsx";
import RecoverySuccess from "./components/Pages/PasswordRecoveryPage/RecoverySuccess/RecoverySuccess.tsx";
import ProtectedRouteRecovery from "./components/UI/ProtectedRouteRecovery.tsx";
import UserPanel from "./components/Pages/UserPanel/UserPanel.tsx";
import About from "./components/Pages/AboutPage/AboutPage.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    errorElement: <Page404 />,
    children: [
      {
        path: "Test",
        element: <TestLoader TestToLoad={EMPTY_TEST} />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Register",
        element: <RegisterPage />,
        children: [
          {
            path: "SignIn",
            element: <RegisterForm />,
          },
          {
            path: "Success",
            element: <SuccesfulRegister />,
          },
        ],
      },
      {
        path: "LogIn",
        element: <LoginPage />,
        children: [{ path: "Form", element: <LoginForm /> }],
      },
      {
        path: "PasswordRecovery",
        element: <ProtectedRouteRecovery><PasswordRecoveryPage /></ProtectedRouteRecovery>,
        children: [
          {
            path: "Question",
            element: <RecoveryQuestion />,
          },
          {
            path: "Reset",
            element: <ResetPassword />,
          },
          { path: "Success", element: <RecoverySuccess /> },
        ],
      },
      {
        path: "UserPanel",
        element: <UserPanel />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
