import React, { useState,Component, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Contents.css'
import Loading from '../loading/Loading'
import axios from 'axios'


function Contents() {
  const history = useHistory()
  const [thumbnail, setThumbnail] = useState(null);

  const [category, setCategory] = useState('프로젝트 모집');

  const [ PRorTP, setPRorTP ] = useState('1')
  const [languageFilter, setLanguageFilter] = useState([]);

  const loadingThumbnail = () => {
    axios.get('http://localhost:4000/board/filter')
    .then((res) => {
      setThumbnail(res.data.data.data)
    })
  }
  useEffect(() => {
    loadingThumbnail()
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/board/filter", { params: {stack: languageFilter.join(''), PRorTP }}).then((res) => {
      if (res.data.message === '필터에 맞는 게시물이 존재하지 않습니다') {
        console.log(res.data.message)
      }
      else if (res.status === 200) {
        filteredThumbnail(res.data.data.data)
      }
    }).catch((err) => {
      console.log(err);
    })  }, [languageFilter, PRorTP]);

  const filteredThumbnail = (boards) => {
    setThumbnail(boards)
  }

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
  
  const filterBoard = (e) => {
    setPRorTP(e.target.value)
  }

  const languagesOnClick = (language) => {
    languageFilter.includes(language)
    ? removeLanguage(language)
    : setLanguage(language)
  };
  
  const setLanguage = (language) => {
    setLanguageFilter([...languageFilter, language]);
  };
  
  const removeLanguage = (language) => {
    const index = languageFilter.findIndex((lan) => lan === language);
    languageFilter.splice(index, 1);
    setLanguageFilter([...languageFilter]);
  };

  const boardClick = (contentId) => {
    history.push({
        pathname: '/Detail',
        state: { contentId: contentId }
    })
}

  return (
    <div>
      {/* 모집글 구분 버튼 */}
      <div className='selectBtnBackgroundSize'>
      <div className="selectBtnSize">
            <button className="selectBtn" value='1' onClick={filterBoard}>프로젝트 모집</button>
            <button className="selectBtn" value='2' onClick={filterBoard}>포트폴리오</button>
      </div>
      </div>
      {/* 언어 필터 */}
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
      {/* 게시물 */}
      <div className="thumbnailSection">
                {!thumbnail ? <Loading/>
                    : thumbnail.map((data, i) => {
                        return (
                        <div key={i} className="thumbnailBox" onClick={() => boardClick(data.id)}>
                            <div className="thumbnailBoxTitle">
                                <div>{data.title}</div>
                            </div>
                            <div className="thumbnailBoxTag">
                            {data.stack.map((language,i) => {
                            return <button key={i} className="thumbnailTagBtn miniBtn filterMiniBtn">{language}</button>
                            })}
                            </div>
                        </div>
                        )
                    })
                }
        </div>
    </div>
  );
}

export default Contents;