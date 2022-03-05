import React, {useState, useRef} from 'react';
import "./Profile.css"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Bear from "./bear22.png"


function Profile(props) {
  // const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  // const fileInput = useRef(null)
  const [imgBase64, setImgBase64] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      console.log('base64', base64)
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  }
  
  return (

 
      <div className="mainProfile section">
        <div style={{"backgroundColor": "#298854", "width":"150px", "height" : "150px"}}>
      </div>

        <div className="profileText">
          <input  type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>
          <button className= "delete">삭제</button>
        </div> 
      </div>
  

  );
}

export default Profile;