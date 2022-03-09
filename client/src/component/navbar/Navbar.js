import React from 'react';
import { useHistory } from 'react-router-dom'
import LoginUser from '../loginUser/LoginUser';
import "./Navbar.css"
import axios from 'axios'

function Navbar(props) {

  const { isLogin, userinfo, handleLogout } = props
  const history = useHistory()

  const writingOnClick = () => {
    if(isLogin === false){
      history.push('./Login')
    }else{
      history.push({
        pathname: '/writing',
        state: { userinfo: userinfo }
      })

      axios.get("http://localhost:4000/board/filter")
      .then((res) => {
        if (res.status === 200) {
          history.push('/writing')
        }else if(res.status === 401){
          history.push('/login')
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <nav className="headerNav">
      <a href="/">
        <img
          className="headerImg"
          src="/images/logo2.png"/>
      </a>

      <div>
        <button onClick={writingOnClick} className="btnNewPost">글 쓰기</button>
        {isLogin ? <LoginUser userinfo={userinfo} handleLogout={handleLogout}/> : <button onClick={() => {history.push('/login')}} className="btnNewPost">로그인</button>}
      </div>
    </nav>
  );
}

export default Navbar;