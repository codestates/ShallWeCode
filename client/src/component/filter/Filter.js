import React, { useState,Component, useRef, useEffect } from 'react'
import "./Filter.css"

function Filter(props) {
  const languages = [
    'javascript',
    'typescript',
    'react',
    'vue',
    'node.js',
    'java',
    'spring',
    'kotlin',
    'c++',
    'go',
    'python',
    'django',
    'flutter',
    'swift',
  ];
  
  const [languageFilter, setLanguageFilter] = useState("");
  // 배열이 선택 languages를 포함하고 있는지에 따라서 removeLanguage , setLanguage 함수 실행
  // 전체 버튼? 
  console.log('languageFilter===',languageFilter)

  const languagesOnClick = (language) => {
    languageFilter.includes(language)
      ? removeLanguage(language)
      : setLanguage(language);

    // axios.post("http://localhost:4000/", languageFilter).then((res) => {
    //   console.log("--------then------",res)
    //   if (res.status === 200) {
        
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // })

  };
  const setLanguage = (language) => {
    setLanguageFilter([...languageFilter, language]);
  };
  const removeLanguage = (language) => {
    const index = languageFilter.findIndex((lan) => lan === language);
    languageFilter.splice(index, 1);
    setLanguageFilter([...languageFilter]);
  };



  return (

    <div>      
      <div className="filterBackgroundSize ">
      <div className="filterImg">
        {languages.map((language,i) => {
          return <button 
          key = {i}
          onClick={()=>{languagesOnClick(language)}} 
          className={`${languageFilter.includes(language) ? "active miniBtn filterMiniBtn" : "miniBtn filterMiniBtn"}`}
          >{language}</button>
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