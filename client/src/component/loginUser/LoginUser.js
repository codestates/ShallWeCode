import React, { useRef, useState } from "react";
import "./LoginUser.css"

function LoginUser() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menuContainer">
      <button onClick={onClick} className="menuTrigger">
        <p className="userName" >안녕하세요</p>
          <img className="userImg" src = "/images/bear22.png "/>
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
          <li><a href="/messages">마이페이지</a></li>
          <li><a href="/trips">설정</a></li>
          <li><a href="/saved">로그아웃</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default LoginUser;

