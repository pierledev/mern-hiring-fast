import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

const PostEditor = ({ content, setContent }) => {
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={content}
      className="mt-5 rounded-full w-full"
      onChange={setContent}
    />
  );
};

export default PostEditor;
