import React, { useState,Component, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import './MyContents.css'
import Loading from '../loading/Loading'
import axios from 'axios'

function MyContents(props) {
  const location = useLocation()
  const history = useHistory()
  const [thumbnail, setThumbnail] = useState('')
  const [ PRorTP, setPRorTP ] = useState('1')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/board/user`, { params: {PRorTP: PRorTP, userId: location.state.userinfo[0].id }})
    .then((res) => {
      if(res.data.message === '필터링된 페이지 가져오기 성공'){
        setThumbnail(res.data.data.data)
      }else if(res.data.message === '게시물이 존재하지 않습니다'){
        setThumbnail(null)
      }  
    })
  }, [PRorTP])

  
  const filterBoard = (e) => {
    setPRorTP(e.target.value)
  }


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
    <div className='selectBtnSize'>
          <button className='selectBtn' value='1' onClick={filterBoard}>프로젝트 모집</button>
          <button className='selectBtn' value='2' onClick={filterBoard}>포트폴리오</button>
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
                thumbnail.map((data, i) => {
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

export default MyContents