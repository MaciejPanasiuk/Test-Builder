// import  QuestionDisplay from './components/QuestionDisplay/QuestionDisplay'
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
