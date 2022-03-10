import React, {useState} from 'react';
import BigBtn1 from '../../component/bigBtn1/BigBtn1';
import BigBtn from '../../component/bigBtn/BigBtn';
import "./Login.css"
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Login({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }
  const handleLogin = () => {
    if (!loginInfo.username || !loginInfo.password) {
      return setErrorMessage('아이디와 비밀번호를 입력하세요')
    }  

    axios.post('http://localhost:4000/users/login', {
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res) => {

      if (res.data.message === '로그인 성공') {
        handleResponseSuccess()
        history.push('/')
      } else {
        return setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleLoginSignUp = () => {
    history.push('/SignUp')
  }

  return (
    <div >
      <center>
        <img className="signUpImg" src="/images/logo3.png"/>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input className="loginInput" type='text' placeholder="아이디" onChange={handleInputValue('username')} />
          </div>
          <div>
          <input className="loginInput underLoginInput" type='password' placeholder="비밀번호" onChange={handleInputValue('password')} />
          </div>
          <div><span className="signUpErr loginErrMsg">{errorMessage}</span></div>
          <div>
            <div>
            <button className="LoginBigBtn" type='submit' onClick={handleLogin}>로그인</button>
            </div>
          </div>
          <div>
            <button onClick={handleLoginSignUp} className="bigBtn1">회원가입</button>
          </div>
        </form>
      </center>
    </div>
  );
}

export default Login;