import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar/Navbar';
import Profile from '../../component/profile/Profile';
import "./Setting.css"
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { components } from 'react-select';
import { useLocation } from 'react-router';



function Setting(props) {

  const location = useLocation()
  const { isLogin, handleLogout, userinfo } = props
  const history = useHistory();

  const [nickname, setNickName] = useState('');
  const [btnActive, setBtnActive] = useState(true);
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;

  const [message, setMessage] = useState({
    idMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
    nicknameMessage: '',
    errorMessage: ''
  })

  const [validation, setValidation] = useState({
    idValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
    nicknameValidation: false,
    errorValidation: false
  })


  const settingNameOnChange = (e) => { 
    setNickName(e.target.value)
    console.log('e',e.target.value)
    if(nickname.length < 2 || nickname.length > 10 || !nicknameRegExp.test(nickname)){
      setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
      setValidation({ ...validation, nicknameValidation: true})
    }else{
      axios.post("http://localhost:4000/users/verifyNickname" , {nickname : e.target.value})
      .then((res)=>{
        setMessage({ ...message, nicknameMessage: '이미 존재하는 닉네임입니다'})
        setValidation({ ...validation, nicknameValidation: true})
        if (res.data.data.data[0].count === 0) {
          setValidation({ ...validation, nicknameValidation: false})
          setMessage({ ...message, nicknameMessage: ''})
          setBtnActive(false)
        }
      }).catch( (err) => {
        console.log(err)
      }) 
      
    }
  console.log('message',message.nicknameMessage)  
  };


  const settingNameOnClick = () => {
    if(message.nicknameMessage.length <= 0 ){
      axios.patch("http://localhost:4000/users/nicknameEdit", {nickname: nickname})
      .then((res)=>{
        if(res.status===200){
          alert('닉네임 변경이 성공했습니다')
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }



  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} userinfo={userinfo}/>
      <Profile />

      <div className="settingBox settingSection">
        <form onSubmit={(e) => e.preventDefault()} >
            <div className="largeSizeFont">기본정보</div>
            <div className="settingLabel" >
              <label>닉네임</label>
              <input onChange={settingNameOnChange} className="settingInput" type='text' />
              <button type="submit" disabled={btnActive} onClick={settingNameOnClick} className="nicknameBtn">닉네임 변경</button>
            </div>
            {nickname.length > 0 && validation.nicknameValidation ? <div><span className="signUpErr">{message.nicknameMessage}</span></div> : null}
            
            <div className="settingLabel">
              <label>아이디</label>
              <input className="settingInput" type='password' />
            </div>
        </form>
      </div>
      <div className="settingBox settingUnderBox settingSection">
      <form>
          <div className="settingLabel">
            <label>비밀번호 변경</label>
            <input className="settingInput" type='password' />
            <button className="passwordBtn">비밀번호 변경</button>
          </div>
          
          <div className="settingLabel">
            <label>비밀번호 확인</label>
            <input className="settingInput" type='password' />
          </div>
          {/* <div>비밀번호가 동일하지 않습니다</div> */}
        </form>
        <div className="settingLabel dropOut">회원탈퇴</div>
      </div>
      <div className="settingCancel section">
        <button className="miniBtn smallSizeFont cancelBtn">나가기</button>
      </div>
    </div>
  );
}

export default Setting;