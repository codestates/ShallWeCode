// import React from 'react';
// import "./Banner.css"

// function Banner(props) {
//   return (
//     <section className="banner">
//       <div className="banner_comment">
//         <div>좋은 팀원을 찾는다면 먼저 포트폴리오를 확인해보세요.</div>
//         <div>검증된 팀원과 함께, 성공적인 프로젝트 Shall We Code~</div>
//       </div>

//       <div className="bannerImg">
//         <img className="mainImg" src="/images/banner11.png"/>
//       </div>
//     </section>
//   );
// }

// export default Banner;

import React from 'react';
import "./Banner.css"

function Banner(props) {
  return (
    <section className="banner">
      <div className="banner_comment">
        <div className="banner_comment1">좋은 팀원을 찾는다면 먼저 포트폴리오를 확인해보세요.</div>
        <div className="banner_comment2">검증된 팀원과 함께, 성공적인 프로젝트 Shall We Code~</div>
      </div>

      <div className="bannerImg">
        {/* <img className="mainImg" src="/images/banner11.png"/> */}
        <div className="imgBox imgBox1"></div>
      </div>
    </section>
  );
}

export default Banner;

