import React from 'react';
import "./SelectBtn.css"

function SelectBtn(props) {
    return (
    <div className="selectBtnBackgroundSize">
        <div className="selectBtnSize">
        <button className="selectBtn">프로젝트 모집</button>
        <button className="selectBtn">포트폴리오</button>
        </div>
    </div>
    );
}

export default SelectBtn;