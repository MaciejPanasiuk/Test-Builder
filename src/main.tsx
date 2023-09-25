import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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
import GlobalStyles from "./styles/GlobalStyles.ts";
import AppLayout from "./styledComponents/AppLayout.tsx";

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
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path='/' element={<AppLayout/>}>
//       <Route index element={<Navigate replace to="About" />} />
//       <Route path="About" element={<About />} />
//       <Route path="Test" element={<TestLoader TestToLoad={EMPTY_TEST} />} />
//       <Route path="Register" element={<RegisterPage />}>
//         <Route path="SignIn" element={<RegisterForm />} />
//         <Route path="Success" element={<SuccesfulRegister />} />
//       </Route>
//       <Route path="LogIn" element={<LoginPage />}>
//         <Route path="Form" element={<LoginForm />} />
//       </Route>
//       <Route
//         path="PasswordRecovery"
//         element={
//           <ProtectedRouteRecovery>
//             <PasswordRecoveryPage />
//           </ProtectedRouteRecovery>
//         }
//       >
//         <Route path="Question" element={<RecoveryQuestion />} />
//         <Route path="Reset" element={<ResetPassword />} />
//         <Route path="Success" element={<RecoverySuccess />} />
//       </Route>
//       <Route path="UserPanel" element={<UserPanel />} />
//       </Route>
//       <Route path="*" element={<Page404 />} />
//     </Routes>
//   )
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <App />
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
