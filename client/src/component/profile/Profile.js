import React, {useState, useRef} from 'react';
import "./Profile.css"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Bear from "./bear22.png"
import axios from 'axios';

function Profile(props) {
  // const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  // const fileInput = useRef(null)
  // const [imgBase64, setImgBase64] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); // 파일 base64
  // const [imgFile, setImgFile] = useState(null);	//파일	
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	
  const [test, setTest] = useState(null)
  const [files, setFiles] = useState('기본이미지');

  const [previewImg, setPreviewImg] = useState(null)

  const insertImg = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (let i = 0; i < event.target.files.length; i++) {
    if (event.target.files[i]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
      // 파일 상태 업데이트
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        console.log("base64: ",base64)
        if (base64) {
        //  images.push(base64.toString())
        const base64Sub = base64.toString()
           
        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
        //  setImgBase64(newObj);
          // 파일 base64 상태 업데이트
        //  console.log(images)
        }
      }
    }
  }    // console.log(e.target.files)
    // setFiles(e.target.files)
    // let reader = new FileReader();
    // if (e.target.files[0]) {
    //       reader.readAsDataURL(e.target.files[0]); 

    //     }
    //     console.log(reader)

    // reader.onloadend = () => {
    //   const previewImgUrl = reader.result

    //   if(previewImgUrl){
    //     setPreviewImg(previewImgUrl)
    //   }
    // }

  }

  // 미리보기 수정해야 할 시
  // {imgBase64.map((item) => {
  //   return(

  //    <img
  //      className="d-block w-100"
  //      src={item}
  //      alt="First slide"
  //      style={{width:"100%",height:"550px"}}
  //    />

  //   )
  //  }) }
  const deleteImg = () => {
    setPreviewImg(null)
  }

  const onLoadFile = async () => {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));
  
    // fd.append(
    //   "comment",
    //   comment
    // );

    await axios.post('http://localhost:4000/users/pictureEdit', fd, {
  headers: {
    "Content-Type": `multipart/form-data; `,
  }
})
.then((response) => {
   if(response.data){
       console.log(response.data)
       setTest("../../../../server/" + response.data.data.file)
    // history.push("/test1");
    console.log(test)
  }
})
.catch((err) => {
  // 예외 처리
  console.log("에러남 : ", err)
})

    // const formData = new FormData();
    // formData.append('uploadImage', files[0]);

    // const config = {
    //   Headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    // // console.log("formData", formData)
    // // const file = previewImg;
    // // console.log(file);
    // // setFiles(file);
    // console.log("formData : ", formData.entries())

    // axios.post('http://localhost:4000/users/pictureEdit', formData, config)
    //   // {picture: "잘 들어왔니?" })
    //   // ,{ headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
    // .then(data => {
    //   console.log(data)
    // })

    // axios.post('http://localhost:4000/users/login', {
    //   username: loginInfo.username,
    //   password: loginInfo.password
    // }).then((res) => {

    //   if (res.data.message === '로그인 성공') {
    //     handleResponseSuccess()
    //     history.push('/')
    //   } else {
    //     return setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다')
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  return (

      //회색 동그라미
      <div className="mainProfile section">
        {/* 
        <div className="profileText">
          <input 
          type="file" 
          name="imgFile" 
          id="imgFile" 
          accept='image/*' 
          onChange={onLoadFile}
          />
          <button className= "delete">삭제</button>
        </div>  */}

        
      
        {/* <img 
        style={{"backgroundColor": "#C4C4C4", "width":"150px", "height" : "150px", "border-radius" : "50%"}} 
        src={previewImg ? previewImg : Bear} />  */}
        <img className='profileImg' src={test ? test : Bear} /> 
        <img className='profileImg' src='images/bear'/> 
        
        

        <div className="profileText">
        <form encType='multipart/form-data'>
          <label htmlFor='file'>이미지 선택</label>
          <input className= "imgaeFileName" type='file' name="imgFile" id='file' onChange={insertImg}/>
        </form>
        <button className= "delete" onClick={deleteImg}>삭제</button>
        <button src={previewImg ? previewImg : Bear} onClick={onLoadFile}>이미지 적용</button>
        </div>



      </div>
  

  );
}

export default Profile;