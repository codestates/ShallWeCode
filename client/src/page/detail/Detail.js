import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import ReactMarkdown from 'react-markdown'
import "./Detail.css"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';





function Detail(props) {

  const markdown = 
  `
  프로젝트 설명 : 프로젝트 할 팀원을 구했는데 마음에 안드셨던 경험이 있으신가요?\n - 먼저 개발자들이 작성해둔 포트폴리오를 확인해주세요\n \n모집 인원: 1명\n        \n          
  `
  const markdown1 = `A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `
  


  return (
    <div>
      <Navbar/>
      <div className="section">
        <div className="largeSizeFont detailTitle">개발자들을 위한 Shall We Code에서 마음에 드는 팀원을 구해보세요!</div>
        <div className="detailProfile">
          <div className="detailProfileImg">
            <div style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}></div>
            <div className="detailName">닉네임</div>
          </div>
          <div>글 작성 날짜</div>
        </div>

        <div className="detailBtn">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <div className="detailStack">
          <div className="detailLanguageMargin">사용언어</div>
          <button className="miniBtn filterMiniBtn">Javascript</button>
        </div>
        
        <div>
          <Viewer initialValue={markdown} />
        </div>     
      </div> 
    </div>
  );
}

export default Detail;

