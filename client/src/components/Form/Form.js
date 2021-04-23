import React from "react";
import useStyles from "./styles";
import {TextField,Button,Typography,Paper} from "@material-ui/core"
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import { createPost,updatePost} from "../../actions/posts";
import {useSelector} from "react-redux";
const Form = ({currentId,setCurrentId})=>{
    const classes = useStyles();
    //paper is like whitish background div
    const [postData,setPostData] = React.useState(({
        creator:"",
        title:"",
        message:"",
        tags:"",
        selectedFile:""
    }));
    const post = useSelector((state)=>currentId ? state.posts.find((p)=>p._id === currentId) : null);
    const dispatch = useDispatch();
    React.useEffect(()=>{
        if(post) setPostData(post);
    },[post])
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData)); 
        }else{
            if(postData.title !== "" | postData.creator !=="" || postData.message !== "" || postData.tags !=="")
            dispatch(createPost(postData));   
        }
        clear();
    }
    const clear= ()=>{
        setCurrentId(null);
        setPostData({creator:"",title:"",message:"",tags:"",selectedFile:""});
    }
    return (
        <Paper className = {classes.paper}>
            <form autoComplete = "off" noValidate className = {classes.form} onSubmit = {handleSubmit}>
                <Typography variant = "h6">{currentId ? `Editing` : `Creating`} A Memory</Typography>
                <TextField name="creator" 
                    variant = "outlined" 
                    label ="Creator" 
                    fullWidth
                    value = {postData.creator}
                    onChange = {(event)=>setPostData({...postData,creator:event.target.value})}
                />
                    <TextField 
                    name="title" 
                    variant = "outlined" 
                    label ="Title" 
                    fullWidth
                    value = {postData.title}
                    onChange = {(event)=>setPostData({...postData,title:event.target.value})}
                />
                    <TextField 
                    name="message" 
                    variant = "outlined" 
                    label ="Message" 
                    fullWidth
                    value = {postData.message}
                    onChange = {(event)=>setPostData({...postData,message:event.target.value})}
                />
                    <TextField 
                    name="tags" 
                    variant = "outlined" 
                    label ="Tags" 
                    fullWidth
                    value = {postData.tags}
                    onChange = {(event)=>setPostData({...postData,tags:event.target.value.split(',')})}
                />
                <div className ={classes.fileInput}>
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone = {({base64})=>setPostData({...postData,selectedFile:base64})}
                     />
                </div>
                <Button 
                    className = {classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit"
                    fullWidth>
                    Submit
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear}
                    fullWidth>  
                    Clear
                </Button>
            </form>

        </Paper>
    )
}

export default Form;