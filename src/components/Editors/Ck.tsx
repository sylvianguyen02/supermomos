"use client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

const Ck = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{ placeholder: "Description of your event.." }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        // console.log("Editor is ready to use!", editor);
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
    />
  );
};

export default Ck;
