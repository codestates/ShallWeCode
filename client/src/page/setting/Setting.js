import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar/Navbar';
import Profile from '../../component/profile/Profile';
import "./Setting.css"
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { components } from 'react-select';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2'
import NewProfile from '../../component/newprofile/NewProfile';



function Setting(props) {

  const location = useLocation()
  const { isLogin, handleLogout, userinfo } = props
  const history = useHistory();

  const [nickname, setNickName] = useState('');
  const [btnActive, setBtnActive] = useState(true);
  const [passwordBtnActive, setPasswordBtnActive] = useState();

  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;

  const [inuserinfo, setuserinfo] = useState({
    password: '',
    passwordCheck: '',
  })

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
    // console.log('e',e.target.value)
    if(e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)){
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
          // Swal.fire({
          //   title: '닉네임 변경이 성공했습니다',
          //   width: 600,
          //   padding: '3em',
          //   confirmButtonColor: '#298854',
          //   color: 'black',
          //   background: '#fff ',
          //   backdrop: ` 
          //     rgba(0,0,0,0.4)
          //   `
          // })
          window.location.replace("/Setting") 
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const settingPasswordOnchange = (key) => (e) => {

    setuserinfo({ ...inuserinfo, [key]: e.target.value })

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({ ...message, passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다'})
        setValidation({ ...validation, passwordValidation: true})
      } else {
        setValidation({ ...validation, passwordValidation: false})
        setMessage({ ...message, passwordMessage: ''})
      }
    }
    if (key === 'passwordCheck') {
      if (e.target.value !== inuserinfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다'})
        setValidation({ ...validation, passwordCheckValidation: true})
      } else {
        setValidation({ ...validation, passwordCheckValidation: false})
        setMessage({ ...message, passwordCheckMessage: ''})
        // setPasswordBtnActive(true)
      }
    }
  }

// 입력칸이 비어있지 않고 , 비밀번호 변경의 메세지와 확인의 메세지가 없어졌을때만 요청가능  
  const settingPasswordOnClick = () => {
    const passwordMessageLength = message.passwordCheckMessage.length
    const passwordCheckMessageLength = message.passwordMessage.length
    const passwordLength = inuserinfo.password
    const passwordCheckLength = inuserinfo.passwordCheckMessage
    if( passwordMessageLength <= 0 && passwordCheckMessageLength <= 0 && passwordLength !== ''  && passwordCheckLength !== '' ){
      axios.patch("http://localhost:4000/users/passwordEdit", {password: inuserinfo.password})
      .then((res)=>{
        if(res.status===200){
          Swal.fire({
            title: '비밀번호 변경이 성공했습니다',
            width: 600,
            padding: '3em',
            confirmButtonColor: '#298854',
            color: 'black',
            background: '#fff ',
            backdrop: ` 
              rgba(0,0,0,0.4)
            `
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
     
    }
  }

 // 회원탈퇴 클릭시 alert 창 먼저 띄워주고 확인 취소 가능
 // 확인을 누른다면 요청 보내기 ->  
  const clickDropOut = () => {
    Swal.fire({
      title: '회원탈퇴 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#298854',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok'
    }).then((result) => {
      if(result.isConfirmed){
        axios.delete("http://localhost:4000/users/signout")
        .then((res)=>{
          if(res.status===200){
            Swal.fire(
              '탈퇴되었습니다',
              'Your file has been deleted.',
              'success'
            )
            window.location.replace("/") 
            // history.push("/")
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    })
  }

  const clickCancelBtn = () => {
    history.push("/")
  }


  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} userinfo={userinfo}/>
      <NewProfile/>

      <div className="settingBox settingSection">
        <form onSubmit={(e) => e.preventDefault()} >
            <div className="largeSizeFont">기본정보</div>
            <div className="settingLabel" >
              <label>닉네임</label>
              <input onChange={settingNameOnChange} className="settingInput" type='text' />
              <button type="submit" disabled={btnActive} onClick={settingNameOnClick} className="nicknameBtn">닉네임 변경</button>
            </div>
            {nickname.length > 0 && validation.nicknameValidation ? <div><span className="signUpErr">{message.nicknameMessage}</span></div> : null}
            
            <div className="settingLabel settingId">
              <div>아이디</div>
              <div className="settingIdDiv"> 아이디입니다 </div>
            </div>
        </form>
      </div>
      <div className="settingBox settingUnderBox settingSection">
      <form onSubmit={(e) => e.preventDefault()}>
          <div className="settingLabel">
            <label>비밀번호 변경</label>
            <input 
              onChange={settingPasswordOnchange('password')} 
              className="settingInput" 
              type='password' />
            <button type="submit" disabled={passwordBtnActive} onClick={settingPasswordOnClick} className="passwordBtn">비밀번호 변경</button>
          </div>
          {inuserinfo.password.length > 0 && validation.passwordValidation ? <div><span className="signUpErr">{message.passwordMessage}</span></div> : null}

          
          <div className="settingLabel">
            <label>비밀번호 확인</label>
            <input 
              onChange={settingPasswordOnchange('passwordCheck')} 
              className="settingInput" 
              type='password' />
          </div>
          {inuserinfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <div><span className="signUpErr">{message.passwordCheckMessage}</span></div> : null}
        </form>
        <div onClick={clickDropOut} className=" dropOut">회원탈퇴</div>
      </div>
      <div className="settingCancel section">
        <button onClick={clickCancelBtn} className="miniBtn smallSizeFont cancelBtn">나가기</button>
      </div>
    </div>
  );
}

export default Setting;