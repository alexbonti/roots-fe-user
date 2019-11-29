import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Typography,
  Grid,
  Button,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { OnBoardingContext } from "contexts";
import Slider from "@material-ui/core/Slider";
import { API } from "helpers";

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
  },
}));

export const GoogleMaps = props => {
  const classes = useStyles();

  let dataArray = props.data;

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const { setLocation, setIsStart } = useContext(OnBoardingContext);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [distance, setDistance] = useState(0);
  const [dataSetFilteredByLocation, setDataSetFilteredByLocation] = useState(
    ""
  );
  const [dataSetFilteredByKeyword, setDataSetFilteredByKeyword] = useState("");

  const [dataSetFilteredBySeniority, setDataSetFilteredBySeniority] = useState(
    ""
  );
  const [keyword, setKeyword] = useState("");
  const [seniorityFilter, setSeniorityFilter] = useState("");

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

  const marks = [
    {
      value: 2,
      label: "2km",
    },
    {
      value: 5,
      label: "5km",
    },
    {
      value: 10,
      label: "10km",
    },
    {
      value: 50,
      label: "50km",
    },
  ];

  function valuetext(value) {
    setDistance(value * 1000);
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }

  const filter = () => {
    const data = {
      long,
      lat,
      distance,
    };

    const filterLocation = async () => {
      const dataLocation = await API.searchByLocation(data);
      setDataSetFilteredByLocation(dataLocation.response);

      if (dataLocation.response !== "" && keyword !== "") {
        if (
          dataLocation.response !== "" &&
          filterByKeyword(dataLocation.response) !== "no matching keyword"
        ) {
          return filterBySeniority(filterByKeyword(dataLocation.response));
        } else {
          return filterByKeyword(dataLocation.response);
        }
      }
    };

    const filterByKeyword = dataSet => {
      let dataSetFilteredByKeyword = [];
      dataSet.map(data => {
        return data.positionTitle.includes(keyword) ||
          data.description.includes(keyword)
          ? dataSetFilteredByKeyword.push(data)
          : console.log("No results");
      });
      return dataSetFilteredByKeyword.length > 0
        ? dataSetFilteredByKeyword
        : "no matching keyword";
    };

    const filterBySeniority = dataSet => {
      let dataSetFilteredBySeniority = [];

      dataSet.map(data => {
        console.log(seniorityFilter);
        console.log(data.seniority.includes(seniorityFilter));
        return data.seniority.includes(seniorityFilter)
          ? dataSetFilteredBySeniority.push(data)
          : console.log("No results");
      });

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
      <Grid style={{ paddingTop: "5vh" }}>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          step={2}
          marks
          min={0}
          max={50}
          valueLabelDisplay="on"
        />
        <Typography id="discrete-slider">Distance (km)</Typography>
      </Grid>
      <TextField
        id="free-solo-demo"
        placeholder="Position Title"
        margin="normal"
        fullWidth
        onChange={e => setKeyword(e.target.value)}
      />
      <TextField
        id="free-solo-demo2"
        select
        value={seniorityFilter}
        helperText="Please select Seniority Level"
        margin="normal"
        fullWidth
        onChange={e => setSeniorityFilter(e.target.value)}
      >
        {seniorityOption.map(option => (
          <MenuItem key={Math.random()} value={option.label} >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {/* <Autocomplete
        id="free-solo-3-demo"
        options={["Senior", "Mid-Level", "Junior"]}
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Seniority"
            margin="normal"
            //variant="outlined"
            fullWidth
            //InputProps={{ ...params.InputProps, type: "search" }}
            onChange={(e)=> {setSeniorityFilter(e.target.value);}}
          />
        )}
      /> */}
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const jobs = [
  { key: 0, label: "Accounting" },
  { key: 1, label: "Administration & Office Support" },
  { key: 2, label: "Agriculture, Horticulture, Animal & Fishing" },
  { key: 3, label: "Banking, Superannuation & Finance" },
  { key: 4, label: "Construction" },
  { key: 5, label: "Customer Service & Call Centre" },
  { key: 6, label: "Design & Architecture" },
  { key: 7, label: "Editorial, Media & Creative Arts" },
  { key: 8, label: "Education, Training & Childcare" },
  { key: 9, label: "Engineering" },
  { key: 10, label: "Executive Management & Consulting" },
  { key: 11, label: "Government, Emergency Services & Defence" },
  { key: 12, label: "Healthcare & Medical" },
  { key: 13, label: "Hospitality, Tourism & Food Services" },
  { key: 14, label: "Human Resources (HR) & Recruitment" },
  { key: 15, label: "Information Technology (IT)" },
  { key: 16, label: "Insurance" },
  { key: 17, label: "Legal" },
  { key: 18, label: "Manufacturing, Production & Operations" },
  { key: 19, label: "Marketing & Advertising" },
  { key: 20, label: "Mining & Energy" },
  { key: 21, label: "Property & Real Estate" },
  { key: 22, label: "Retail" },
  { key: 23, label: "Sales" },
  { key: 24, label: "Science, Technology & Environment" },
  { key: 25, label: "Social Work & Community Services" },
  { key: 26, label: "Trades & Services" },
  { key: 27, label: "Transport & Logistics" },
  { key: 28, label: "Work From Home & Self Employed" },
];

const seniorityOption = [{label:"Senior"}, {label:"Mid-Level"}, {label:"Junior"}];
