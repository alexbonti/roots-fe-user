import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import { Grid } from "@material-ui/core/";

import "react-quill/dist/quill.snow.css";
import { TextEditorContext } from "contexts/index";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "underline"],
    [{ list: "bullet" }],
    [{ color: [] }],
  ],
};

export const TextEditor = props => {
  const {coverletter, setCoverLetter, setWorkExperience } = useContext(TextEditorContext);
  const [nodeRedData] = useState("");
  const handleTextEditorChange = value => {
    
    switch (props.data.content) {
    case "coverletter":
      return (
        setCoverLetter(value));
    case "editWorkExperience":
      return setWorkExperience(value);
    default:
      return null;
    }
  };


  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ backgroundColor: "white" }}
    >
      <Grid item xs={12} style={{ backgroundColor: "white" }}>
        <ReactQuill
          onChange={handleTextEditorChange}
          modules={{
            toolbar: modules.toolbar,
          }}
          theme="snow"
          placeholder="Description ..."
          defaultValue={(props.data.defaultValue)}
        />
        <Grid container justify="center"  className="textEditorContent">
          <Grid item xs={11}>{ReactHtmlParser(nodeRedData)}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
