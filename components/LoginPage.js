import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OnLogin, onAuthInputChange } from '../actions/authActions';
import FormInnerSection from './FormInnerSection';

class LoginPage extends Component {
    componentWillReceiveProps = (nextProps) => {
        console.log('usererrrrrrrrrrrrrr', nextProps.user)
        if (nextProps.user) {
            this.props.navigation.navigate('App');
        }
    }
    showButton() {
        if (this.props.isLoading) {
            return (
                <View>
                    <ActivityIndicator size={'small'} />
                </View>
            );
        }
        return (<Button title="Login"
            backgroundColor={'#3bd3d4'}
            onPress={() => { this.props.login({ email: this.props.email, password: this.props.password }); }}>
        </Button>);
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
            <View>
                <FormInnerSection>
                    <FormInput placeholder="Email"
                        value={this.props.email}
                        inputStyle={styles.inputPadder}
                        onChangeText={text => this.props.inputChange({ field: 'email', value: text })} />
                </FormInnerSection>
                <FormInnerSection>
                    <FormInput placeholder="Password" secureTextEntry={true}
                        value={this.props.password}
                        inputStyle={styles.inputPadder}
                        onChangeText={text => this.props.inputChange({ field: 'password', value: text })}
                    />
                </FormInnerSection>

                {this.showError()}

                <FormInnerSection>
                    {this.showButton()}
                </FormInnerSection>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(OnLogin, dispatch),
    inputChange: bindActionCreators(onAuthInputChange, dispatch)
});

const styles = {
    inputPadder: {
        paddingLeft: 5
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
