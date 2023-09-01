import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page404 from './components/Page404/Page404.tsx'
import TestLoader from './components/Test/TestLoader/TestLoader.tsx'
import About from './components/DashBoard/Options/About/About.tsx'
import { EMPTY_TEST } from './Data/const.ts'


const router = createBrowserRouter([
  {
    path: "/",
    element: <><App/></>,
    errorElement: <Page404 />,
    children:[
      {
        path: "Test",
        element: <TestLoader TestToLoad={EMPTY_TEST}/>, 
      },
      {
        path: "About",
        element: <About/>, 
      },
    ]
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
