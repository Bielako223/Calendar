import React, { useState } from 'react'
import Constants from "./utilities/Constant";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CrToDo(props) {

    const initialToDo = Object.freeze({
        id: 0,
        userId: props.userId,
        note: "",
        dat: "",
        done: false,
        archived: false
    });

    const [todoData, setTododata] = useState(initialToDo);
    const [time, setTime] = useState('10:00');



    const handleChange = (e) => {
        setTododata({
            ...todoData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (todoData.note !== "" && time !== null) {


            const postToCreate = {
                id: 0,
                userId: props.userId,
                note: todoData.note,
                dat: `${props.date}T${time}`,
                done: false,
                archived: false
            };
            const url = Constants.API_URL_CREATE_TODO;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postToCreate)
            });
            props.update();
            props.handleclose();
        }
    };

    return (
        <div>

            <Dialog open={true} onClose={props.handleclose}>
                <DialogTitle>Create to do:</DialogTitle>
                <DialogContent>
                    <TimePicker disableClock={true} onChange={setTime} value={time} />
                    <TextField value={todoData.note} name="note" onChange={handleChange} autoFocus
                        margin="dense" label="Enter to do note" type='text' fullWidth
                        variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleclose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
