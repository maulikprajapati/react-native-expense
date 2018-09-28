import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OnLogin, onAuthInputChange, getAuthToken } from '../actions/authActions';
import FormInnerSection from './FormInnerSection';
import { Container, Header, Content, Item, Input, Form, Label, Button, Icon } from 'native-base';
class LoginPage extends Component {
    constructor() {
        super();
    }

    componentWillMount = () => {
        this.props.getAuthToken();
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.authToken) {
            this.props.navigation.navigate('App');
        }
    }
    showButton() {
        if (this.props.isLoading) {
            return (
                <View>
                    <ActivityIndicator style={{ alignContent: 'flex-start' }} size="small" color="#00ff00" />
                </View>
            );
        }
        return <Text style={{ color: '#fff' }}>Login</Text>;
    }

    showError() {
        if (this.props.error) {
            return (
                <FormValidationMessage>
                    {this.props.error}
                </FormValidationMessage>
            )
        }
        return null;
    }

    render() {
        return (
            // <View>
            //     <FormInnerSection>
            //         <FormInput placeholder="Email"
            //             value={this.props.email}
            //             inputStyle={styles.inputPadder}
            //             onChangeText={text => this.props.inputChange({ field: 'email', value: text })} />
            //     </FormInnerSection>
            //     <FormInnerSection>
            //         <FormInput placeholder="Password" secureTextEntry={true}
            //             value={this.props.password}
            //             inputStyle={styles.inputPadder}
            //             onChangeText={text => this.props.inputChange({ field: 'password', value: text })}
            //         />
            //     </FormInnerSection>

            //     {this.showError()}

            //     <FormInnerSection>
            //         {this.showButton()}
            //     </FormInnerSection>
            // </View>

            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                value={this.props.email}
                                onChangeText={text => this.props.inputChange({ field: 'email', value: text })} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                value={this.props.password}
                                inputStyle={styles.inputPadder}
                                onChangeText={text => this.props.inputChange({ field: 'password', value: text })}
                            />
                        </Item>
                    </Form>
                    <Button style={{ marginTop: 30, width: '90%', left: '10%' }} block primary
                        onPress={() => { this.props.login({ email: this.props.email, password: this.props.password }); }}>
                        {this.showButton()}
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    isLoading: state.auth.isLoading,
    authToken: state.auth.authToken,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(OnLogin, dispatch),
    inputChange: bindActionCreators(onAuthInputChange, dispatch),
    getAuthToken: bindActionCreators(getAuthToken, dispatch),
});

const styles = {
    inputPadder: {
        paddingLeft: 5
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
