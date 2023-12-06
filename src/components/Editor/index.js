import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  formats,
  redoChange,
  undoChange,
} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import { replaceParaWithDivs } from "../../utils";

export const Editor = ({ state, handleChange, id, styles = "", readOnly }) => {
  //* console.log("state", state);
  return (
    <div className={`w-full ${styles}`}>
      <EditorToolbar id={id} />
      <ReactQuill
        theme="snow"
        value={state}
        onChange={(val) => handleChange(val)}
        placeholder={"Write here..."}
        modules={Editor.modules(id)}
        formats={formats}
        readOnly={readOnly}
      />
    </div>
  );
};

// Modules object for setting up the Quill editor
Editor.modules = (id) => ({
  toolbar: {
    container: "#toolbar" + id,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

export default Editor;
