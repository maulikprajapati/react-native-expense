import React, { Component } from 'react'
import { Text, View, SectionList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateExpenseList } from '../actions/expenseActions';
import { ListItem, List } from 'react-native-elements';

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    }];
class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = { expenses: [] }
    }
    componentDidMount() {
        this.props.updateExpenseList();
    }



    _renderItem = ({ item, section }) => {
        console.log(item);
        return <List containerStyle={{ marginTop: 0 }}>
            <ListItem
                title={item.description}
                subtitle={item.amount}
            />
        </List>
        // <Text style={{ backgroundColor: '#fff', borderBottomWidth: 1, height: 30 }}>{`${item.description}`}</Text>;
    }

    _renderSectionHeader = ({ section }) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.header}>{section.key}</Text>
            </View>
        )
    }


    render() {
        if (!this.props.expenses) {
            return (<View><Text>Loading...</Text></View >)
        }
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.props.expenses}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    expenses: state.expense.expenses
});

const mapDispatchToProps = dispatch => ({
    updateExpenseList: bindActionCreators(UpdateExpenseList, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#ecf0f1',
    },
    sectionHeader: {
        height: 25,
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 5
    },
    header: {
        fontSize: 10,
    }
});
