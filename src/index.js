import React, { useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import Test from "./test";
// import "./styles.css";
import "react-quill-with-table/dist/quill.snow.css";
// import "react-quill-with-table/dist/quill.bubble.css";

// var htmlToReactParser = new HtmlToReactParser();

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

function App() {
  const modules = useMemo(
    () => ({
      ...editorModules
    }),
    []
  );
  const editor = useRef();
  const [text, setText] = useState("");
  // var reactElement = htmlToReactParser.parse(text);
  // useEffect(() => {
  //   const editon = editor.current.getEditor();
  //   //console.log(editon.getModule("toolbar"));
  //   let tableModule = editon.getModule("better-table");
  //   tableModule.insertTable(3, 3);
  //   console.log(tableModule);
  // }, []);

  function addTable() {
    // const editon = editor?.current?.getEditor();
    // //console.log(editon.getModule("toolbar"));
    // let tableModule = editon?.getModule("better-table");
    // tableModule?.insertTable(3, 3);
    // console.log({ editon, tableModule });

    editor?.current?.getEditor()?.getModule("better-table")?.insertTable(3, 3);
  }
  return (
    <div>
      <Test />
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
