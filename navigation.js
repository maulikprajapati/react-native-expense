import { createStackNavigator } from 'react-navigation';
import LoginPage from './components/LoginPage';
import { ExpenseList } from './components/ExpenseList';


export default createStackNavigator({
    Auth: {
        screen: LoginPage,
        navigationOptions: {
            headerTitle: 'Login'
        }
    },
    App: {
        screen: ExpenseList,
        navigationOptions: {
            headerTitle: 'Expenses',
            headerLeft: null
        }
    }
},
    {
        initialRouteName: 'Auth'
    }
);