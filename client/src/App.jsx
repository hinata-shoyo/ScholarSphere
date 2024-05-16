import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/homepage/Home';


const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home token={window.localStorage.getItem("token")}/>} />
      </Routes>
    </Router>      

    </>
  )
}

export default App
