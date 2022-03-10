import React, { useEffect, useState } from 'react';
import Navbar from '../../component/navbar/Navbar';
import ReactMarkdown from 'react-markdown'
import "./Detail.css"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import CommentList from '../../component/commentList/CommentList';
import axios from 'axios';
import { useLocation } from 'react-router';

function Detail(props) {

  const [ boardinfo, setBoardinfo ] = useState("")
  const location = useLocation()

  const { isLogin, handleLogout, userinfo } = props
  const [ loadUserinfo, setLoadUserinfo ] = useState([{id:"", picture:"", nickname:""}])

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
  let data;
  useEffect(() => {
    axios.get('http://localhost:4000/board/detail', { params: {contentId: location.state.contentId }})
    .then((res) => {
      // const { PRorTP, body, created_at, nickname, picture, stack, title, userId } = res.data.data
      // data = { PRorTP, body, created_at, nickname, picture, stack, title, userId }
      const changeDate = new Date(res.data.data.created_at) 
      res.data.data.created_at = changeDate.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})    
      setBoardinfo(res.data.data)
    })

  }, []);


  // const editContent = () => {
  //   history.push({
  //     pathname: '/Writing',
  //     state: {contentId: location.state.contentId}
  //   })
  // }

  const deleteContent = () => {
    axios.delete('http://localhost:4000/board/delete', { params: {contentId: location.state.contentId}}).then((res) => {
      alert('게시글 삭제가 완료되었습니다')
      history.push('/')
    })
  }

  useEffect(() => {
    if (userinfo) {
    setLoadUserinfo(userinfo)
    }
  },[userinfo])

  return (
    <div>
      <Navbar isLogin={isLogin} userinfo={userinfo} handleLogout={handleLogout}/>
      { !boardinfo ? <div className="section">잘못된 요청입니다.</div>
        :
      <div className="section">
        <div className="largeSizeFont detailTitle">{boardinfo.title}</div>
        <div className="detailProfile">

          <div className="detailProfileImg" onClick={handleMyPage}>
            <img src={boardinfo.picture} style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}/>
            <div className="detailName">{boardinfo.nickname}</div>
          </div>
          <div className="detailDate">{boardinfo.created_at}</div>
        </div>

        {boardinfo.userId === loadUserinfo[0].id
        ? <div className="detailBtn">
          {/* <button onClick={editContent}>수정</button> */}
          <button onClick={deleteContent}>삭제</button>

        </div>
        
        
        <div className="detailStack">
          <div className="detailLanguageMargin">사용언어:</div>
          {boardinfo.stack.map((data, i) => {
            return <button key={i} className="miniBtn filterMiniBtn detailFilterBtn">{data}</button>
          })
        }
        </div>
        <div className="thinLine"></div>
        <div className="detailText">
          <Viewer initialValue={boardinfo.body} />
        </div> 
        
        <CommentList contentId={location.state.contentId}/>
        <h2>댓글</h2>
        <div className="commentBox">
          <div className="detailComment">

            <img src={loadUserinfo[0].picture} style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
            <div className="commentName">{loadUserinfo[0].nickname}</div>

          </div>
          <input className="commentInput" type="text" placeholder="입력하세요!" />
        </div> 
        <div className="commentBtn">
          <button onClick={clickCommentBtn} className="miniBtn writingCancelBtn smallSizeFont" >등록</button>
        </div>
      </div> 
      }
    </div>
  );
}

export default Detail;

