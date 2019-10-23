import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import PropTypes from 'prop-types';
import { Image } from 'components';
import { API } from 'helpers';
import { ApplicationContext } from 'contexts';
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { ChevronRight, ChevronLeft, Delete, Check, Close } from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

const _ = require('underscore');
const useStyles = makeStyles({
  content: {
    marginBottom: '9vh',
    marginTop: '3vh',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    height: '9vh',
  },
  textField: {
    margin: 0,
  },
  card: {
    margin: '7px 0',
    borderRadius: '15px',
    width: '100%',
  },
  quizCard: {
    borderRadius: '8px',
  },
  cardGridPadding: {
    padding: '1vh 0',
  },
  removeMarginLeft: {
    marginLeft: 0
  },
  goalsCardStyle: {
    marginBottom: '2vh',
  },
});

/**
 * 
 * @param {String} m_id Pass module id
 */
export const DrawerView = props => {
  const { m_id } = props;
  const {
    programId,
    setIsDrawerOpen,
    setTargetView,
    targetView,
    setDrawerTitle,
  } = useContext(ApplicationContext);
  // const [data, setData] = useState('');
  const [dataArray, setDataArray] = useState([]);                                       // Store API response array for quiz, timetable, activity, goal
  const [selectedData, setSelectedData] = useState({});                                 // Store selected activity data
  const [selectedQuizData, setSelectedQuizData] = useState({});                                 // Store selected activity data
  const [editListActionStatus, setEditListActionStatus] = useState(false);              // For timetable
  const [current, setCurrent] = useState(1);       // Question number
  const [userResposeArr, setUserResponseArr] = useState([]);
  const classes = useStyles();

  // Call API here
  useEffect(() => {
    async function triggerAPI(viewName) {
      if (viewName === 'ACTIVITY_LIST_VIEW') {
        const response = await API.getListOfActivities(programId, m_id, setDataArray);
        if (response) {
          return setDataArray(response.activityData);
        }
      }
      else if (viewName === 'TIMETABLE_VIEW') {
        const response = await API.getAllTimetable(programId, m_id, setDataArray);
        if (response) {
          return setDataArray(response.timeTableData);
        }
      }
      // else if (viewName === 'GOAL_VIEW') {           // TODO: Add Goals API here 
      // const response = await API.getAllTimetable(programId, m_id, setDataArray);
      // if (response) {
      //   return setDataArray(response.timeTableData);
      // }
      // }
    }
    triggerAPI(targetView);
  }, [targetView, programId, m_id]);

  useLayoutEffect(() => {
    function viewTitle() {
      switch (targetView) {
        case 'GOAL_VIEW':
          return 'Goals';
        case 'QUIZ_VIEW':
        case 'SELECTED_QUIZ_VIEW':
          return 'Quiz';
        case 'ACTIVITY_LIST_VIEW':
          return 'Activity';
        case 'DETAILED_ACTIVITY_VIEW':
          return selectedData.title;
        case 'TIMETABLE_VIEW':
          return 'Timetable';
        default:
          return;
      }
    }
    setDrawerTitle(viewTitle());
  });

  const GoalsView = () => {
    // const [data] = useState([]);

    const GoalsCard = ({ item }) => {
      return (
        <Paper className={classes.goalsCardStyle}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ padding: '10px', backgroundColor: item.color }}
          >
            <Grid item xs={4}>
              <Image src={item.image} alt={`goal-card-${Math.random}`} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">
                {item.text}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    };

    return (
      <>
        {
          [1, 2, 3, 4, 5, 6, 7].map(obj => {
            let item = { text: 'vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a', color: '', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80' };
            return <GoalsCard item={item} key={obj} />;
          })
        }
      </>
    );
  };

  const QuizView = () => {
    const arr = [{ id: 1, title: 'Quiz 1' }];
    const data = [               // TODO: Dummy quiz data. Remove when API is ready
      {
        id: 1,
        question: 'It\'s important for families to be active together because?',
        questionType: 'MULTIPLE_CHOICE',
        options: [{ id: 1, answerType: 'CHECKBOX', option: 'Adults and children need physical activity to be happy and healthy.', feedback: 'Feedback' }, { id: 2, answerType: 'CHECKBOX', option: 'Children tend to be more active if an adult is being active with them.', feedback: 'Feedback' }, { id: 3, answerType: 'CHECKBOX', option: 'Playing actively together helps families to bond and have happy relationships.', feedback: 'Feedback' }, { id: 4, answerType: 'CHECKBOX', option: 'Children seeing their parents being active teaches them that active play is important and fun.', feedback: 'Feedback' }]
      },
      {
        id: 2,
        question: 'Does family active play need to involve an outing?',
        questionType: 'SINGLE_CHOICE',
        options: [{ id: 1, answerType: 'CHECKBOX', option: 'Yes', feedback: 'Feedback' }, { id: 2, answerType: 'CHECKBOX', option: 'No', feedback: 'Feedback' }]
      },
      {
        id: 3,
        question: 'Question related to image',
        questionType: 'SINGLE_CHOICE',
        options: [{ id: 1, answerType: 'IMAGE', option: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80', feedback: 'Feedback' }, { id: 2, answerType: 'IMAGE', option: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80', feedback: 'Feedback' }, { id: 3, answerType: 'IMAGE', option: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80', feedback: 'Feedback' }, { id: 4, answerType: 'IMAGE', option: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1556&q=80', feedback: 'Feedback' }]
      }
    ];

    // Start Quiz component
    // TODO: Answer type for image & text is not implemented
    const Quiz = () => {
      let obj = selectedQuizData.find(item => item.id === current);

      const checkBoxHandler = (checkStatus, type, responseId) => {
        if (type === 'SINGLE_CHOICE') {
          let res = userResposeArr.find(item => item.id === current);

          if (!res) {        // When empty
            setUserResponseArr([...userResposeArr, { id: current, answer: responseId }]);
          } else {
            let updatedArr = userResposeArr.map(item => {
              // When deselecting the checkbox set answer to empty
              if (item.id === current && !checkStatus) {
                item.answer = "";
                return item;
              }

              // When selecting new checkbox Update response
              if (item.id === current) {
                item.answer = responseId;
                return item;
              }
              return item;
            });
            return setUserResponseArr(updatedArr);
          }
        } else if (type === 'MULTIPLE_CHOICE') {
          let res = userResposeArr.find(item => item.id === current);

          if (!res) {        // When empty
            setUserResponseArr([...userResposeArr, { id: current, answer: [responseId] }]);
          } else {
            if (checkStatus) {                // When true add
              let updatedArr = userResposeArr.map(item => {
                if (item.id === current) {
                  let check = item.answer.find(x => x === responseId);           // Safety check whether selected response is not inside answer array
                  if (!check)
                    item.answer = [...item.answer, responseId];
                  return item;
                }
                return item;
              });
              return setUserResponseArr(updatedArr);
            } else {                                    // When false remove
              let updatedArr = userResposeArr.map(item => {
                if (item.id === current) {
                  item.answer = item.answer.filter(x => x !== responseId);
                  return item;
                }
                return item;
              });
              return setUserResponseArr(updatedArr);
            }
          }
        }
      };

      const checkboxStatusHandler = (type, id) => {
        let obj = userResposeArr.find(res => res.id === current);
        if (type === 'SINGLE_CHOICE') {
          return obj ? (obj.answer === id ? true : false) : false;
        } else if (type === 'MULTIPLE_CHOICE') {
          if (obj)
            return obj.answer.find(x => x === id) ? true : false;
        }
      };

      const checkAnswerType = (item) => {
        if (item.answerType === 'CHECKBOX') {
          return (
            <Card className={clsx(classes.card, classes.quizCard)} key={`option_card_${item.id}`}>
              <Grid container direction="row" alignItems="center" justify="center" className={classes.cardGridPadding}>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.removeMarginLeft}
                    control={
                      <Checkbox
                        checked={checkboxStatusHandler(obj.questionType, item.id) ? true : false}
                        onChange={(e) => checkBoxHandler(e.target.checked, obj.questionType, item.id, userResposeArr)}
                      />
                    }
                    label={item.option}
                  />
                </Grid>
              </Grid>
            </Card>
          );
        } else if (item.answerType === 'IMAGE') {
          return (
            <Grid item xs={6} key={`image_${item.id}`}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxStatusHandler(obj.questionType, item.id) ? true : false}
                    onChange={(e) => checkBoxHandler(e.target.checked, obj.questionType, item.id, userResposeArr)}
                  />
                }
                label={
                  <>
                    <img src={item.option} key={item.id} style={{ marginRight: "5px", height: 'auto', width: '100px' }} alt={`image_${item.id}`} />
                  </>
                }
              />
            </Grid>
          );
        }

        return;
      };

      return (
        <Grid container direction="column" alignItems="stretch">
          <Grid item xs={12}>
            <Typography variant="body1">
              {obj.question}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            {
              obj.options.map(item => {
                return checkAnswerType(item);
              })
            }
          </Grid>
        </Grid>
      );
    };
    // End Quiz component

    if (targetView === 'QUIZ_VIEW') {
      return (
        <>
          <Typography variant="body1">
            Select the quiz to perform
          </Typography>
          {
            arr.map(item => {
              return (
                <Card key={item.id} className={classes.card} onClick={() => {
                  setSelectedQuizData(data);      // TODO: Add API here to get data for quiz
                  setTargetView('SELECTED_QUIZ_VIEW');
                }}>
                  <CardHeader
                    disableTypography
                    title={item.title}
                  />
                </Card>
              );
            })
          }
        </>
      );
    } else if (targetView === 'SELECTED_QUIZ_VIEW') {
      return <Quiz />;
    }
  };

  const TimetableView = () => {
    const [textFieldValue, setTextFeildValue] = useState('');
    return (
      <>
        {
          editListActionStatus ? (
            <Card className={classes.card}>
              <CardContent>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      id="timetable-textfield"
                      label="Your new timetable ..."
                      placeholder="e.g. Create a timetable"
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      autoFocus
                      value={textFieldValue}
                      onChange={(e) => setTextFeildValue(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Close onClick={() => { setEditListActionStatus(false); setTextFeildValue(''); }} />
                  </Grid>
                  <Grid item xs={1}>
                    <Check onClick={() => { setDataArray([...dataArray, { title: textFieldValue }]); setEditListActionStatus(false); setTextFeildValue(''); }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : ''
        }

        {
          dataArray.map((item, key) => {
            return (
              <Card key={key} className={classes.card}>
                <CardContent>
                  <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body2">
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Delete onClick={() => console.log('trigger delete action')} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })
        }
      </>
    );
  };

  const renderContent = (data) => {
    switch (data.type) {
      case 'HTML':
        return ReactHtmlParser(data.content);
      default:
        return;
    }
  };

  const ActivityView = () => {

    const activityCardClickHandler = async (item) => {
      const response = await API.getSpecificActivity(programId, m_id, item.id);
      if (response && response.status) {
        setTargetView('DETAILED_ACTIVITY_VIEW');
        setSelectedData(response.data);
      }
    };

    if (targetView === 'ACTIVITY_LIST_VIEW') {
      return dataArray.length < 1 ? (
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No activities active yet ...
            </Typography>
          </Grid>
        </Grid>
      ) : dataArray.map(item => {
        return (
          <Card key={item.id} className={classes.card} onClick={() => activityCardClickHandler(item)}>
            <CardHeader
              disableTypography
              title={item.title}
            />
          </Card>
        );
      });
    } else {
      return selectedData.content ? selectedData.content.map(data => {
        return renderContent(data);
      }) : '';
    }
  };

  const renderMainBody = () => {
    switch (targetView) {
      case 'GOAL_VIEW':
        return <GoalsView />;
      case 'QUIZ_VIEW':
      case 'SELECTED_QUIZ_VIEW':
        return <QuizView />;
      case 'ACTIVITY_LIST_VIEW':
      case 'DETAILED_ACTIVITY_VIEW':
        return <ActivityView />;
      case 'TIMETABLE_VIEW':
        return <TimetableView />;
      default:
        return;
    }
  };

  const backButtonHandler = () => {
    if (targetView === 'GOAL_VIEW' || targetView === 'QUIZ_VIEW' || targetView === 'ACTIVITY_LIST_VIEW' || targetView === 'TIMETABLE_VIEW') {
      setIsDrawerOpen(false);
      setTargetView('');
    } else if (targetView === 'DETAILED_ACTIVITY_VIEW') {
      setTargetView('ACTIVITY_LIST_VIEW');
    } else if (targetView === 'SELECTED_QUIZ_VIEW') {
      if (current === 1) {                                // When user at question 1 redirect to quiz list view
        setTargetView('QUIZ_VIEW');
        setUserResponseArr([]);
      } else {                                            // When current greater than 1
        setCurrent(current - 1);
      }
    }
  };

  const nextButtonHandler = () => {
    if (current === selectedQuizData.length) {
      setCurrent(1);                    // Reset current value for quiz
      setUserResponseArr([]);
      setTargetView('QUIZ_VIEW');
    } else {
      setCurrent(current + 1);
    }
  };

  const checkQuizProgress = () => {
    let arr = [];
    userResposeArr.slice().map(item => {
      if (Array.isArray(item.answer) && item.answer.length > 0) return arr.push(item);
      else if ((_.isNumber(item.answer) || _.isString(item.answer)) && item.answer) return arr.push(item);
      return '';
    });
    return (arr.length / selectedQuizData.length) * 100;
  };

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch" className={classes.content}>
        <Grid item xs={12}>
          {renderMainBody()}
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.bottomNav}
      >
        <Grid item xs={2}>
          <Button onClick={() => backButtonHandler()} startIcon={<ChevronLeft />}>
            Back
          </Button>
        </Grid>

        {
          targetView === "SELECTED_QUIZ_VIEW" ? (
            <Grid item xs={6}>
              <LinearProgress
                variant="determinate"
                value={checkQuizProgress()}
              />
            </Grid>
          ) : ''
        }

        {
          targetView === 'SELECTED_QUIZ_VIEW' ? (
            <Grid item xs={2}>
              <Button onClick={() => nextButtonHandler()} endIcon={<ChevronRight />} style={{ float: 'right' }}>
                {selectedQuizData.length === current && targetView === 'SELECTED_QUIZ_VIEW' ? 'FINISH' : 'Next'}
              </Button>
            </Grid>
          ) : ''
        }
      </Grid>
    </>
  );
};

DrawerView.propTypes = {
  m_id: PropTypes.string.isRequired,
};
