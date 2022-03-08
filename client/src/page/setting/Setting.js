import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import Profile from '../../component/profile/Profile';
import "./Setting.css"


function Setting(props) {

  const { isLogin, handleLogout } = props

  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout}/>
      <Profile />

      <div className="settingBox settingSection">
        <form>
            <div className="largeSizeFont">기본정보</div>
            <div className="settingLabel" >
              <label >닉네임</label>
              <input className="settingInput" type='text' />
              <button className="nicknameBtn">닉네임 변경</button>
            </div>
            {/* <div className="">이미 사용중인 닉네임 입니다</div> */}
            
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