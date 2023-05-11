import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { auth } from "../../firebase";
import SignIn from "./SignIn";
import CalendarForm from "../calendarForm";

const AuthDetails = ()=>{
    const [authUser,setAuthUser]= useState(null);

    useEffect(()=>{
        const listner = onAuthStateChanged(auth, (user)=>{
            if(user)setAuthUser(user)
                else setAuthUser(null)
        });
        return()=>{
            listner();
        }
    },[]);

    const userSignOut=()=>{
        signOut(auth)
    }
    return(
        <div>{authUser? <CalendarForm  userId={authUser.uid} logOut={userSignOut}/>: <SignIn/>}</div>
    )
}

export default AuthDetails