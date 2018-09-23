import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import rootReducer from './reducers';
import dbConfig from './config/db';
import reduxThunk from 'redux-thunk';
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

export default class App extends React.Component {
  componentDidMount = () => {
    firebase.initializeApp(dbConfig);
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
