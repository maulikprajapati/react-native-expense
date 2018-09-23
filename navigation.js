import { createStackNavigator } from 'react-navigation';
import LoginPage from './components/LoginPage';
import { ExpenseList } from './components/ExpenseList';
import { Icon } from 'react-native-elements';
import React from 'react';
import AddExpense from './components/AddExpenseScreen';

export default createStackNavigator({
    Auth: {
        screen: LoginPage,
        navigationOptions: {
            headerTitle: 'Login'
        }
    },
    App: {
        screen: ExpenseList,
        navigationOptions: (navigation) => ({
            title: 'Expenses',
            headerRight: (<Icon
                type='evilicon'
                name='plus'
                size={30}
                onPress={() => { navigation.navigation.navigate('AddExpense') }}
            />),
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#3bd3d4'
            },
            gesturesEnabled: true
        }),
        
    },

    AddExpense: {
        screen: AddExpense,
        navigationOptions: (navigation) => ({
            title: 'Add Expenses',
            headerRight: null,
            headerStyle: {
                backgroundColor: '#3bd3d4'
            },
            gesturesEnabled: true
        })
    }
},
    {
        initialRouteName: 'Auth'
    }
);