import AddExpense from "../components/AddExpenseScreen";

const initialState = {
    isLoading: false
}

export default ExpenseReducer = (state = initialState, action) => {
    console.log('IN REDUCER', action.type);
    switch (action.type) {
        case AddExpense:
            return state;
        case 'NEW_EXPENSE':
            console.log("ADDEDD SUCCESSFULLY");
            return state;

        default:
            return state;
    }
    return state;
};
