import React from 'react';
import "./CommentList.css"

function CommentList(props) {
  return (
    <div >
      <div className=" commentListBox">
        <div className="commentEditDelete">
          <div className="detailComment">
            <div style={{"backgroundColor": "#F7F7F7", "width":"40px", "height" : "40px", "border-radius": "50%"}} />
            <div className="commentName">닉네임</div>
          </div>
          <div>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
        <div className="commentContent"><aside>
          💡 프로젝트 할 팀원을 구했는데 마음에 안드셨던 경험이 있으신가요?

          개발자들을 위한 Shall We Code에서 마음에 드는 팀원을 구해보세요!

          - 먼저 개발자들이 작성해둔 포트폴리오를 확인해주세요
          - 마음에 드는 포트폴리오가 있다면 댓글로 제안 할 수 있어요
          - 나의 포트폴리오를 올려놓으면 매력적인 프로젝트에 들어 갈 수 있는 기회가 있어요
          - 팀 프로젝트 제안서를 작성해서 팀원을 모집할 수 있어요
          - 원하는 기술 스택을 사용한 게시물만 골라볼 수 있어요
          </aside></div>
      </div>
    </div>
  );
}

export default CommentList;