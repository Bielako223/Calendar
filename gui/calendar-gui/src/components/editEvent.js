import React, { useState } from 'react'
import Constants from "./utilities/Constant";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EdEvent(props) {


    const initialToDo = Object.freeze({
        id: props.event.id,
        userId: "",
        note: props.event.note,
        dat: props.event.dat,
        done: props.event.done,
        archived: false
    });

    const [todoData, setTododata] = useState(initialToDo);



    const handleChange = (e) => {
        setTododata({
            ...todoData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (todoData.note !== "") {
            const postToCreate = {
                id: props.event.id,
                userId: "",
                note: todoData.note,
                dat: "2023-05-04",
                done: props.event.done,
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
            props.close();
        }
    };

    return (
        <div>

            <Dialog open={true} onClose={props.close}>
                <DialogTitle>Edit event:</DialogTitle>
                <DialogContent>
                    <TextField value={todoData.note} name="note" onChange={handleChange} autoFocus
                        margin="dense" label="Enter event note" type='text' fullWidth
                        variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}