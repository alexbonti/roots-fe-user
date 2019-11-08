import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import { Grid } from "@material-ui/core/";

import "react-quill/dist/quill.snow.css";
import { TextEditorContext } from "contexts/index";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }]
  ]
};

export const TextEditor = (props) => {
  const { setCoverLetter } = useContext(TextEditorContext);
  const [nodeRedData] = useState("");
  const handleTextEditorChange = value => {
    if(props.data === "coverletter"){
      return (value);
    }
  };



  return (
    <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: "white" }}>
      <Grid item xs={12} style={{backgroundColor: "white" }} >
        <ReactQuill
          onChange={handleTextEditorChange}
          modules={{
            toolbar: modules.toolbar
          }}
          theme="snow"
          placeholder="Description ..."
        />
        <div className="textEditorContent">
          <div>{ReactHtmlParser(nodeRedData)}</div>
        </div>
      </Grid>
    </Grid>
  );
};
