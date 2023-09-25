// import  QuestionDisplay from './components/QuestionDisplay/QuestionDisplay'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./styledComponents/AppLayout";
import Page404 from "./components/Pages/Page404/Page404";
import TestLoader from "./components/Test/TestLoader/TestLoader";
import { EMPTY_TEST } from "./Data/const";
import About from "./components/Pages/AboutPage/AboutPage";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import RegisterForm from "./components/Pages/RegisterPage/RegisterForm/RegisterForm";
import SuccesfulRegister from "./components/Pages/RegisterPage/SuccesfulRegister/SuccesfulRegister";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import LoginForm from "./components/Pages/LoginPage/LoginForm/LoginForm";
import ProtectedRouteRecovery from "./components/UI/ProtectedRouteRecovery";
import PasswordRecoveryPage from "./components/Pages/PasswordRecoveryPage/PasswordRecoveryPage";
import RecoveryQuestion from "./components/Pages/PasswordRecoveryPage/RecoveryQuestion/RecoveryQuestion";
import ResetPassword from "./components/Pages/PasswordRecoveryPage/ResetPassword/ResetPassword";
import RecoverySuccess from "./components/Pages/PasswordRecoveryPage/RecoverySuccess/RecoverySuccess";
import UserPanel from "./components/Pages/UserPanel/UserPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";


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
        <AppLayout />
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

function App() {
  return (

    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyles />
    <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
