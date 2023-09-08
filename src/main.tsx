import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Page404 from "./components/Pages/Page404/Page404.tsx";
import TestLoader from "./components/Test/TestLoader/TestLoader.tsx";
import About from "./components/DashBoard/Options/About/About.tsx";
import { EMPTY_TEST } from "./Data/const.ts";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RegisterForm from "./components/Pages/RegisterPage/RegisterForm/RegisterForm.tsx";
import SuccesfulRegister from "./components/Pages/RegisterPage/SuccesfulRegister/SuccesfulRegister.tsx";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:60*60*1000
    }
  }
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
        path: "Account",
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
