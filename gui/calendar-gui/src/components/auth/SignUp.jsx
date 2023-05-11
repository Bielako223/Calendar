import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../../firebase"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';

const SignUp = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const signUp=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((useCredential)=> {
      console.log(useCredential)
    }).catch((error)=> console.log(error))
  }

  return (

<Dialog open={true} onClose={props.close}>

<Container component="main" maxWidth="xs">
      
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={signUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email} onChange={(e)=> setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password} onChange={(e)=> setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link onClick={props.close} variant="body2">
                {"Have an account? Sign In"}
                
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
</Dialog>
  )
}

export default SignUp
