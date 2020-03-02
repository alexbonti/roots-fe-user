import React, { createContext, useState } from "react";

export const TextEditorContext = createContext();

export const TextEditorProvider = props => {
  const [coverLetter, setCoverLetter] = useState("");
  const [criteriaSelection, setCriteriaSelection] = useState("");
  const [workExperience, setWorkExperience] = useState("");

  const { children } = props;
  return (
    <TextEditorContext.Provider
      value={{
        coverLetter,
        setCoverLetter,
        workExperience,
        setWorkExperience,
        criteriaSelection,
        setCriteriaSelection,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};
