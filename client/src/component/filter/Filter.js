import React from 'react';
import "./Filter.css"

function Filter(props) {
  return (
    <div className="filterBackgroundSize ">
    <div className="filterMain">
      <div className="filterImg">
        <button className="miniBtn filterMiniBtn">전체</button>
        <button className="miniBtn filterMiniBtn">Javascript</button>
        <button className="miniBtn filterMiniBtn">Typescript</button>
        <button className="miniBtn filterMiniBtn">React</button>
        <button className="miniBtn filterMiniBtn">Node.js</button>
        <button className="miniBtn filterMiniBtn">Vue</button>
        <button className="miniBtn filterMiniBtn">Flutter</button>
        <button className="miniBtn filterMiniBtn">Java</button>
        <button className="miniBtn filterMiniBtn">C</button>
        <button className="miniBtn filterMiniBtn">C++</button>
        <button className="miniBtn filterMiniBtn">C#</button>
        <button className="miniBtn filterMiniBtn">Spring</button>
        <button className="miniBtn filterMiniBtn">Angular</button>
        <button className="miniBtn filterMiniBtn">Swift</button>
        <button className="miniBtn filterMiniBtn">Python</button>
        <button className="miniBtn filterMiniBtn">Django</button>
        <button className="miniBtn filterMiniBtn">Go</button>
        <button className="miniBtn filterMiniBtn">Kotlin</button>
        <button className="miniBtn filterMiniBtn">Ruby</button>
      </div>
    </div>
    </div>
  );
}

export default Filter;