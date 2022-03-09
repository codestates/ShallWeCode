import React, { useState,Component, useRef, useEffect } from 'react'
import "./SelectBtn.css"

function SelectBtn(props) {

    const { PRorTP, filterOfPRorTP } = props
    const [category, setCategory] = useState('프로젝트 모집');

    const filterBoard = (e) => {
        filterOfPRorTP(e.target.value)
    }
    return (
    <div className=" selectBtnBackgroundSize">
        <div className="selectBtnSize">
        <button className="selectBtn" value='1' onClick={filterBoard}>프로젝트 모집</button>
        <button className="selectBtn" value='2' onClick={filterBoard}>포트폴리오</button>
        </div>
    </div>
    );
}

export default SelectBtn;