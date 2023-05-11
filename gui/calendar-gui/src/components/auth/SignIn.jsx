import React, {useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../../firebase"
import SignUp from "./SignUp";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SignIn = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [singup, setsingup]= useState(false);

  const signIn=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((useCredential)=> {
      console.log(useCredential)
    }).catch((error)=> console.log(error))
  }

  return (
    <div>
      
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link onClick={()=> setsingup(true)} variant="body2">
                {"Don't have an account? Sign Up"}
                
              </Link>
            </Grid>
          </Grid>
          {singup && <SignUp  close={()=> setsingup(false)}/>}
        </Box>
      </Box>
      
    </Container>
    
    </div>
  )
}

export default SignIn
