import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Keyboard } from 'react-native';
import FormInnerSection from './FormInnerSection';
import { FormInput, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { checkNumericOnlyType, getFormattedDate, convertStringToDate } from '../helper/common';
import { connect } from 'react-redux';
import { AddNewExpense } from '../actions/expenseActions';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const today = getFormattedDate(date);
        this.state = {
            date: today,
            isDateTimePickerVisible: false,
            amount: '',
            datePickerValue: new Date(),
            description: ''
        };
    }
    _showDateTimePicker = () => this.setState({ ...this.state, isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ ...this.state, isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            ...this.state,
            date: getFormattedDate(new Date(date))
        });
        this._hideDateTimePicker();
    };

    inputChange({ field, value }) {
        if (field === 'amount' && !checkNumericOnlyType(value)) {
            return;
        }
        this.setState({
            ...this.state,
            [field]: value
        });
    }

    openPicker() {
        const currentSelectedDate = this.state.date.split('/');
        setTimeout(() => {
            this.setState({
                datePickerValue: new Date(`${currentSelectedDate[2]}-${currentSelectedDate[1]}-${currentSelectedDate[0]}`)
            });
            this._showDateTimePicker();
        }, 0);
        setTimeout(() => {
            Keyboard.dismiss();
        }, 100);
    }

    AddNewExpense() {
        const { date, amount, description } = this.state;
        // this.props.AddNewExpense({ date, amount, description });
        const { uid } = firebase.auth().currentUser;
       return firebase.database().ref(`/daily-expense-management/${uid}/expenses`)
            .push({ date, amount, description })
            .then(() => console.log('added'));
    }
    render() {
        return (
            <View>
                <FormInnerSection>
                    <FormInput placeholder="Expense Date"
                        value={this.state.date}
                        inputStyle={styles.inputPadder}
                        onTouchStart={() => this.openPicker()}
                    />
                </FormInnerSection>
                <FormInnerSection>
                    <FormInput placeholder="Enter Amount"
                        keyboardType='numeric'
                        value={`${this.state.amount}`}
                        inputStyle={styles.inputPadder}
                        onChangeText={text => this.inputChange({ field: 'amount', value: text })}
                    />
                </FormInnerSection>
                <FormInnerSection>
                    <FormInput placeholder="Enter Description"
                        value={`${this.state.description}`}
                        inputStyle={styles.inputPadder}
                        multiline={true}
                        maxLength={160}
                        onChangeText={text => this.inputChange({ field: 'description', value: text })}
                    />
                </FormInnerSection>
                <FormInnerSection>
                    <Button
                        title={'Add'}
                        backgroundColor={'#3bd3d4'}
                        onPress={() => this.AddNewExpense()} />
                </FormInnerSection>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(date) => this._handleDatePicked(date)}
                    date={this.state.datePickerValue}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputPadder: {
        paddingLeft: 5
    }
});

// const mapDispatchToProps = dispatch => ({
//     AddNewExpense: bindActionCreators(AddNewExpense, dispatch)
// });
// export default connect(null, mapDispatchToProps)(AddNewExpense);