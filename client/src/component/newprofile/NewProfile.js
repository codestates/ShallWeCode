import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import './NewProfile.css'
import { MyContext } from "../../App"


function NewProfile(props) {
  const { userinfo } = useContext(MyContext)
  const [curImg, clickImg] = useState('/images/1.png')

  const handleProfileClick = (e) => {
    let img = e.target.src.slice(e.target.src.length - 13)
    clickImg(img)
  }

  useEffect(() => {
    if (userinfo) {
      clickImg(userinfo[0].picture)
    }
  },[userinfo])

  const handleProfileSelect = () => {
    axios.patch(`${process.env.REACT_APP_API_URL}/users/pictureEdit`, {picture: curImg})
    .then((res)=>{
      console.log('res',res)
      if(res.status === 200){
        window.location.replace('/Setting')
      }
    }).catch((err)=>{
        console.log(err);
    })
  }


  return (
    <div className='section'>
      <div className='newProfileImgs'>
        <img className='profileBigImg' value = '1' src={curImg}/> 
        <div className='newProfileTextBtn'>
          <div className='newProfileText'>{!userinfo ? '닉네임' : userinfo[0].nickname}</div>
          <button className='miniBtn smallSizeFont newProfileBtn' onClick={handleProfileSelect}>이미지 적용</button>
        </div>
      </div>

      <div className='profileMiniImgDiv'>
        <img onClick={handleProfileClick} className='profileMiniImg' src='/images/1.png'/>  
        <img onClick={handleProfileClick} className='profileMiniImg' src='/images/2.png'/>  
        <img onClick={handleProfileClick} className='profileMiniImg' src='/images/3.png'/>  
        <img onClick={handleProfileClick} className='profileMiniImg' src='/images/4.png'/>  
      </div>

    </div>
  )
}

export default NewProfile


