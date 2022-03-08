import React from 'react';
import Filter from '../../component/filter/Filter';
import Navbar from '../../component/navbar/Navbar';
import SelectBtn from '../../component/selectBtn/SelectBtn';
import Thumbnail from '../../component/thumbnail/Thumbnail';
import "./MyPage.css"

function MyPage(props) {
  return (
    <div>
      <Navbar/>
      <div className="detailProfile section">
          <div className="detailProfileImg ">
            <div style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}></div>
            <div className="detailName">닉네임</div>
          </div>
          <div>글 작성 날짜</div>
        </div>
      <SelectBtn/>
      <Filter/>
      <Thumbnail/>  
    </div>
  );
}

export default MyPage;