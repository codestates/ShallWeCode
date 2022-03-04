import React from 'react';
import "./Banner.css"

function Banner(props) {
  return (
    <section className="banner">
      <div className="banner_comment">
        <div>프로젝트를 함께 한 팀원이 마음에 안드셨던 경험이 있으신가요?</div>
        <div>개발자들을 위한 Shall We Code에서 마음에 드는 팀원을 구해보세요!</div>
      </div>

      <div className="bannerImg">
        <img className="mainImg" src="/images/banner11.png"/>
      </div>
    </section>
  );
}

export default Banner;

