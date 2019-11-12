// import React, { useState, useContext } from "react";
// import "date-fns";
// import { Typography, Grid, TextField, Button } from "@material-ui/core/";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(() => ({
//   buttons: {
//     color: "white",
//     borderRadius: "25px",
//     border: "1px solid #087b94",
//     backgroundColor: "#087b94 !important",
//     margin: "1vh 0",
//   },
// }));

// export const EditExperience = props => {
//   const classes = useStyles();
//   const { index } = props.data;
//   const { listExperiences } = props.data;
//   const [newPositionName, setNewPositionName] = useState(positionTitle);
//   const [newCompanyName, setNewCompanyName] = useState(companyName);



//   return (
//     <>
//       <Grid container justify="center" style={{ padding: "2vh 0" }}>
//         <Grid item xs={11} style={{ padding: "2vh 0" }}>
//           <TextField
//             defaultValue={positionTitle}
//             fullWidth
//             onChange={event => {
//               setNewPositionName(event.target.value);
//             }}
//           />
//         </Grid>
//         <Grid item xs={11} style={{ padding: "2vh 0" }}>
//           <TextField defaultValue={companyName} fullWidth onChange={event => {
//             setNewCompanyName(event.target.value);
//           }}/>
//         </Grid>
//         <Grid
//           item
//           container
//           justify="space-evenly"
//           style={{ padding: "2vh 0" }}
//         >
//           <Grid item xs={5}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardDatePicker
//                 disableToolbar
//                 variant="inline"
//                 format="MM/yyyy"
//                 margin="normal"
//                 value={selectedStartDate}
//                 id="date-picker-inline"
//                 label="Start Date"
//                 onChange={handleDateChange}
//                 KeyboardButtonProps={{
//                   "aria-label": "change date",
//                 }}
//               />
//             </MuiPickersUtilsProvider>
//           </Grid>
//           <Grid item xs={5}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardDatePicker
//                 disableToolbar
//                 variant="inline"
//                 format="MM/yyyy"
//                 margin="normal"
//                 value={selectedEndDate}
//                 id="date-picker-inline"
//                 label="End Date"
//                 onChange={handleDateChangeEnd}
//                 KeyboardButtonProps={{
//                   "aria-label": "change date",
//                 }}
//               />
//             </MuiPickersUtilsProvider>
//           </Grid>
//         </Grid>
//         <Grid item xs={11}>
//           <TextEditor />
//         </Grid>
//         <Grid item xs={11} style={{ padding: "2vh 0" }}>
//           <Button
//             className={classes.buttons}
//             fullWidth
//             onClick={() => {
//               UpdateSingleUserWorkExp();
//             }}
//           >
//             Save Changes
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// };
