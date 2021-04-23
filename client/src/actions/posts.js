import * as api from "../api";
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE} from "../constants/actionTypes";
//Action creators 
//patload is usully the data where we store all of our posts
//fetching posts some thime is gonna have to past ,it means that we are working 
// asynchronous data for that we have to use redux thunk
export const getPosts =  ()=> async (dispatch)=>{
    try { 
        const {data} = await api.fetchPosts();
        //sending data through the action.payload
        const action = {type:FETCH_ALL,payload:data};
        dispatch(action); 
    } catch (error) {
        console.log(error);
    }  
}
export const createPost = (post)=> async(dispatch)=>{
    try {
        const {data} =await api.createPost(post);
        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const updatePost = (id,post)=>async(dispatch)=>{
    try {
        const {data}= await api.updatePost (id,post);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id)=>async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});    
    } catch (error) {
        console.log(error);    
    }
}
export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data}= await api.likePost (id);
        dispatch({type:LIKE,payload:data});
    } catch (error) {
        console.log(error);
    }
}