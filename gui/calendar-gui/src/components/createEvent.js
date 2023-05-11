import React, { useState } from 'react'
import Constants from "./utilities/Constant";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CrEvent(props) {

    const initialToDo = Object.freeze({
        id: 0,
        userId: props.userId,
        note: "",
        dat: "",
        done: false,
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
                id: 0,
                userId: props.userId,
                note: todoData.note,
                dat: `${props.date}`,
                done: false,
                archived: false
            };
            const url = Constants.API_URL_CREATE_EVENT;
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
        <div >
            <Dialog open={true} onClose={props.handleclose}>
                <DialogTitle>Create event:</DialogTitle>
                <DialogContent>
                    <TextField required value={todoData.note} name="note" onChange={handleChange} autoFocus
                        margin="dense" label="Enter event note" type='text' fullWidth
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