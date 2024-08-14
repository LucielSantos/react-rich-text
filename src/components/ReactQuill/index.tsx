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
    <div className="w-full flex flex-col gap-4 h-[20rem]">
      <ReactQuillLib
        theme="snow"
        value={value}
        modules={{
          toolbar: [
            [{ size: fontSizeArray }],
            [{ color: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
            ],
            ["link"],
            ["clean"],
          ],
        }}
        onChange={setValue}
      />
      <br />
      <Code>{value}</Code>
    </div>
  );
};
