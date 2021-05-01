import axios from "axios";
import {setAlert} from "./alert";
import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_COMMENT,
    DELETE_POST,
    GET_POSTS,
    GET_SINGLE_POST,
    POST_ERROR,
    UPDATE_LIKES
} from "./types";

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete post
export const deletePost = postId => async dispatch => {
   const isConfirmed = window.confirm('Are you sure you would like to delete this post?');
   if (isConfirmed) {
       try {
           await axios.delete(`/api/posts/${postId}`);

           dispatch({
               type: DELETE_POST,
               payload: postId
           });

           dispatch(setAlert('Post removed successfully', 'success'));
       } catch (err) {
           dispatch({
               type: POST_ERROR,
               payload: {msg: err.response.statusText, status: err.response.status}
           });
       }
   }
};

// Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created successfully', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get a single post
export const getSinglePost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type: GET_SINGLE_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment added successfully', 'success'));
    } catch (err) {
        console.log(err.response.data.errors)
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment removed successfully', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};