import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateExpenseList } from '../actions/expenseActions';
import { FlatList, StyleSheet, View } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
class ExpenseList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.updateExpenseList();
    }


    renderItem = ({ item }) => {
        if (item.header) {
            return (
                <View>
                    <ListItem itemDivider>
                        <Body>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.date}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{ marginLeft: 0, backgroundColor: '#fff' }}>
                        <Body>
                            <Text>{item.description}</Text>
                        </Body>
                        <Right>
                            <Text>{item.amount}</Text>
                        </Right>
                    </ListItem>
                </View>
            );
        } else if (!item.header) {
            return (
                <ListItem style={{ marginLeft: 0, backgroundColor: '#fff' }}>
                    <Body>
                        <Text>{item.description}</Text>
                    </Body>
                    <Right>
                        <Text>{item.amount}</Text>
                    </Right>
                </ListItem>
            );
        }
    };
    render() {
        return (
            <FlatList
                data={this.props.expenses}
                renderItem={this.renderItem}
                keyExtractor={item => item.key}
                stickyHeaderIndices={this.props.stickyHeaderIndices}
            />
        );
    }
}

const mapStateToProps = state => ({
    expenses: state.expense.expenses,
    stickyHeaderIndices: state.expense.stickyHeaderIndices
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
