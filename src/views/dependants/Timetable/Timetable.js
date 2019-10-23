import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import { API } from 'helpers';
import { ApplicationContext, LayoutContext } from 'contexts';
import { HeaderElements } from 'components';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  Chip,
  CardHeader,
  Paper,
  Button,
  CardContent,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import { Delete, ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 * Object from source is added to destination and not removed from source
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [transfer] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, transfer);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  padding: '4px 0',
  ...draggableStyle
});

const destListStyle = () => ({
  // minHeight: '10vh', // TODO: here check
});

const getItemStyleHoriz = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  predefinedList: {
    padding: '5px',
  },
  button: {
    width: '80%',
  },
  chip: {
    margin: '3px 2px',
  },
  destinationCardStyle: {
    padding: '10px',
  },
  destinationCardHeader: {
    paddingBottom: 0,
  },
  sourceGridStyle: {
    marginTop: '2vh',
  },
  emptyUserBoxStyle: {
    border: '1px black dashed',
    padding: '5vh 0',
  },
}));

const Timetable = props => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:335px)');
  const { match: { params: { m_id } } } = props;
  const { programId } = useContext(ApplicationContext);
  const [adminArr, setAdminArr] = useState([]);
  const [APIErrorMessage, setAPIErrorMessage] = useState('');
  const [userArr, setUserArr] = useState([]);
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton
              size={matches ? 'small' : 'medium'}
              style={{ padding: 0 }}
              component={Link}
              to={`/module/${m_id}`}
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              Timetable
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </HeaderElements>
    );
  }, [setHeaderElements, matches, m_id]);

  // Call API here
  useEffect(() => {
    async function triggerAPI() {
      const response = await API.getAllTimetable(programId, m_id);
      if (response.status) {
        setAdminArr(response.data);
      } else {
        setAPIErrorMessage(response.message);
      }
    }
    triggerAPI();
  }, [m_id, programId]);

  const getList = id => {
    if (id === 'droppable')
      return adminArr;
    else
      return userArr;
  };

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const arr = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'droppable2') {
        return setUserArr(arr);
      }

      setAdminArr(arr);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setAdminArr(result.droppable);
      setUserArr(result.droppable2);
      return;
    }
  };

  const deleteHandler = (keyId) => {
    let obj = userArr.find(x => x.id === keyId);
    let filteredArray = userArr.filter(x => x.id !== keyId);
    if (filteredArray && (filteredArray.length !== userArr.length)) {
      setAdminArr([...adminArr, obj]);
      setUserArr(filteredArray);
    }
  };

  if (APIErrorMessage) {
    return (
      <Grid container direction="column" alignItems="stretch" className={classes.fullHeight}>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" justify="center">
            {APIErrorMessage}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" alignItems="center" justify="center" spacing={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid item xs={11} className={clsx(classes.fullWidth, classes.sourceGridStyle)}>
          <Card className={classes.predefinedList}>
            <Droppable droppableId="droppable" direction="horizontal" isDropDisabled>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={adminArr.length < 1 ? classes.emptyAdminBoxStyle : ''}
                >
                  {
                    adminArr.length < 1 ? (
                      <Typography variant="body2" align="center">
                        {userArr.length < 1 ? 'Nothing new ...' : 'You\'re all caught up'}
                      </Typography>
                    ) : adminArr.map((item, index) => (
                      <Draggable key={`sourceItem_${item.id}`} draggableId={`sourceItem_${item.id}`} index={index}>
                        {(provided, snapshot) => (
                          <Chip
                            color="primary"
                            size="small"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyleHoriz(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            label={item.title}
                            className={classes.chip}
                          />
                        )}
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>
        </Grid>

        <Grid item xs={11} container direction="column" alignItems="stretch">
          <Card className={classes.fullWidth}>
            <CardHeader
              title="Timetable"
              className={classes.destinationCardHeader}
            />
            <CardContent>
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    style={destListStyle(snapshot.isDraggingOver)}
                    ref={provided.innerRef}
                    className={userArr.length < 1 ? classes.emptyUserBoxStyle : ''}
                  >
                    {
                      userArr.length < 1 ? (
                        <Typography variant="body2" align="center">
                          Drop here ...
                        </Typography>
                      ) : userArr.map((item, index) => (
                        <Draggable
                          isDragDisabled
                          key={`destinationItem_${item.id}`}
                          draggableId={`destinationItem_${item.id}`}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Paper className={classes.destinationCardStyle}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                  <Grid item xs={11}>
                                    <Typography variant="body2" noWrap>
                                      {item.title}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={1}>
                                    <Delete onClick={() => deleteHandler(item.id)} />
                                  </Grid>
                                </Grid>
                              </Paper>
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </Grid>
      </DragDropContext>

      <Grid item xs={12} className={classes.button}>
        <Button variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(Timetable);

Timetable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      m_id: PropTypes.string.isRequired,
    })
  })
};
