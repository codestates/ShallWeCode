import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NewProfile.css'
import Swal from 'sweetalert2'




function NewProfile(props) {

  const { userinfo } = props
  const [curImg, clickImg] = useState("/images/1.png");

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
    axios.patch('http://localhost:4000/users/pictureEdit', {picture: curImg})
    .then((res)=>{
      if(res.status === 200){
        // Swal.fire({
        //   title: '이미지가 적용 되었습니다',
        //   width: 600,
        //   padding: '3em',
        //   confirmButtonColor: '#298854',
        //   color: 'black',
        //   background: '#fff ',
        //   backdrop: ` 
        //     rgba(0,0,0,0.4)
        //   `
        // })
        window.location.replace('/Setting')
      }
    }).catch((err)=>{
        console.log(err);
    })
  }


  return (
    <div className="section">
      <div className="newProfileImgs">
        <img className="profileBigImg" value = "1" src={curImg}/> 
        <div className="newProfileTextBtn">
          <div className='newProfileText'>{!userinfo ? "닉네임" : userinfo[0].nickname}</div>
          <button className="miniBtn smallSizeFont newProfileBtn" onClick={handleProfileSelect}>이미지 적용</button>
        </div>
      </div>



      <div className="profileMiniImgDiv">
        <img onClick={handleProfileClick} className="profileMiniImg" src="/images/1.png"/>  
        <img onClick={handleProfileClick} className="profileMiniImg" src="/images/2.png"/>  
        <img onClick={handleProfileClick} className="profileMiniImg" src="/images/3.png"/>  
        <img onClick={handleProfileClick} className="profileMiniImg" src="/images/4.png"/>  
      </div>

    </div>
  );
}

export default NewProfile;


