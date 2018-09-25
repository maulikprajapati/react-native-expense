import { NewExpenseAddClicked } from "./actions";
import firebase from 'firebase';
import * as _ from 'lodash';
export const AddNewExpense = ({ date, amount, description }) => {
    const { uid } = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .push({ date, amount, description })
            .then(() => dispatch({ type: 'NEW_EXPENSE' }));
    }
}

export const UpdateExpenseList = () => {
    return (dispatch) => {
        const { uid } = firebase.auth().currentUser;
        firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .on('value', (snapshot) => {
                let returnArr = [];
                snapshot.forEach((childSnapshot) => {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                dispatch({
                    type: "UPDATE_EXPENSE_LIST",
                    payload: _.groupBy(returnArr, 'date')
                });
            });
    }
}