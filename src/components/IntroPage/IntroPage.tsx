import React from 'react'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';

export default function IntroPage() {

  const navigate = useNavigate();

  const handleLoadTest=()=>{
    navigate(`/Test`)
  }
  return (
    <><Header/>
    <button onClick={handleLoadTest}>Load sample Test</button>
    </>
  )
}
