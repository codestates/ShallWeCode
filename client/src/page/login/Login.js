import React, {useState} from 'react';
import BigBtn from '../../component/bigBtn/BigBtn';
import BigBtn1 from '../../component/bigBtn1/BigBtn1';
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
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    if (!loginInfo.username && !loginInfo.password) {
      return setErrorMessage("아이디와 비밀번호를 입력하세요");
    }

    axios.post("http://localhost:4000/users/login", {
      username: loginInfo.username,
      password: loginInfo.password
    }).then((res) => {
      console.log("--------then------",res)
      if (res.status === 200) {
        handleResponseSuccess()
        history.push('/');
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div >
      <center>
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input className="loginInput" type='text' placeholder="아이디" onChange={handleInputValue('username')} />
          </div>
          <div>
            <input className="loginInput" type='password' placeholder="비밀번호" onChange={handleInputValue('password')} />
          </div>
          <div className='alert-box'>{errorMessage}</div>
          <div>
            <div>
              <button className="bigBtn" type='submit' onClick={handleLogin}>로그인</button>
            </div>
          </div>
          <div>
            <BigBtn1 />
          </div>
          <div className='alert-box'>{errorMessage}</div>
        </form>
      </center>
    </div>
  );
}

export default Login;