import { ActionType } from "../constants/actionTypes"
export const setPosts = (posts) => {
    return {
        type : ActionType.SET_POSTS,
        posts : posts
    }
}

export const selectedPost = (post) =>{
    return {
        type : ActionType.SELECT_POST,
        post : post 
    }
}