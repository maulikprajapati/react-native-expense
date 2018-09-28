import { Login } from '../actions/actions';

const initialState = {
    email: '',
    password: '',
    isLoading: false,
    user: '',
    error: '',
    expiresIn: 0,
    authToken: '',
    uid: '',
}

export default AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Login:
            return { ...state, isLoading: true };
        case "SET_AUTH_TOKEN":
            const now = new Date();
            const expiresIn = now.getTime() + action.payload.expiresIn * 1000;
            const data = action.payload;
            return { ...state, authToken: data.idToken, expiresIn, uid: data.localId, isLoading: false };
        case "LOGIN_FAILURE":
            return { ...state, isLoading: false, error: 'Authentication Failed' };
        case 'AUTH_INPUT_CHANGE':
            return { ...state, [action.payload.field]: action.payload.value }
        case 'SKIP_LOGIN':
            return { ...state, authToken: action.payload.tokenData, uid: action.payload.uid }
        default:
            return state;
    }
    return state;
}