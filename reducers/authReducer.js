import { Login } from '../actions/actions';
const initialState = {
    email: '',
    password: '',
    isLoading: false,
    user: '',
    error: ''
}

export default AuthReducer = (state = initialState, action) => {
    console.log('IN REDUCER', action.type);
    
    switch (action.type) {
        case Login:
            return { ...state, isLoading: true };
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload.user, isLoading: false };
        case "LOGIN_FAILURE":
            return { ...state, isLoading: false, error: 'Authentication Failed' };
        case 'AUTH_INPUT_CHANGE':
            return { ...state, [action.payload.field]: action.payload.value }

        default:
            return state;
    }
    return state;
}