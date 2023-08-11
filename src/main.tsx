import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page404 from './components/Page404/Page404.tsx'
import Header from './components/Header/Header.tsx'
import IntroPage from './components/IntroPage/IntroPage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroPage />,
    errorElement: <Page404 />,
  },
  {
    path: "/Test",
    element: <><Header/><App/></>,
    children: [],
  },
  {
    path: "*",
    element: <Page404/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
