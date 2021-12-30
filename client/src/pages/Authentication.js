import {Button, Container ,makeStyles, TextField} from '@material-ui/core';
const Authentication = ()=>{
    const useStyles = makeStyles({
        root : {
            padding : '20vh',
        },
        form : {
            display : 'grid',
        },
        field  :{
            margin : '10px',
            minWidth : '200px'
        },
        button : {
            color : 'white'
        }
    });
    const classes = useStyles();

     
    return <Container maxWidth= {'lg'} className={classes.root}>
        <Container maxWidth= {'sm'}>
            <form className={classes.form}>
                <TextField className={classes.field} label="Email" variant="outlined" type='email'/>
                <TextField className={classes.field} label="Password" variant="outlined" type='password'/>
                <Button className = {classes.button} variant="contained" color="primary">
                    Login
                </Button>       
            </form>
            </Container>
    </Container>
}

export default Authentication;