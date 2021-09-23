import React from 'react';
import { Route, Link } from 'react-router-dom';
import MakeYourSet from "./pages/MakeYourSet";
import MakeYourSetForm from "./pages/MakeYourSetForm";
import Training from "./pages/Training";
import FitNotes from "./pages/FitNotes";
import Calender from "./pages/Calender";
import SideMenubar from "./pages/menu/SideMenubar";
import './App.css'

import LoginPage from "./pages/LoginPage";	// 추가
import SignupPage from "./pages/SignupPage";
import Navbar from "./pages/Navbar";

import Signup from "./pages/signup";
import Login from "./pages/Login";

// import new_makeYourSet from "./pages/makeyourset/MakeYourSet";
// import MakeTest from "./pages/gaok/MakeYourSet"

const App = () => {
  return (
      <div className='main-container'>
        <SideMenubar />
        <Route path="/makeyourset" exact={true} component={MakeYourSet} />
        <Route path="/makeyoursetform" component={MakeYourSetForm} />
        <Route path="/training" component={Training} />
        <Route path="/fitnotes" component={FitNotes} />
        <Route path="/calender" component={Calender} />

        <Route path="/" exact={true} component={Signup} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/navbar" component={Navbar} />

        <Route path="/log" component={Login}/>
        {/* <Route path="/new/makeyourset" component={new_makeYourSet}/> */}
        {/* <Route path="/maketest" component={MakeTest}/> */}
      </div>
  );
};

export default App;