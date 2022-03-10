import React from 'react';
import "./Footer.css"
// import github from "../../../public/git.png"
import { GoMarkGithub } from "react-icons/go";





function Footer(props) {
  return (
    <div className="footerBox">
      <div className="footertext">
        <GoMarkGithub/>
      <div className="footerTeamName">Github 팀원 : 이지원, 강연수, 양희제, 유균한 </div>
      </div>
    </div>
  );
}

export default Footer;