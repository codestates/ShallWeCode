import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./CommentList.css"

function CommentList(props) {

  const { contentId } = props
  const [ commentinfo, setCommentinfo ] = useState("")

  useEffect(() => {
    axios.get('http://localhost:4000/comment/detail', { params: {contentId: contentId} })
    .then((res) => {
      setCommentinfo(res.data.data.data)
    })
  }, []);

  console.log("댓글 : ", commentinfo)
  return (
    <div >
        <div className=" commentListBox">
      {!commentinfo ? <div>댓글이 없습니다.</div>
      : commentinfo.map((data, i) => {
        return (
        <div key={i}>
        <div className="commentEditDelete">
        <div className="detailComment">
        <div style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
              <div className="commentName">{data.nickname}</div>
            </div>
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <div className="commentContent"><aside>{data.body}</aside></div>
          </div>
        )
      })

      }
        </div>
    </div>
  );
}

export default CommentList;