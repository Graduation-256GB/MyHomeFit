import React from 'react';
import { Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import MakeYourSet from "./pages/MakeYourSet";
import MakeYourSetForm from "./pages/MakeYourSetForm";
import Training from "./pages/Training";
import FitNotes from "./pages/FitNotes";
import Calender from "./pages/Calender";
import Main from "./pages/Main";
import './App.css'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todo from "./components/Calendar/TodoList/Todolist"


const App = () => {

  return (
    <RecoilRoot>
      <div className='main-container'>
        
        <Route path="/makeyourset" exact={true} component={MakeYourSet} />
        <Route path="/makeyoursetform" component={MakeYourSetForm} />
        {/* <Route path="/makeyourset/:setId" exact={true} component={Training} /> */}
        <Route path="/training" component={Training} />
        <Route path="/fitnotes" component={FitNotes} />
        <Route path="/calender" component={Calender} />
        <Route path="/main" component={Main} />

        <Route path="/signup" exact={true} component={Signup} />
        <Route path="/" exact={true} component={Signup} />
        <Route path="/login" component={Login}/>
        {/* <Route path="/new/makeyourset" component={new_makeYourSet}/> */}
        {/* <Route path="/maketest" component={MakeTest}/> */}
        <Route path="/todo" component={Todo}/>
      </div>
      </RecoilRoot>
  );
};

export default App;