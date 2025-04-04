import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill-new";


const WritePanel = () => {
    const [editorValue, setEditorValue] = useState('');
  
    const modules = {
      syntax: false,
      toolbar: [
        [{ 'font': [] }, { 'size': [] }],
        [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video', 'formula'],
        ['blockquote', 'code-block'],
        ['clean']
      ]
    };
  
    const handleChange = (value:any) => {
      setEditorValue(value);
      console.log(value)
    };
  
    return (
      
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          placeholder="Compose an epic..."
          theme="snow"
        />

    );
  };

export default WritePanel;