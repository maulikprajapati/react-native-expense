import { Login } from "./actions";
import config from '../config/db';
import { AsyncStorage } from 'react-native';
export const onAuthInputChange = ({ field, value }) => {
    return {
        type: 'AUTH_INPUT_CHANGE',
        payload: { field, value }
    };
}

const setAuthToken = (data) => {
    return {
        type: 'SET_AUTH_TOKEN',
        payload: data
    }
}

export const OnLogin = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: Login });
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${config.apiKey}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })
            .then((res) => res.json())
            .then(data => {
                const arrPromise = [];
                const tokenPromise = AsyncStorage.setItem('de:auth:token', data.idToken);
                const uidPromise = AsyncStorage.setItem('de:auth:email', data.localId);
                const refreshTokenPromise = AsyncStorage.setItem('de:auth:refreshToken', data.RefreshToken);
                arrPromise.push([tokenPromise, uidPromise, refreshTokenPromise])
                Promise.all(arrPromise).then(() => {
                    dispatch(setAuthToken(data));
                }).catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log('InError', err);
                dispatch({ type: 'LOGIN_FAILURE', payload: err });
            });
    }
}

export const getAuthToken = () => {
    return (dispatch, getState) => {
        const token = getState().auth.authToken;
        if (!token) {
            const arrPromise = [];
            arrPromise.push(AsyncStorage.getItem('de:auth:token'));
            arrPromise.push(AsyncStorage.getItem('de:auth:email'));
            Promise.all(arrPromise)
                .then((data) => {
                    dispatch({
                        type: 'SKIP_LOGIN',
                        payload: { tokenData: data[0], uid: data[1] }
                    });
                })
                .catch(err => {
                });
        }
    }
}