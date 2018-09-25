import { NewExpenseAddClicked } from "../actions/actions";


const initialState = {
    isLoading: false,
    expenses: []
}

export default ExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case NewExpenseAddClicked:
            return state;
        case 'NEW_EXPENSE':
            return state;
        case 'UPDATE_EXPENSE_LIST':
            const data = action.payload;
            const newDate = [];
            Object.keys(data).forEach((item) => {
                newDate.push({ key: item, data: data[item] })
            });
            return { ...state, expenses: newDate };
        default:
            return state;
    }
    return state;
};
