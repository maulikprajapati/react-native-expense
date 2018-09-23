import { NewExpenseAddClicked } from "./actions";
import firebase from 'firebase';
export const AddNewExpense = ({ date, amount, description }) => {
    const { uid } = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .push({ date, amount, description })
            .then(() => dispatch({ type: 'NEW_EXPENSE' }));
    }
}