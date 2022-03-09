import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./LoginUser.css"

function LoginUser({ userinfo, handleLogout }) {

  const history = useHistory()
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const handleMyPage = () => {
    history.push({
      pathname: '/MyPage',
      state: { userinfo: userinfo }
    })
  }

  const handleSetting = () => {
    history.push({
      pathname: '/Setting',
      state: {userinfo: userinfo}
    })
  }

  return (
    <div className="menuContainer">
      <button onClick={onClick} className="menuTrigger">
        <p className="userName" >{userinfo[0].nickname + " 님"}</p>
          <img className="userImg" src = {!userinfo ? "/images/bear22.png" : userinfo[0].picture}/>
      </button>
      <svg 
        className="userSvg"
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#A5A3A4" 
        >
          <path d="M6 9l6 6 6-6"/>
      </svg>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li onClick={handleMyPage}><a href="/MyPage">마이페이지</a></li>
          <li onClick={handleSetting}><a href="/Setting">설정</a></li>
          <li onClick={handleLogout}><a href="/">로그아웃</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default LoginUser;

