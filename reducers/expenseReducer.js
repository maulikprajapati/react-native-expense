import { NewExpenseAddClicked } from "../actions/actions";


const initialState = {
    isLoading: false,
    stickyHeaderIndices: [],
    expenses: [],
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
            let arr = [];
            let arrDates = [];
            data.map((item, index) => {
                debugger
                if (index === 0) {
                    item.header = true;
                    arrDates.push(item.date);
                    arr.push(index);
                } else {
                    if (arrDates.indexOf(item.date) > -1) {
                        item.header = false;
                    } else {
                        item.header = true;
                        arrDates.push(item.date);
                        arr.push(index);
                    }
                }
            });
            arr.push(0);
            return { ...state, expenses: data, stickyHeaderIndices: arr };
        default:
            return state;
    }
    return state;
};
