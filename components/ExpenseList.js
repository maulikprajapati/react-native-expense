import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import _ from 'lodash';
import * as firebase from 'firebase';
import config from '../config/db';
const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    }];
export class ExpenseList extends Component {

    componentDidMount() {
        console.log('In Here', firebase)
        const { uid } = firebase.auth().currentUser;
        console.log('id =============> ', uid)
        return firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .on('value', (snapshot) => {
                let returnArr = [];
                snapshot.forEach((childSnapshot) => {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log(_.groupBy(returnArr, 'date'));
            })
    }

    render() {
        return (
            <List containerStyle={{ marginTop: 0 }}>
                <ListItem
                    title={'Appointments'}
                    leftIcon={{ name: 'av-timer' }}
                />
                <ListItem
                    title={'Trips'}
                    leftIcon={{ name: 'flight-takeoff' }}
                />
                <ListItem
                    title={'Appointments'}
                    leftIcon={{ name: 'av-timer' }}
                />
                <ListItem
                    title={'Trips'}
                    leftIcon={{ name: 'flight-takeoff' }}
                />
            </List>
        )
    }
}

export default ExpenseList;
