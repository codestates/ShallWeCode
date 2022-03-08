import React from 'react';
import { useHistory } from 'react-router-dom'
import LoginUser from '../loginUser/LoginUser';
import "./Navbar.css"

function Navbar(props) {

  const { isLogin, userinfo, handleLogout } = props
  const history = useHistory()

  return (
    <nav className="headerNav">
      <a href="/">
        <img
          className="headerImg"
          src="/images/logo2.png"/>
      </a>

      <div>
        <button className="btnNewPost">글 쓰기</button>
        {isLogin ? <LoginUser handleLogout={handleLogout}/> : <button onClick={() => {history.push('/login')}} className="btnNewPost">로그인</button>}
      </div>
    </nav>
  );
}

export default Navbar;