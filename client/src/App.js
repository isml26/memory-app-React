import React ,{useEffect} from "react";//use effect is initially going to be just
//the component that mount 
import {Container,AppBar,Typography,Grow,Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import memories from "./images/memories.png";
import {getPosts} from "./actions/posts" 
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form";
import useStyles from "./styles";
import MemoryIcon from '@material-ui/icons/Memory';
function App(){
    const [currentId,setCurrentId] = React.useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);
    return (<Container maxWidth="lg">
    <AppBar className ={classes.appBar} position="static" color="inherit">
        <MemoryIcon className={classes.mem1} />
         <Typography className ={classes.heading} variant="h3" align="center">Memories</Typography>
         <img className ={classes.image} src={memories} alt="memories" height="60"></img>
         <MemoryIcon/>
    </AppBar>
    <Grow in>
        <Container>
            <Grid className = {classes.mainContainer} container justify ="space-between" alignItems="stretch" spacing={3} >
                <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Form currentId = {currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
    </Grow>


    </Container> 
    )
}

export default App;