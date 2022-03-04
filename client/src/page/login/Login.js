import React, {useState} from 'react';
import BigBtn from '../../component/bigBtn/BigBtn';
import BigBtn1 from '../../component/bigBtn1/BigBtn1';
import "./Login.css"

function Login() {

  return (
    <div>
      <center>
        <h1>Sign In</h1>
        <form>
          <div>
            <input type='email' placeholder="아이디"/>
          </div>
          <div>
            <input type='password' placeholder="비밀번호"/>
          </div>
          <div>
            <BigBtn />
          </div>
          <div>
            <BigBtn1 />
          </div>
        </form>
      </center>
    </div>
  );
}

export default Login;