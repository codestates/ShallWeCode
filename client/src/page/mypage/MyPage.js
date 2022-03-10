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

  console.log(location.state)

  const filterOfPRorTP = (PRorTP) => {
    setPRorTP(PRorTP)
  }

  useEffect(() => {
    axios.get('http://localhost:4000/board/user', { params: {PRorTP: PRorTP, userId: location.state.userinfo[0].id }})
    .then((res) => {
      // const { PRorTP, body, created_at, nickname, picture, stack, title, userId } = res.data.data
      // data = { PRorTP, body, created_at, nickname, picture, stack, title, userId }
      // setBoardinfo(res.data.data)
      setBoardinfo(res.data.data.data)
    })

  }, [location, PRorTP]);
  console.log(boardinfo)

  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} userinfo={userinfo}/>
      {!location.state.userinfo[0].id ? <div>로딩 중...</div>
      : <div className="detailProfile section">
        <div className="detailProfileImg ">
          <img src={location.state.userinfo[0].picture} style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}></img>
            <div className="detailName">{location.state.userinfo[0].nickname}</div>
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