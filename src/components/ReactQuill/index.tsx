import { useState } from "react";
import ReactQuillLib, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Code } from "../Code";
import "./index.css";

const fontSizeArray = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "36px",
  "48px",
];
const fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = fontSizeArray;
Quill.register(fontSizeStyle, true);

export const ReactQuill = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full flex flex-col gap-4">
      <ul className="list-disc ml-6">
        <li>Fácil utilização</li>
        <li>Acesso fácil ao valor</li>
        <li>Pouca integração com Typescript</li>
        <li>
          Algumas estilizações são com classe CSS, como alinhamento e code-block
        </li>
      </ul>

      <div className="h-[20rem]">
        <ReactQuillLib
          theme="snow"
          value={value}
          className="h-full"
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"],
            ],
          }}
          onChange={setValue}
        />
      </div>
      <br />
      <br />
      <Code>{value}</Code>
    </div>
  );
};
