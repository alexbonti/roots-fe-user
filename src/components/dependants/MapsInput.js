import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Typography,
  Grid,
  Button,
} from "@material-ui/core/";
import { OnBoardingContext, HomeContext } from "contexts";
import Slider from "@material-ui/core/Slider";
import { API } from "helpers";
import {notify} from 'components';

const useStyles = makeStyles(theme => ({
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
    heigth: "55px"
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
  const [distance, setDistance] = useState(40000);
  const [, setDataSetFilteredByLocation] = useState(
    ""
  );
 
  const [keyword, setKeyword] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const {  setFilteredData, setIsFilterOn } = useContext(
    HomeContext
  );

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

  function valuetext(value) {
    setDistance(value * 1000);
    return `${value}`;
  }

  

  const buttonStatus = inputPosition !== "" ? false : true;

  const filter = () => {
    const data = {
      long,
      lat,
      distance
    };

    const filterLocation = async () => {

      const dataLocation = await API.searchByLocation(data);
      setDataSetFilteredByLocation(dataLocation.response);
      
      if(dataLocation.response.length > 0){
        
        setFilteredData(dataLocation.response);
        setIsFilterOn(true);
        if(keyword !== ""){
          filterByKeyword(dataLocation.response);
        }else if(positionFilter !== ""){
          filterBySeniority(dataLocation.response);
        }
      }else{
        notify("No Results");
        setIsFilterOn(true);
      }
    };

    const filterByKeyword = dataSet => {
      
      let dataSetFilteredByKeyword = [];
      dataSet.map(data => {
        if(data.positionTitle.includes(keyword) ||
        data.description.includes(keyword)){
          return dataSetFilteredByKeyword.push(data);
        }else{
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
      console.log(dataSet);
      dataSet.map(data => {
        console.log(positionFilter);
        console.log(data.seniority.includes(positionFilter));
        return data.seniority.includes(positionFilter)
          ? dataSetFilteredBySeniority.push(data)
          : console.log("No results");
      });

      if(dataSetFilteredBySeniority < 1){notify("No Results");}
      setFilteredData(dataSetFilteredBySeniority);
      setIsFilterOn(true);
      return console.log(dataSetFilteredBySeniority);
    };

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
                    {suggestion.label}
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
        fullWidth
        onChange={e => setKeyword(e.target.value)}
      />
      <TextField
        id="free-solo-demo2"
        select
        helperText="Please select a Position Type"
        margin="normal"
        fullWidth
        onChange={e => setPositionFilter(e.target.value)}
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
            disabled={buttonStatus}
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
];
