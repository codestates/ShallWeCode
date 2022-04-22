import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./CommentList.css"

function CommentList(props) {

  const { contentId, userinfo } = props
  const [ commentinfo, setCommentinfo ] = useState('')
  const [ edit ,setEdit ] = useState(false)
  const [ comment, setComment] = useState('')
  const [ editId, setEditId ] = useState(null)
  const [ getUserinfo, setGetUserinfo ] = useState([{id: '', username: '', picture: '', nickname: ''}])

  const deleteComment = (e) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete`, {params: { commentId: e.target.value }})
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
    axios.patch(`${process.env.REACT_APP_API_URL}/comment/edit`, {
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
    axios.get(`${process.env.REACT_APP_API_URL}/comment/detail`, { params: { contentId: contentId }})
    .then((res) => {
      setCommentinfo(res.data.data.data)
    })
  }, []);

  useEffect(() => {
    if (userinfo) {
      setGetUserinfo(userinfo)
    }
  }, [userinfo])

  return (
    <div >
        <div className=' commentListBox'>
      {!commentinfo ? <div>댓글이 없습니다.</div>
      : commentinfo.map((data, i) => {
        return (
        <div key={i}>
        <div className='thinLine'></div>
        <div className='commentEditDelete'>
        <div className='detailComment'>
        <img src={data.picture} style={{'backgroundColor': '#F7F7F7', 'width':'40px', 'height' : '40px', 'border-radius': '50%'}} />
              <div className='commentName'>{data.nickname}</div>
            </div>
            <div> {!(getUserinfo[0].nickname === data.nickname) ? <div></div>
              : <div><button className='commentEditDeleteButton' onClick={handleCommentBox} value={data.id}>수정</button>
              <button className='commentEditDeleteButton' value={data.id} onClick={deleteComment}>삭제</button></div>}
            </div>
          </div>
          { !(edit && Number(editId) === data.id) ? <div className='commentContent'><aside>{data.body}</aside></div>
          : <div><div className='commentBox'>
          <input className='commentInput' type='text' onChange={handleInputValue('comment')}/>
        </div> 
        <div className='commentBtn'>
          <button className='miniBtn writingCancelBtn smallSizeFont' onClick={editComment}>입력</button>
        </div>
        </div>
        }
          </div>
        )
      })
      }
        </div>
    </div>
  );
}

export default CommentList
