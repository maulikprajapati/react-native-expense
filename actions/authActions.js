import { Login } from "./actions";
import firebase from 'firebase';

export const onAuthInputChange = ({ field, value }) => {
    return {
        type: 'AUTH_INPUT_CHANGE',
        payload: { field, value }
    };
}

export const OnLogin = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: Login });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: 'LOGIN_FAILURE', payload: error });
            });
    }
}