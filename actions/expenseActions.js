import firebase from 'firebase';
import * as _ from 'lodash';
import { convertStringToDate } from "../helper/common";
export const AddNewExpense = ({ date, amount, description }) => {
    return (dispatch, getState) => {
        const { uid } = getState().auth;
        console.log(uid);
        firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .push({ date, amount, description })
            .then(() => dispatch({ type: 'NEW_EXPENSE' }));
    }
}

export const UpdateExpenseList = () => {
    return (dispatch, getState) => {
        const { uid, authToken } = getState().auth;
        firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .on('value', (snapshot) => {
                console.log('heyyyyyyyyyy')
                let returnArr = [];
                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });

                dispatch({
                    type: "UPDATE_EXPENSE_LIST",
                    payload: _.orderBy(returnArr, (value) => (convertStringToDate(value.date)))
                });
            });
        // console.log(authToken);
        // fetch(`https://daily-expense-management.firebaseio.com/daily-expense-management/${uid}/expenses.json`,
        //     {
        //         method: 'GET'
        //     }).then(res => res.json())
        //     .then((data) => {
        //         console.log('dataaaaaaaaaa', data);
        //         dispatch({
        //             type: "UPDATE_EXPENSE_LIST",
        //             payload: _.orderBy(data, (value) => (convertStringToDate(value.date)))
        //         });
        //     })
        //     .catch(err => {
        //         console.log('errrrrr', err);
        //     })
    }
}