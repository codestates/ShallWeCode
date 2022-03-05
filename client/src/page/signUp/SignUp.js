import React from 'react';
import BigBtn from '../../component/bigBtn/BigBtn';
import BigBtn1 from '../../component/bigBtn1/BigBtn1';
import "./SignUp.css"

function SignUp(props) {
  return (
    <div >
      <center>
        <h1>Sign In</h1>
        <form>
          <div>
            <input className="logoutInput" type='email' placeholder="아이디"/>
          </div>
          <div>
            <input className="logoutInput" type='password' placeholder="비밀번호"/>
          </div>
          <div>
            <input className="logoutInput" type='email' placeholder="비밀번호 확인"/>
          </div>
          <div>
            <input className="logoutInput signUpInput" type='email' placeholder="닉네임"/>
          </div>
          <div>
            <BigBtn1/>
          </div>

        </form>
      </center>
    </div>
  );
}

export default SignUp;