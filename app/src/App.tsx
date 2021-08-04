import React from 'react';
import './App.css';
import PoseEstimator from './components/PoseEstimator/PoseEstimator'
import { Route, Link, BrowserRouter, Switch} from 'react-router-dom';
import MakeYourSet from "./pages/MakeYourSet";
import Training from "./pages/Training";
import FitNotes from "./pages/FitNotes";
import Calender from "./pages/Calender";
import SideMenubar from "./pages/menu/SideMenubar";
import './css/App.css'
import LoginPage from "./pages/LoginPage";	// 추가
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className='main-container'>
        <SideMenubar />
        <Route path="/" exact={true} component={MakeYourSet} />
        <Route path="/makeyourset" exact={true} component={MakeYourSet} />
        <Route path="/training" component={Training} />
        <Route path="/fitnotes" component={FitNotes} />
        <Route path="/calender" component={Calender} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
    </div>
  );
}

export default App;
