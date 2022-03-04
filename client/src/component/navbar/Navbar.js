import React from 'react';
import LoginUser from '../loginUser/LoginUser';
import "./Navbar.css"

function Navbar(props) {
  return (
    <nav className="headerNav">
      <a href="/">
        <img
          className="headerImg"
          src="/images/logo2.png"/>
      </a>

      <div>
        <button className="btnNewPost">글 쓰기</button>
        <LoginUser />
      </div>
    </nav>
  );
}

export default Navbar;