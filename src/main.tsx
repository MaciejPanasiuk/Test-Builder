import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page404 from './components/Page404/Page404.tsx'
import Header from './components/Header/Header.tsx'
import IntroPage from './components/IntroPage/IntroPage.tsx'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path= '/' element= {<IntroPage/>} errorElement={<Page404 />}>
      </Route> 
      <Route path='Test' element={<><Header/><App/></>}/>
      <Route path="*" element={<Page404 />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
