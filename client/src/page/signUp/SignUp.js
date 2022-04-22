import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './SignUp.css'
import axios from 'axios'
import Swal from 'sweetalert2'

axios.defaults.withCredentials = true


function SignUp(props) {

  const [userinfo, setuserinfo] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    nickname: ''
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
  const history = useHistory()

  const usernameRegExp = /^[A-Za-z0-9+]{4,12}$/ 
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/

  const handleInputValue = (key) => (e) => {

    setuserinfo({ ...userinfo, [key]: e.target.value })

    if (key === 'username') {
      if (!usernameRegExp.test(e.target.value)) {
        setMessage({ ...message, idMessage: '4~12자의 영문 대 소문자, 숫자만 사용 가능합니다'})
        setValidation({ ...validation, idValidation: true})
      } else {
        axios.post(`${process.env.REACT_APP_API_URL}/users/verifyUsername`, {username : e.target.value})
        .then( (res) => {
          setMessage({ ...message, idMessage: '이미 존재하는 아이디입니다'})
          setValidation({ ...validation, idValidation: true})
          if (res.data.data.data[0].count === 0) {
            setValidation({ ...validation, idValidation: false})
          }
        }).catch( (err) => {
          console.log(err)
        })
      }
    }

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({ ...message, passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다'})
        setValidation({ ...validation, passwordValidation: true})
      } else {
        setValidation({ ...validation, passwordValidation: false})
      }
    }

    if (key === 'passwordCheck') {
      if (e.target.value !== userinfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다'})
        setValidation({ ...validation, passwordCheckValidation: true})
      } else {
        setValidation({ ...validation, passwordCheckValidation: false})
      }
    }

    if (key === 'nickname') {
      if (e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
        setValidation({ ...validation, nicknameValidation: true})
      } else {
        axios.post(`${process.env.REACT_APP_API_URL}/users/verifyNickname`, {nickname : e.target.value})
        .then( (res) => {
          setMessage({ ...message, nicknameMessage: '이미 존재하는 닉네임입니다'})
          setValidation({ ...validation, nicknameValidation: true})
          if (res.data.data.data[0].count === 0) {
            setValidation({ ...validation, nicknameValidation: false})
          }
        }).catch( (err) => {
          console.log(err)
        }) 
      }
    }
  }

  const handleSignup = () => {

    const {username, password, passwordCheck, nickname } = userinfo

    if(!username || !password || !passwordCheck || !nickname){
      setMessage({ ...message, errorMessage: '모든 항목은 필수입니다'})
      setValidation({ ...validation, errorValidation: true})
    } else if (usernameRegExp.test(username) && passwordRegExp.test(password) && nicknameRegExp.test(nickname) && password === passwordCheck) {
      axios.post(`${process.env.REACT_APP_API_URL}/users/verifyUsername`, { username: username })
      .then( (res) => {
        if (res.data.data.data[0].count === 0) {
          axios.post(`${process.env.REACT_APP_API_URL}/users/verifyNickname`, { nickname: nickname })
          .then( (res) => {
            if (res.data.data.data[0].count === 0) {
              axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, { username: username, password: password, nickname: nickname })
              .then( (res) => {
                if (res.status === 201) {
                  Swal.fire({
                    title: '회원가입 성공!',
                    width: 600,
                    padding: '3em',
                    confirmButtonColor: '#298854',
                    color: 'black',
                    background: '#fff ',
                    backdrop: ` 
                      rgba(0,0,0,0.4)
                    `
                  })
                  history.push('/login')
                }
              }).catch( (err) => {
                console.log(err)
              })
            }
          }).catch( (err) => {
            console.log(err)
          })
        }
      }).catch( (err) => {
        console.log(err)
      })
    }
  }

  return (
    <div >
      <center>
        <img className='signUpImg' src='/images/loginlogo1.png'/>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input 
              className='logoutInput' 
              onChange={handleInputValue('username')} 
              type='text' 
              placeholder='아이디'/>
            {userinfo.username.length > 0 && validation.idValidation ? <div><span className='signUpErr'>{message.idMessage}</span></div> : null}
          </div>
          <div>
            <input 
              className='logoutInput' 
              onChange={handleInputValue('password')} 
              type='password' 
              placeholder='비밀번호'/>
            {userinfo.password.length > 0 && validation.passwordValidation ? <div><span className='signUpErr'>{message.passwordMessage}</span></div> : null}
          </div>
          <div>
            <input 
              className='logoutInput' 
              onChange={handleInputValue('passwordCheck')} 
              type='password' 
              placeholder='비밀번호 확인'/>
            {userinfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <div><span className='signUpErr'>{message.passwordCheckMessage}</span></div> : null}
          </div>
          <div>
            <input 
              className='logoutInput signUpInput' 
              onChange={handleInputValue('nickname')} 
              type='text' 
              placeholder='닉네임'/>
            {userinfo.nickname.length > 0 && validation.nicknameValidation ? <div><span className='signUpErr'>{message.nicknameMessage}</span></div> : null}
          </div>
          <div>
          {validation.errorValidation ? <div><span className='signUpErr'>{message.errorMessage}</span></div> : null}
          <button className='SignUpBigBtn' type='submit' onClick={handleSignup}>회원가입</button>
          </div>
          
        </form>
        </center>
    </div>
  )
}

export default SignUp