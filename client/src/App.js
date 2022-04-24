import React, { useEffect, useState, createContext } from 'react'
import './App.css'
import { BrowserRouter, useHistory, Route, Switch, Link , useLocation} from 'react-router-dom'
import Main from './page/main/Main'
import Login from './page/login/Login'
import SignUp from './page/signUp/SignUp'
import Setting from './page/setting/Setting'
import Writing from './page/writing/Writing'
import Detail from './page/detail/Detail'
import MyPage from './page/mypage/MyPage'
import axios from 'axios'

export const MyContext = createContext();


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [userinfo, setUserinfo] = useState(null)
  const history = useHistory()

  const isAuthenticated = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, {withCredentials:true})
    .then(data => {
      if (data.status === 200) {
        setUserinfo(data.data.data.data)
        setIsLogin(true)
      }
    })
    .catch(err => console.log('주 에러 : ',err))
  }
  const handleResponseSuccess = () => {
    isAuthenticated()
  }
  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/logout`)
    .then((res) => {
      setUserinfo(null)
      setIsLogin(false)
    })
  }

  useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <BrowserRouter>
      <MyContext.Provider value={{isLogin, userinfo, handleLogout}} >
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/Login'>
          <Login handleResponseSuccess={handleResponseSuccess}/>
        </Route>
        <Route path='/SignUp'>
          <SignUp />
        </Route>
        <Route path='/Setting'>
          <Setting />
        </Route>
        <Route path='/Writing'>
          <Writing />
        </Route>
        <Route path='/Detail'>
          <Detail />
        </Route>
        <Route path='/MyPage'>
          <MyPage />
        </Route>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App
