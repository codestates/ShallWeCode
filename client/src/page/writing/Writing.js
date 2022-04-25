import React, { useState, useRef } from 'react'
import Select from 'react-select'
import Navbar from '../../component/navbar/Navbar'
import './Writing.css'
import languageList from './LanguageList'
import axios from 'axios'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'


function Writing(props) {
  const [type, setType] = useState('') // 글의 타입 지정, 클릭시 변경, 1번 2번으로 구분
  const [title, setTitle] = useState('') // 제목
  const [stack, setStack] = useState({languageList}) // 기본 스택 목록
  const [content, setContent] = useState('') // 에디터에 적혀진 글로 변경
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()



  const handleType = (event) => {
    setType((event.target.value))
  }

  const handleChangeTitle= (event) => {
    setTitle(event.target.value)
  }
  
  // 스택 선택시 선택 된것만 출력
  const handleChangeStack = e => {
    // console.log('e',e)
    let stackLanguageList = []
    e.map((v,i)=>{stackLanguageList.push(v.value)})
    setStack(stackLanguageList)
  }

  let editorRef = useRef()
  const handleChangeEditor = e => {
    const editorInstance = editorRef.current.getInstance()
    const getContentMarkDown = editorInstance.getMarkdown() // 마크다운으로 에디터에 쓰여진 글 받아옴
    setContent(getContentMarkDown)
  }
  
  // 글 등록 버튼 클릭 
  const handleButtonClick = (event) => {
    const data = {
      PRorTP: type,
      title: title,
      body: content,
      stack: stack
    }

    if(!type || !title || !content || !stack){
      setErrorMessage('모든 항목은 필수입니다')
    }else{
      axios.post(`${process.env.REACT_APP_API_URL}/board/writing`, data)
      .then(res=> {
        Swal.fire({
          title: '글쓰기 성공',
          width: 600,
          padding: '3em',
          confirmButtonColor: '#298854',
          color: 'black',
          background: '#fff ',
          backdrop: ` 
            rgba(0,0,0,0.4)
          `
        })
        history.push('/')
      })
    }
  }

  const handleWritingCancelClick = () => {
    history.push('/')
  }

  return (
    
    <div>
      <Navbar />

    <div className='writingSection'>
      {/* 프로젝트 포트폴리오 선택 */}
      <div className='categoryName'>
        <div className='types'>
          <input type='radio' name='type' value='1' 
          className='typeBtn'
          // checked='checked'
          onChange={handleType}/><label className='type' >프로젝트 모집</label>
          <input type='radio' name='type' value='2' className='typeBtn'
          onChange={handleType}/><label className='type'>포트폴리오</label>
        </div>
      </div>
      {/* 제목 */}
      <div className='writingTitleMainDiv'>
        <div className='mediumSizeFont writingTitleDiv '>제목</div>
        <input onChange={handleChangeTitle} className='writingTitle'></input>
      </div>
      {/* 기술 스택 */}
        <div className='selectLanguage'>
          <label className ='mediumSizeFont categorySelectLanguage'>기술스택</label>
          <Select
          isMulti
          name='colors'
          options={languageList}
          className='basic-multi-select'
          classNamePrefix='select'
          placeholder={'프로젝트 기술 스택 선택'}
          onChange={(e) => handleChangeStack(e)} 
        > </Select>
        </div>
    </div>
      {/* 글쓰기 */}
      <Editor
        initialValue={
        `프로젝트 설명: \n프로젝트 진행 방식: \n모집 인원:`}
        previewStyle='vertical'
        height='800px'
        initialEditType='markdown'
        useCommandShortcut={true}
        ref={editorRef}
        onChange={handleChangeEditor}
      />
      
      <div className='writingBtnDiv'>
      <div className='writingErrMessage alertBox'>{errorMessage}</div>   
        <button onClick={()=>{handleChangeEditor(); handleButtonClick()}} className='miniBtn saveBtn smallSizeFont'>글 등록</button>
        <button onClick={handleWritingCancelClick} className='miniBtn writingCancelBtn smallSizeFont'>취소</button>
      </div>
    </div>
  )
}

export default Writing