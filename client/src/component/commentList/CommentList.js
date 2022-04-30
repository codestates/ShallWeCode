import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import "./CommentList.css"
import { MyContext } from "../../App"

function CommentList(props) {
  const { userinfo } = useContext(MyContext)
  const { contentId } = props
  const [ commentinfo, setCommentinfo ] = useState('')
  const [ edit ,setEdit ] = useState(false)
  const [ comment, setComment] = useState('')
  const [ editId, setEditId ] = useState(null)
  const [ getUserinfo, setGetUserinfo ] = useState([{id: '', username: '', picture: '', nickname: ''}])

  const deleteComment = (e) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete`, {params: { commentId: e.target.value }})
    .then((res) => {
      window.location.replace(`/Detail/${contentId}`)
    })
  }  

  const handleCommentBox = (e) => {
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
    axios.patch(`${process.env.REACT_APP_API_URL}/comment/edit`, {
      commentId: editId,
      body: comment
    })
    .then((res) => {
      if (res.status === 201) {
      }
    })
    window.location.replace(`/Detail/${contentId}`)
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
          <input className='commentInput' type='text' defaultValue={data.body} onChange={handleInputValue('comment')}/>
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
