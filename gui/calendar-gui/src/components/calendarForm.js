import React, { useState, useEffect } from 'react'
import Constants from "./utilities/Constant";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';
import CreateToDo from "./createToDo";
import CreateEvent from "./createEvent";
import EditToDo from "./editToDo";
import EditEvent from "./editEvent";
import Container from "@mui/material/Container";
import { Grid, Paper, Stack, Box, Typography, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MouseIcon from '@mui/icons-material/Mouse';


export default function CalendarForm(prop) {



  const [dat, setDat] = useState(new Date());
  const [todo, setTodo] = useState([]);
  const [eventsForMonth, setEventsForMonth] = useState([]);
  const [eventsForDay, setEventsForDay] = useState([]);
  const [showingCreateNewToDo, setshowingCreateNewToDo] = useState(false);
  const [showingEditNewToDo, setshowingEditNewToDo] = useState(null);
  const [showingCreateNewEvent, setshowingCreateNewEvent] = useState(false);
  const [showingEditNewEvent, setshowingEditNewEvent] = useState(null);

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    updateList();

  }, [dat]);

  const createToDo = () => {
    setshowingCreateNewToDo(!showingCreateNewToDo);
  }

  const createEvent = () => {
    setshowingCreateNewEvent(!showingCreateNewEvent);
  }


  async function deleteToDo(id) {
    const url = `${Constants.API_URL_DELETE_TODO_BY_ID}?Id=${id}`;
    await fetch(url, {
      method: 'DELETE'
    });
    updateList();
  };

  async function deleteEvent(id) {
    const url = `${Constants.API_URL_DELETE_EVENT_BY_ID}?Id=${id}`;
    await fetch(url, {
      method: 'DELETE'
    });
    updateList();
  };



  async function getToDo(dat, id) {
    var sendDat = dat.yyyymmdd();
    var url = `${Constants.API_URL_GET_TODO}?Dat=${sendDat}&Id=${id}`;
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    setTodo(json);
    getEventsForMonth(dat, id);
  }

  async function getEventsForMonth(dat, id) {
    var sendDat = dat.yyyymmdd();
    var url = `${Constants.API_URL_GET_EVENTS_FOR_MONTH}?Dat=${sendDat}&Id=${id}`;
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    setEventsForMonth(json);

  }

  async function getEventsForDay(dat, id) {
    var sendDat = dat.yyyymmdd();
    var url = `${Constants.API_URL_GET_EVENTS_FOR_DAY}?Dat=${sendDat}&Id=${id}`;
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    setEventsForDay(json);

  }

  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
  };

  const updateList = () => {
    getToDo(dat, prop.userId);
    getEventsForDay(dat, prop.userId);
    getEventsForMonth(dat, prop.userId);
    getEventsForDay(dat, prop.userId);
  }

  const goToDate = (d) => {
    setDat(new Date(d));
    getToDo(new Date(d), prop.userId);
  }

  async function doneToDoFunction(dat, not, id, isdone) {
    const postToCreate = {
      id: id,
      userId: prop.userId,
      note: not,
      dat: dat,
      done: !isdone,
      archived: false
    };
    const url = Constants.API_URL_UPDATE_TODO;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToCreate)
    });
    updateList();
  };

  async function doneEventFunction(not, id, isdone) {
    const postToCreate = {
      id: id,
      userId: prop.userId,
      note: not,
      dat: "2023-05-03",
      done: !isdone,
      archived: false
    };
    const url = Constants.API_URL_UPDATE_EVENT;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToCreate)
    });
    updateList();
  };

  const editEventForm = () => {
    setshowingEditNewEvent(null);
    updateList();
  }

  const editToDoForm = () => {
    setshowingEditNewToDo(null);
    updateList();
  }
  return (

    <div>
      <Container maxWidth="xl">
        <Button variant="text" onClick={prop.logOut}>Log Out</Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Box padding={1}>
                <Box>
                  <Typography variant='h4'>{dat.toDateString().substring(dat.toDateString().indexOf(" "))}</Typography>
                  <Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", paddingLeft: "0.4rem" }}>Events:</Typography>
                </Box>
                {eventsForDay.map((x) => (
                  <Box key={x.id} className='eventBox' sx={{ display: "flex", alignItems: "center", margin: "0.4rem", padding: "0.4rem" }}>
                    <IconButton size='small'><CheckCircleIcon fontSize='small' onClick={() => doneEventFunction(x.note, x.id, x.done)} className={x.done ? 'done' : 'ndone'} /></IconButton>
                    <Typography sx={{ wordBreak: "break-word" }} variant='subtitle1' component="h2">{x.note}</Typography>
                    <IconButton size='small'><EditIcon fontSize='small' onClick={() => setshowingEditNewEvent(x)} /></IconButton>
                    <IconButton size='small'><HighlightOffIcon fontSize='small' onClick={() => deleteEvent(x.id)} className='delete' /></IconButton>

                  </Box>
                ))}
                <Button onClick={createEvent} variant="outlined" className='addButton'>Add Event</Button>
                <Box>
                  <Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", paddingLeft: "0.4rem" }}>To Do list:</Typography>
                </Box>

                {todo.map((x) => (
                  <Box key={x.id} className='eventBox' sx={{ display: "flex", alignItems: "center", margin: "0.4rem", padding: "0.4rem" }}>
                    <IconButton size='small'><CheckCircleIcon fontSize='small' onClick={() => doneToDoFunction(x.dat, x.note, x.id, x.done)} className={x.done ? 'done' : 'ndone'} /></IconButton>

                    <Typography sx={{ wordBreak: "break-word" }} variant='subtitle1' component="h2">{x.dat.substring(x.dat.indexOf('T') + 1, x.dat.indexOf('T') + 6)} {x.note}</Typography>
                    <IconButton size='small'><EditIcon fontSize='small' onClick={() => setshowingEditNewToDo(x)} /></IconButton>
                    <IconButton size='small'><HighlightOffIcon fontSize='small' onClick={() => deleteToDo(x.id)} className='delete' /></IconButton>
                  </Box>
                ))}
                <Button onClick={createToDo} variant="outlined" className='addButton'>Add To Do</Button>
                {showingCreateNewToDo && <CreateToDo handleclose={createToDo} date={dat.yyyymmdd()} userId={prop.userId} update={updateList} />}
                {showingCreateNewEvent && <CreateEvent handleclose={createEvent} date={dat.yyyymmdd()} userId={prop.userId} update={updateList} />}
              </Box>






            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>

              <Paper elevation={3}><Calendar className={""} tileClassName="tileClassName" onChange={setDat} value={dat} onClickDay={(value) => getToDo(value, prop.userId)} locale='en-EN' activeStartDate={dat} // pass in state var in activeStartDate
                onActiveStartDateChange={({ value, activeStartDate, action }) => {
                  if (action === 'next') {
                    setDat(new Date(activeStartDate))
                  }
                  if (action === 'prev') {
                    setDat(new Date(activeStartDate))
                  }
                  if (action === 'drillUp') {
                    setDat(new Date(activeStartDate))
                  }
                  if (action === 'drillDown') {
                    setDat(new Date(activeStartDate))
                  }
                  if (action === 'next2') {
                    setDat(new Date(activeStartDate))
                  }
                  if (action === 'prev2') {
                    setDat(new Date(activeStartDate))
                  }


                }} /></Paper>
              <Paper elevation={3}>
                <Box padding={1}>
                  <Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", paddingLeft: "0.4rem" }}>Upcoming events:</Typography>
                  {eventsForMonth.map(x => (
                    <Box key={x.id} >
                      {new Date(x.dat) >= new Date() && <Box className='eventBox' sx={{ display: "flex", alignItems: "center", margin: "0.4rem", padding: "0.4rem" }}><MouseIcon fontSize='small' /> <Typography sx={{ wordBreak: "break-word" }} onClick={() => goToDate(x.dat.substring(0, x.dat.indexOf('T')))}>
                        {new Date(x.dat).toDateString().substring(new Date(x.dat).toDateString().indexOf(" "))} {x.note}
                      </Typography></Box>}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      {showingEditNewToDo !== null && <EditToDo todo={showingEditNewToDo} date={dat.yyyymmdd()} close={editToDoForm} />}
      {showingEditNewEvent !== null && <EditEvent event={showingEditNewEvent} close={editEventForm} />}

    </div>

  );
}
