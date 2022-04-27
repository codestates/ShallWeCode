import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Contents.css'
import Loading from '../loading/Loading'
import axios from 'axios'


function Contents() {
  const history = useHistory()
  const [thumbnail, setThumbnail] = useState(null)
  const [ PRorTP, setPRorTP ] = useState('1')
  const [languageFilter, setLanguageFilter] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/board/filter`, { params: {stack: languageFilter.join(''), PRorTP }}, {withCredentials: true})
    .then((res) => {
      if (res.data.message === '필터에 맞는 게시물이 존재하지 않습니다') {
        setThumbnail(null)
      }
      else if (res.status === 200) {
        setThumbnail(res.data.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })  }, [languageFilter, PRorTP])

  const languages = [
    { value: '01', label: 'JavaScript' },
    { value: '02', label: 'TypeScript' },
    { value: '03', label: 'React.js' },
    { value: '04', label: 'Node.js' },
    { value: '05', label: 'Vue.js' },
    { value: '06', label: 'Flutter' },
    { value: '07', label: 'Java' },
    { value: '08', label: 'C' },
    { value: '09', label: 'C++' },
    { value: '10', label: 'C#' },
    { value: '11', label: 'Spring' },
    { value: '12', label: 'Angular.js' },
    { value: '13', label: 'Swift' },
    { value: '14', label: 'Python' }
  ]
  
  const filterBoard = (e) => {
    setPRorTP(e.target.value)
  }

  const languagesOnClick = (language) => {
    languageFilter.includes(language)
    ? removeLanguage(language)
    : setLanguage(language)
  }
  
  const setLanguage = (language) => {
    setLanguageFilter([...languageFilter, language])
  }
  
  const removeLanguage = (language) => {
    const index = languageFilter.findIndex((lan) => lan === language)
    languageFilter.splice(index, 1)
    setLanguageFilter([...languageFilter])
  }

  const boardClick = (contentId) => {
    history.push({
        pathname: '/Detail',
        state: { contentId: contentId }
    })
}

  return (
    <div className="contentWrapper">
      {/* 모집글 구분 버튼 */}
      <div className='selectBtnBackgroundSize'>
      <div className='selectBtnSize'>
        <button className={PRorTP==='1' ? 'active selectBtn' : 'selectBtn'} value='1' onClick={filterBoard}>프로젝트 모집</button>
        <button className={PRorTP==='2' ? 'active selectBtn' : 'selectBtn'} value='2' onClick={filterBoard}>포트폴리오</button>
      </div>
      </div>
      {/* 언어 필터 */}
      <div>      
        <div className='filterBackgroundSize'>
          <div className='filterImg'>
            {languages.map((language,i) => {
              return <button 
              key = {i}
              onClick={()=>{languagesOnClick(language.value)}} 
              className={`${languageFilter.includes(language.value) ? 'active miniBtn filterMiniBtn' : 'miniBtn filterMiniBtn'}`}
              >{language.label}</button>
            })}
          </div>
        </div>
      </div>
      {/* 게시물 */}
      <div className='thumbnailSection'>
      {
          (function ()  {
            if(thumbnail === ''){
              return (<Loading/>)
            } else if (thumbnail === null){
              return (
                <div className='postNoneDiv'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z'/></svg>           
                  <div className='postNone'>게시물이 없어요</div>
                </div>
                )
            } else{
              return (
                (thumbnail ?? []).map((data, i) => {
                  return (
                  <div key={i} className='thumbnailBox' onClick={() => boardClick(data.id)}>
                      <div className='thumbnailBoxTitle'>
                          <div>{data.title}</div>
                      </div>
                      <div className='thumbnailBoxTag'>
                      {data.stack.map((language,i) => {
                      return <button key={i} className='thumbnailTagBtn miniBtn filterMiniBtn'>{language}</button>
                      })}
                      </div>
                  </div>
                  )
              })
            )}}
          )()
        }
        </div>
    </div>
  )
}

export default Contents