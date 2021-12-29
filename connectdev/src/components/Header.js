import { ButtonGroup, Typography , Button} from '@material-ui/core';
import { AppBar, makeStyles, Box} from '@material-ui/core';
const Header = ()=>{
    const useStyles = makeStyles((theme)=>({
        root : {
            display : 'flex',
            justifyContent : 'space-around'
        },
        button : {
            color : 'white'
        }        
    }));
    const classes = useStyles();
    return (
    <AppBar position='static'>
        <Box className={classes.root} m={2}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >     
            {'Connectdin'}
            </Typography>
            <ButtonGroup size={'large'} variant='outlined' >
                <Button className={classes.button} >{"Posts"}</Button>
                <Button className={classes.button}>{"Users"}</Button>
                <Button className={classes.button}>{"Logout"}</Button>
            </ButtonGroup>
        </Box>
    </AppBar>); 
}

export default Header;