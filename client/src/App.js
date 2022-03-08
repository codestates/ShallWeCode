import React from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import LoginUser from './component/loginUser/LoginUser';
import Navbar from './component/navbar/Navbar';
import Main from './page/main/Main';
import Login from './page/login/Login';
import SignUp from './page/signUp/SignUp';
import Setting from './page/setting/Setting';
import Writing from './page/writing/Writing';
import Detail from './page/detail/Detail';
import MyPage from './page/mypage/MyPage';

function App() {
  return (
    <BrowserRouter>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/Setting">
          <Setting />
        </Route>
        <Route path="/Writing">
          <Writing />
        </Route>
        <Route path="/Detail">
          <Detail />
        </Route>
        <Route path="/MyPage">
          <MyPage/>
        </Route>
    </BrowserRouter>
  );
}

export default App;
