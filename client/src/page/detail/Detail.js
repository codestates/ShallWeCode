import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../component/navbar/Navbar';
import ReactMarkdown from 'react-markdown'
import "./Detail.css"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import CommentList from '../../component/commentList/CommentList';
import axios from 'axios';
import { useLocation } from 'react-router';

function Detail(props) {

  const history = useHistory()
  const [ boardinfo, setBoardinfo ] = useState("")
  const [ comment, setComment ] = useState("")
  const location = useLocation()
  const { isLogin, handleLogout, userinfo } = props
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
  // let data;

  const createComment = () => {
    axios.post('http://localhost:4000/comment/writing', {
      contentId: location.state.contentId,
      body: comment
    })
    .then((res) => {
      console.log(res)
      if (res.status === 201) {
        alert('댓글 작성 완료')
      }
    })
    window.location.replace('/Detail')
    
    // (location || window.location || document.location).reload()
  }

  const handleInputValue = (key) => (e) => {

    setComment({ ...comment, [key]: e.target.value })

  }

  const handleMypage = () => {
    history.push({
      pathname: '/Mypage',
      state: { userId: boardinfo.userId }
  })  }

  useEffect(() => {
    axios.get('http://localhost:4000/board/detail', { params: {contentId: location.state.contentId }})
    .then((res) => {
      // const { PRorTP, body, created_at, nickname, picture, stack, title, userId } = res.data.data
      // data = { PRorTP, body, created_at, nickname, picture, stack, title, userId }
      setBoardinfo(res.data.data)
    })

  }, []);
  return (
    <div>
      <Navbar isLogin={isLogin} userinfo={userinfo} handleLogout={handleLogout}/>
      { !boardinfo ? <div className="section">잘못된 요청입니다.</div>
        :
      <div className="section">
        <div className="largeSizeFont detailTitle">{boardinfo.title}</div>
        <div className="detailProfile">
          <div className="detailProfileImg">
            <button onClick={handleMypage} style={{"backgroundColor": "#F7F7F7", "width":"100px", "height" : "100px", "border-radius": "50%"}}></button>
            <button onClick={handleMypage} className="detailName">{boardinfo.nickname}</button>
          </div>
          <div>{boardinfo.created_at}</div>
        </div>

        <div className="detailBtn">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <div className="detailStack">
          <div className="detailLanguageMargin">사용언어</div>
          {boardinfo.stack.map((data, i) => {
            return <button key={i} className="miniBtn filterMiniBtn">{data}</button>
          })
        }
        </div>

        <div>
          <Viewer initialValue={boardinfo.body} />
        </div> 
        <CommentList contentId={location.state.contentId}/>
        <div className="commentBox">
          <div className="detailComment">
            <div style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
            <div className="commentName">닉네임</div>
          </div>
          <input className="commentInput" type="text" placeholder="입력하세요!" onChange={handleInputValue('comment')}/>
        </div> 
        <div className="commentBtn">
          <button className="miniBtn writingCancelBtn smallSizeFont" onClick={createComment}>입력</button>
        </div>
      </div> 
      }
    </div>
  );
}

export default Detail;

