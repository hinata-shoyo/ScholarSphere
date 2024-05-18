import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/homepage/Home';
import Profile from './components/profile/Profile';


const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home token={window.localStorage.getItem("token")}/>} />
        <Route path='/user' element={<Profile/>} />

      </Routes>
    </Router>      

    </>
  )
}

export default App
