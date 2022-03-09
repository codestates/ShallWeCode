import React, { useEffect, useState } from 'react';
import Filter from '../../component/filter/Filter';
import Navbar from '../../component/navbar/Navbar';
import SelectBtn from '../../component/selectBtn/SelectBtn';
import Thumbnail from '../../component/thumbnail/Thumbnail';
import { useLocation } from 'react-router';
import "./MyPage.css"
import axios from 'axios';

function MyPage(props) {

  const location = useLocation()
  const [ boardinfo, setBoardinfo ] = useState("")
  const [ PRorTP, setPRorTP ] = useState("1")
  const { isLogin, handleLogout, userinfo } = props
  console.log(userinfo)
  console.log(location)

  const filterOfPRorTP = (PRorTP) => {
    setPRorTP(PRorTP)
  }

  useEffect(() => {
    axios.get('http://localhost:4000/board/user', { params: {PRorTP: PRorTP, userId: location.state.userinfo[0].id }})
    .then((res) => {
      // const { PRorTP, body, created_at, nickname, picture, stack, title, userId } = res.data.data
      // data = { PRorTP, body, created_at, nickname, picture, stack, title, userId }
      // setBoardinfo(res.data.data)
      console.log(res)
      setBoardinfo(res.data.data.data)
    })

  }, [location, PRorTP]);

  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} userinfo={userinfo}/>
      {!userinfo ? <div>로딩 중...</div>
      : <div className="detailProfile section">
        <div className="detailProfileImg ">
          <div style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}></div>
            <div className="detailName">{userinfo[0].nickname}</div>
          </div>
        <div></div>
      </div>
      }
      <SelectBtn filterOfPRorTP={filterOfPRorTP}/>
      {/* <Filter/> */}
      <Thumbnail thumbnail={boardinfo}/>  
    </div>
  );
}

export default MyPage;