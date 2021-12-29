import {combineReducers} from 'redux';
import {postReducer }from './postReducer'; 

const reducers = combineReducers({
    allPosts: postReducer,
})

export default reducers;