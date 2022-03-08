import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, useHistory, Route, Switch, Link } from "react-router-dom";
import LoginUser from './component/loginUser/LoginUser';
import Navbar from './component/navbar/Navbar';
import Main from './page/main/Main';
import Login from './page/login/Login';
import SignUp from './page/signUp/SignUp';
import Setting from './page/setting/Setting';
import Writing from './page/writing/Writing';
import Detail from './page/detail/Detail';
import MyPage from './page/mypage/MyPage';
import axios from 'axios';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const history = useHistory();

  const isAuthenticated = () => {
    axios.get('http://localhost:4000/users/auth')
    .then(data => {
      setUserinfo(data.data.data.data)
      setIsLogin(true)
      history.push('/')
      // console.log(isLogin, userinfo)
    })
    .catch(err => console.log("주 에러 : ",err))
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
  };
  const handleResponseSuccess = () => {
    isAuthenticated()
  };
  const handleLogout = () => {
    axios.post('http://localhost:4000/users/logout').then((res) => {
      setUserinfo(null);
      setIsLogin(false);
    });
  };

  const loadingThumbnail = () => {
    axios.get('http://localhost:4000/board/filter')
    .then((res) => {
      setThumbnail(res.data.data.data)
    })
  }
  useEffect(() => {
    loadingThumbnail()
    // isAuthenticated()
  }, []);

  return (
    <BrowserRouter>
        <Route exact path="/">
          <Main isLogin={isLogin} userinfo = {userinfo} handleLogout={handleLogout} thumbnail={thumbnail}/>
        </Route>
        <Route path="/Login">
          <Login handleResponseSuccess={handleResponseSuccess}/>
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/Setting">
          <Setting isLogin={isLogin} userinfo = {userinfo} handleLogout={handleLogout}/>
        </Route>
        <Route path="/Writing">
          <Writing isLogin={isLogin} userinfo = {userinfo} handleLogout={handleLogout}/>
        </Route>
        <Route path="/Detail">
          <Detail isLogin={isLogin} userinfo = {userinfo} handleLogout={handleLogout}/>
        </Route>
        <Route path="/MyPage">
          <MyPage isLogin={isLogin} userinfo = {userinfo} handleLogout={handleLogout}/>
        </Route>
    </BrowserRouter>
  );
}

export default App;
