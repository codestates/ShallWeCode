import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import "./Writing.css"

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


function Writing(props) {

  return (
    <div>
      <Navbar />
      <Editor
        initialValue="글을 작성해 보세요" 
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
      <div>
        <h1></h1>
      </div>
    </div>
  );
}

export default Writing;