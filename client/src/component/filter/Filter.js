import React, { useState,Component, useRef, useEffect } from 'react'
import "./Filter.css"
import axios from 'axios'

function Filter(props) {

  const { thumbnail, filteredThumbnail } = props
  const languages = [
    { value: "01", label: "JavaScript" },
    { value: "02", label: "TypeScript" },
    { value: "03", label: "React.js" },
    { value: "04", label: "Node.js" },
    { value: "05", label: "Vue.js" },
    { value: "06", label: "Flutter" },
    { value: "07", label: "Java" },
    { value: "08", label: "C" },
    { value: "09", label: "C++" },
    { value: "10", label: "C#" },
    { value: "11", label: "Spring" },
    { value: "12", label: "Angular.js" },
    { value: "13", label: "Swift" },
    { value: "14", label: "Python" }
  ];
  

  const [languageFilter, setLanguageFilter] = useState([]);
  // 배열이 선택 languages를 포함하고 있는지에 따라서 removeLanguage , setLanguage 함수 실행
  
  const languagesOnClick = (language) => {
    languageFilter.includes(language)
    ? removeLanguage(language)
    : setLanguageFilter([...languageFilter, language]);
  };
  
  // console.log('languageFilter===',languageFilter.join(''))
  // const loadFilter = () => {
    // axios.get("http://localhost:4000/board/filter", { params: {stack: languageFilter.join('') }}).then((res) => {
    //   console.log("--------then------",res.data.data.data)
    //   if (res.status === 200) {
    //     filteredThumbnail(res.data.data.data)
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // })

  // }
  // const setLanguage = (language) => {
  //   setLanguageFilter([...languageFilter, language]);
  // };
  const removeLanguage = (language) => {
    const index = languageFilter.findIndex((lan) => lan === language);
    languageFilter.splice(index, 1);
    setLanguageFilter([...languageFilter]);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/board/filter", { params: {stack: languageFilter.join('') }}).then((res) => {
      if (res.data.message === '필터에 맞는 게시물이 존재하지 않습니다') {
        console.log(res.data.message)
      }
      else if (res.status === 200) {
        filteredThumbnail(res.data.data.data)
      }
    }).catch((err) => {
      console.log(err);
    })  }, [languageFilter]);

  return (
    <div>      
      <div className="filterBackgroundSize">
      <div className="filterImg">
        {languages.map((language,i) => {
          return <button 
          key = {i}
          onClick={()=>{languagesOnClick(language.value)}} 
          className={`${languageFilter.includes(language.value) ? "active miniBtn filterMiniBtn" : "miniBtn filterMiniBtn"}`}
          >{language.label}</button>
        })}
      </div>
    </div>
    </div>
  );
}

export default Filter;


// import React from 'react';
// import "./Filter.css"

// function Filter(props) {
//   return (
//     <div className="filterBackgroundSize ">
//     <div className="filterMain">
//       <div className="filterImg">
//         <button className="miniBtn filterMiniBtn">전체</button>
//         <button className="miniBtn filterMiniBtn">Javascript</button>
//         <button className="miniBtn filterMiniBtn">Typescript</button>
//         <button className="miniBtn filterMiniBtn">React</button>
//         <button className="miniBtn filterMiniBtn">Node.js</button>
//         <button className="miniBtn filterMiniBtn">Vue</button>
//         <button className="miniBtn filterMiniBtn">Flutter</button>
//         <button className="miniBtn filterMiniBtn">Java</button>
//         <button className="miniBtn filterMiniBtn">C</button>
//         <button className="miniBtn filterMiniBtn">C++</button>
//         <button className="miniBtn filterMiniBtn">C#</button>
//         <button className="miniBtn filterMiniBtn">Spring</button>
//         <button className="miniBtn filterMiniBtn">Angular</button>
//         <button className="miniBtn filterMiniBtn">Swift</button>
//         <button className="miniBtn filterMiniBtn">Python</button>
//         <button className="miniBtn filterMiniBtn">Django</button>
//         <button className="miniBtn filterMiniBtn">Go</button>
//         <button className="miniBtn filterMiniBtn">Kotlin</button>
//         <button className="miniBtn filterMiniBtn">Ruby</button>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Filter;