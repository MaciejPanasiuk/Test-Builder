// import  QuestionDisplay from './components/QuestionDisplay/QuestionDisplay'
import { Outlet } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/DashBoard/DashBoard";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <DashBoard />
      <Outlet />
    </>
  );
}

export default App;
