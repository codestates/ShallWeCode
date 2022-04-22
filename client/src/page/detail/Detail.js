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
  const [ loadUserinfo, setLoadUserinfo ] = useState([{id:"", picture:"", nickname:""}])

  const createComment = () => {
    axios.post('http://localhost:4000/comment/writing', {
      contentId: location.state.contentId,
      body: comment
    })
    .then((res) => {
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

  const handleMyPage = () => {
    history.push({
      pathname: '/Mypage',
      state: { userinfo: [{id: boardinfo.userId, nickname: boardinfo.nickname, picture: boardinfo.picture}] }
  })  }

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
      { !boardinfo ? null
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
          <button className="postDelete" onClick={deleteContent}>삭제</button>
        </div>
        : <div></div>
        }
        <div className="detailStack">
          <div className="detailLanguageMargin">사용언어</div>
          {boardinfo.stack.map((data, i) => {
            return <button key={i} className="miniBtn detailFilterBtn">{data}</button>
          })
        }
        </div>
        {/* 본문 내용을 구분하기 위한 선 */}
        <div className="thinLine"></div>
        <div className="detailText">
          <Viewer initialValue={boardinfo.body} />
        </div> 




        <CommentList contentId={location.state.contentId} userinfo={userinfo}/>
        <h2>댓글</h2>
        <div className="commentBox">
          <div className="detailComment">
            <img src={!loadUserinfo[0].picture ? '/images/1.png' : loadUserinfo[0].picture} style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
            <div className="commentName">{!loadUserinfo[0].nickname ? "Guest 님" : loadUserinfo[0].nickname}</div>
          </div>
          {loadUserinfo[0].nickname ?
          <input className="commentInput" type="text" placeholder="입력하세요!" onChange={handleInputValue('comment')}/>
          : <input className="commentInput" type="text" placeholder="로그인 후 이용 가능합니다." onChange={handleInputValue('comment')} disabled/>
        }
        </div> 
        <div className="commentBtn">
          {loadUserinfo[0].nickname ?
          // 여기가 조금 다름
          // <button onClick={clickCommentBtn} className="miniBtn writingCancelBtn smallSizeFont" >등록</button>
          <button className="miniBtn writingCancelBtn smallSizeFont" onClick={createComment}>입력</button>
          : <div></div>
        }

        </div>
      </div> 
      }
    </div>
  );
}

export default Detail;

