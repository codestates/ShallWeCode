import React from 'react'
import Navbar from '../../component/navbar/Navbar'
import { useLocation } from 'react-router'
import './MyPage.css'
import MyContents from '../../component/Mycontents/MyContents'


function MyPage(props) {
  const location = useLocation()

  return (
    <div>
      <Navbar />
      {!location.state.userinfo[0].id ? <div>로딩 중...</div>
      : <div className='detailProfile section'>
        <div className='detailProfileImg '>
          <img src={location.state.userinfo[0].picture} style={{'backgroundColor': '#F7F7F7', 'width':'100px', 'height' : '100px', 'border-radius': '50%'}}></img>
            <div className='detailName'>{location.state.userinfo[0].nickname}</div>
          </div>
        <div></div>
      </div>
      }
      <MyContents/>
    </div>
  )
}

export default MyPage