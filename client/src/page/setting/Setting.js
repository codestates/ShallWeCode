import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import Profile from '../../component/profile/Profile';
import "./Setting.css"


function Setting() {
  return (
    <div>
      <Navbar />
      <Profile />
      <div className="basicSize section" >
        
        <form>
          <h3>기본정보</h3>
          <div >
            <label>닉네임</label>
            <input type='email' />
            <button>닉네임 변경</button>
          </div>
          <div>이미 사용중인 닉네임 입니다</div>
          

          <div>
            <label>아이디</label>
            <input type='password' />
          </div>

        </form>

        
        <form>
          <div>
            <label>비밀번호변경</label>
            <input type='email' />
            <button>비밀번호 변경</button>
          </div>
          
          <div>
            <label>비밀번호변경확인</label>
            <input type='password' />
          </div>
          <div>비밀번호가 동일하지 않습니다</div>
        </form>
      <div>회원탈퇴</div>
      <button>나가기</button>
      </div>
    </div>
  );
}

export default Setting;