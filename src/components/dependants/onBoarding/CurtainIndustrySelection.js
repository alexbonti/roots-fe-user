import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, TextField, Chip } from "@material-ui/core/";
export const CurtainIndustrySelection = () => {
  const [chipData, setChipData] = useState([]);

  const handleDelete = chipToDelete => () => {
      console.log(chipData, chipToDelete.key)
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <>
      <Autocomplete
        multiple
        options={jobs}
        getOptionLabel={option => option.label}
        renderTags={(value, { className, onDelete }) =>
          value.map(
            (option, index) => setChipData(value)
            //   (
            //     <Chip
            //       key={index}
            //       data-tag-index={index}
            //       label={option.title}
            //       className={className}
            //       onDelete={onDelete}
            //       color="secondary"
            //     />
            //   )
          )
        }
        style={{ width: "100%" }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Industry Fields"
            fullWidth
          />
        )}
      />
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{ padding: "2vh" }}
      >
        {chipData.length > 0
          ? chipData.map(data => {
              return (
                <Grid key={data.key} item>
                  <Chip
                    label={data.label}
                    color="secondary"
                    onDelete={handleDelete(data)}
                  />
                </Grid>
              );
            })
          : ""}
      </Grid>
    </>
  );
};
const jobs = [
  { key: 0, label: "Agriculture" },
  { key: 1, label: "Natural Resources Agriculture" },
  { key: 2, label: "Food" },
  { key: 3, label: "Architecture and Construction" },
  { key: 4, label: "Arts" },
  { key: 5, label: "Audio/Video" },
  { key: 6, label: "Technology & Communications" },
  { key: 7, label: "Business Management" },
  { key: 8, label: "Administration" },
  { key: 9, label: "Education" },
  { key: 10, label: "TrainingEducation" },
  { key: 11, label: "Finance" },
  { key: 12, label: "Government" },
  { key: 13, label: "Public Administration" },
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
