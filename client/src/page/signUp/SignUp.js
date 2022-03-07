import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./SignUp.css"
import axios from 'axios';

axios.defaults.withCredentials = true;


function SignUp(props) {
  const [userinfo, setuserinfo] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    nickname: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
    //        history.push("/");
    // TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.

    // console.log('userinfo',userinfo)
    const {id, password, passwordCheck, nickname } = userinfo;
    console.log(id,password ,passwordCheck, nickname)


    if(!id || !password || !passwordCheck || !nickname){
      setErrorMessage('모든 항목은 필수입니다')
    }else{
      axios.post('http://localhost:4000/users/signup', {username: id, password:password, nickname: nickname})
      .then(res=> {
        console.log('res====',res)
        if(res.status === 200){
          alert('회원가입 성공!')
          history.push("/login")
        }
      }).catch((err)=>{
        console.log('err===', err)
      })
    }
  };

  return (
    <div >
      <center>
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input 
              className="logoutInput" 
              onChange={handleInputValue('id')} 
              type='text' 
              placeholder="아이디"/>
            {/* <div className="signUpErr">이미 존재하는 아이디 입니다</div> */}
            {/* <div className="signUpErr">4~12자의 영문 대 소문자, 숫자만 사용 가능합니다</div> */}
          </div>
          <div>
            <input 
              className="logoutInput" 
              onChange={handleInputValue('password')} 
              type='password' 
              placeholder="비밀번호"/>
            {/* <div className="signUpErr">8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다</div> */}
          </div>
          <div>
            <input 
              className="logoutInput" 
              onChange={handleInputValue('passwordCheck')} 
              type='password' 
              placeholder="비밀번호 확인"/>
            {/* <div className="signUpErr">비밀번호가 일치하지 않습니다</div> */}
          </div>
          <div>
            <input 
              className="logoutInput signUpInput" 
              onChange={handleInputValue('nickname')} 
              type='text' 
              placeholder="닉네임"/>
            {/* <div className="signUpErr"> 2~10자 한글, 영어 , 숫자만 사용 가능 합니다</div> */}
            {/* <div className="signUpErr">이미 존재하는 닉네임 입니다 </div> */}
          </div>
          <div>
            {/* <div className='alert-box'>{errorMessage}</div> */}
            <button className="bigBtn1" type='submit' onClick={handleSignup}>회원가입</button>
          </div>
          
        </form>
        </center>
    </div>
  );
}

export default SignUp;