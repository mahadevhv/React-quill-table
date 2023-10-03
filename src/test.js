import React, { useState, useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";

Quill.register("modules/better-table", QuillBetterTable);

const editorModules = {
  // table: false, // disable table module
  table: false,
  "better-table": {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Another unmerge cells name"
        }
      }
    }
  },
  toolbar: {
    container: [
      [{ header: [] }],
      // [{ header: "1" }, { header: "2" }, { font: [] }],
      // [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      // [{ align: [] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ],
    handlers: { image: () => console.log("image") }
  },
  keyboard: {
    bindings: QuillBetterTable.keyboardBindings
  }
};

export default function App() {
  const modules = useMemo(
    () => ({
      ...editorModules
    }),
    []
  );
  const editor = useRef();
  const [text, setText] = useState("");

  function addTable() {
    editor?.current?.getEditor()?.getModule("better-table")?.insertTable(3, 3);
  }
  return (
    <div>
      <button onClick={addTable}>Add Table</button>

      <ReactQuill
        ref={editor}
        value={text}
        modules={modules}
        onChange={(value) => setText(value)}
        theme="snow"
      />
    </div>
  );
}
