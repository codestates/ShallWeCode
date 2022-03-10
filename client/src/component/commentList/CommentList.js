import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./CommentList.css"

function CommentList(props) {

  const { contentId, userinfo } = props
  const [ commentinfo, setCommentinfo ] = useState("")
  const [ edit ,setEdit ] = useState(false)
  const [ comment, setComment] = useState("")
  const [ editId, setEditId ] = useState(null)

  const deleteComment = (e) => {
    axios.delete('http://localhost:4000/comment/delete', {params: { commentId: e.target.value }})
    .then((res) => {
      window.location.replace('/Detail')
    })
  }  

  const handleCommentBox = (e) => {
    console.log(e.target)
    setEdit(!edit)
    if (!editId) {
      setEditId(e.target.value)
    } else {
      setEditId(null)
    }
  }

  const handleInputValue = (key) => (e) => {
    setComment({ ...comment, [key]: e.target.value })
  }

  const editComment = (e) => {
    console.log(comment)
    axios.patch('http://localhost:4000/comment/edit', {
      commentId: editId,
      body: comment
    })
    .then((res) => {
      if (res.status === 201) {
        alert('댓글 수정 완료')
      }
    })
    window.location.replace('/Detail')
    
    // (location || window.location || document.location).reload()
  }

  useEffect(() => {
    axios.get('http://localhost:4000/comment/detail', { params: { contentId: contentId }})
    .then((res) => {
      setCommentinfo(res.data.data.data)
    })
  }, []);

  return (
    <div >
        <div className=" commentListBox">
      {!commentinfo ? <div>댓글이 없습니다.</div>
      : commentinfo.map((data, i) => {
        return (
        <div key={i}>
        <div className="thinLine"></div>
        <div className="commentEditDelete">
        <div className="detailComment">
        <img src={data.picture} style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
              <div className="commentName">{data.nickname}</div>
            </div>
            <div> {!(userinfo[0].nickname === data.nickname) ? <div></div>
              : <div><button onClick={handleCommentBox} className="commentEditDeleteButton" value={data.id}>수정</button>
              <button value={data.id} className="commentEditDeleteButton" onClick={deleteComment}>삭제</button></div>}
            </div>
          </div>
          { !(edit && Number(editId) === data.id) ? <div className="commentContent"><aside>{data.body}</aside></div>
          : <div><div className="commentBox">
          <input className="commentInput" type="text" onChange={handleInputValue('comment')}/>
        </div> 
        <div className="commentBtn">
          <button className="miniBtn writingCancelBtn smallSizeFont" onClick={editComment}>입력</button>
        </div>
        </div>


          // <div><input className="commentInput" type="text" value={data.body} onChange={handleInputValue('comment')}/>
          //   <button className="miniBtn writingCancelBtn smallSizeFont" value={data.id} onClick={createComment}>입력</button></div>
        }
          </div>
        )
      })

      }
        </div>
    </div>
  );
}

export default CommentList;

// <div className="commentBox">
// <div className="detailComment">
//   <img src={userinfo[0].picture} style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
//   <div className="commentName">{userinfo[0].nickname}</div>
// </div>
// <input className="commentInput" type="text" placeholder="입력하세요!" onChange={handleInputValue('comment')}/>
// </div> 
// <div className="commentBtn">
// <button className="miniBtn writingCancelBtn smallSizeFont" onClick={createComment}>입력</button>

// </div>
