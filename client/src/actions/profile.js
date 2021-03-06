import axios from "axios";
import {setAlert} from "./alert";

import {
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILE, GET_PROFILES, GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get profile by user ID
export const getProfileByUserID = userID => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userID}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    } catch (err) {
        /*dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });*/
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(formData)
        const res = await axios.post('/api/profile', body, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        const alertMsg = edit
            ? 'Your profile has been updated successfully'
            : 'Your new profile has been created';

        dispatch(setAlert(alertMsg, 'success'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(formData)
        const res = await axios.put('/api/profile/experience', body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        const alertMsg = 'Experience has been added successfully';

        dispatch(setAlert(alertMsg, 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(formData)
        const res = await axios.put('/api/profile/education', body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        const alertMsg = 'Education has been added successfully';

        dispatch(setAlert(alertMsg, 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete education
export const deleteEducation= id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
   const isConfirmed = window.confirm('Are you sure? This can NOT be undone!');

   if (isConfirmed) {
       try {
           await axios.delete(`/api/profile`);

           dispatch({type: CLEAR_PROFILE});
           dispatch({type: DELETE_ACCOUNT});

           dispatch(setAlert('Your account has been permanently deleted'));

       } catch (err) {
           dispatch({
               type: PROFILE_ERROR,
               payload: {msg: err.response.statusText, status: err.response.status}
           });
       }
   }
};