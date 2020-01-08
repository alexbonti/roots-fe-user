import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Grid, Button } from "@material-ui/core/";
import { OnBoardingContext, HomeContext } from "contexts";
import { API } from "helpers";
import { notify } from "components";
import { checkWord, checkEmpty } from "../../helpers/validation";
import PropTypes  from "prop-types";

const useStyles = makeStyles(() => ({
  rootMain: {
    backgroundColor: "white",
    padding: "5vh 0",
  },
  buttons: {
    color: "white",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
    borderRadius: "25px",
    padding: "2vh 3vw",
    heigth: "55px",
  },
}));

export const FilterOpportunity = props => {
  const classes = useStyles();

  let dataArray = props.data;

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const { setLocation, setIsStart } = useContext(OnBoardingContext);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [distance, ] = useState(40000);
  const [, setDataSetFilteredByLocation] = useState("");

  const [keyword, setKeyword] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const { setFilteredData, setIsFilterOn } = useContext(HomeContext);

  const [locationError, setLocationError] = useState(false);
  const [keywordError, setKeywordError] = useState(false);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setLocation(event.target.innerText);
    setPositionSuggestions("");
    setIsStart(true);
  };

  const getLongLat = async input => {
    const data = await API.getLatLong(input.locationId);
    setLat(data.response.latitude);
    setLong(data.response.longitude);
  };

  if (dataArray === null || dataArray === undefined) {
    return null;
  }


  const filter = () => {
    const data = {
      long,
      lat,
      distance,
    };

    const filterLocation = async () => {
      if (keyword !== "" && checkWord(keyword)) {
        setKeywordError(true);
        return notify("Keyword is too short");
      }else{ setKeywordError(false);}

      const dataLocation = await API.searchByLocation(data);
      setDataSetFilteredByLocation(dataLocation.response);

      if (dataLocation.response.length > 0) {
        setFilteredData(dataLocation.response);
        setIsFilterOn(true);
        if (keyword !== "") {
          filterByKeyword(dataLocation.response);
        } else if (positionFilter !== "") {
          filterBySeniority(dataLocation.response);
        }
      } else {
        notify("No Results");
        setIsFilterOn(true);
      }
    };

    const filterByKeyword = dataSet => {
      let dataSetFilteredByKeyword = [];
      dataSet.map(data => {
        if (
          data.positionTitle.includes(keyword) ||
          data.description.includes(keyword)
        ) {
          return dataSetFilteredByKeyword.push(data);
        } else {
          setFilteredData([]);
          return notify("No Results");
        }
      });

      if (dataSetFilteredByKeyword.length > 0) {
        setFilteredData(dataSetFilteredByKeyword);
        setIsFilterOn(true);
      } else {
        return notify("No Results");
      }
    };

    const filterBySeniority = dataSet => {
      let dataSetFilteredBySeniority = [];
      dataSet.map(data => {
        return data.seniority.includes(positionFilter)
          ? dataSetFilteredBySeniority.push(data)
          : console.log("No results");
      });

      if (dataSetFilteredBySeniority < 1) {
        notify("No Results");
      }
      setFilteredData(dataSetFilteredBySeniority);
      setIsFilterOn(true);
      return console.log(dataSetFilteredBySeniority);
    };

    if (checkEmpty(inputPosition)) {
      setLocationError(true);
      return notify("Location  field can not be empty");
    } else {
      setLocationError(false);
    }

    if (lat !== "" && long !== "") {
      filterLocation();
    }
  };
  return (
    <Grid item xs={10} md={5} lg={5}>
      <div>
        <TextField
          required
          id="standard-required"
          label="Location"
          value={inputPosition}
          error={locationError}
          placeholder="Employement Type"
          margin="normal"
          fullWidth
          onChange={event => {
            event.preventDefault();
            autoFill(event);
          }}
        />
        <div>
          {positionSuggestions !== null &&
          positionSuggestions !== undefined &&
          positionSuggestions !== "" ? (
              <div className={classes.suggestion}>
                {positionSuggestions.map(suggestion => {
                  return (
                    <div
                      key={Math.random()}
                      onClick={event => {
                        event.preventDefault();
                        setSuggestions(event);
                        getLongLat(suggestion);
                      }}
                    >
                      {suggestion.label.substring(16, suggestion.label.lenght)}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
        </div>
        <div />
      </div>
      {/* <Grid style={{ paddingTop: "5vh" }}>
        <Slider
          defaultValue={1}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          step={2}
          marks
          min={1}
          max={50}
          valueLabelDisplay="on"
        />
        <Typography id="discrete-slider">Distance (km)</Typography>
      </Grid> */}
      <TextField
        id="free-solo-demo"
        placeholder="Keyword"
        margin="normal"
        error={keywordError}
        fullWidth
        onChange={e => setKeyword(e.target.value)}
      />
      <TextField
        id="free-solo-demo2"
        select
        margin="normal"
        fullWidth
        label="Position type"
        onChange={e => setPositionFilter(e.target.value)}
        style={{marginTop: 0}}
      >
        {positionTypeOption.map(option => (
          <MenuItem key={Math.random()} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Grid item container justify="center" xs={11} lg={12} md={12}>
        <Grid item xs={6} lg={6} md={6}>
          <Button
            fullWidth
            className={classes.buttons}
            onClick={() => {
              filter();
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const positionTypeOption = [
  { label: "Full-Time" },
  { label: "Part-Time" },
  { label: "Casual" },
  { label: "Internship" }
];



FilterOpportunity.propTypes = {
  data: PropTypes.array,
};