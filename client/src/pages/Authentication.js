import {Button, Container ,makeStyles, TextField} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Authentication = ()=>{
    const navigate = useNavigate();
    const {loginUser} = useAuth();
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('');
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }
    
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        loginUser(email, password);
    }
    const useStyles = makeStyles({
        root : {
            height : '100vh',
        },
        form : {
            paddingTop : '60px',
            display : 'grid',
            justifyItems : 'center'
        },
        textField : {
           marginTop : '20px',
           minWidth : '300px',
        },
        button : {
            width : 'fit-content',
            margin : '10px'
        }
    });
    const classes = useStyles();

     
    return <Container maxWidth= {'lg'} className={classes.root}>
                <form onSubmit={handleFormSubmit} className={classes.form}>
                    <TextField value={email} onChange={handleEmailChange} className={classes.textField} label="Email" variant="outlined" type='email'/>
                    <TextField value={password} onChange={handlePasswordChange} className={classes.textField} label="Password" variant="outlined" type='password'/>
                    <Button type='submit' className={classes.button} variant="contained" color="primary">
                        Login
                    </Button>       
                </form>
            </Container>
}

export default Authentication;