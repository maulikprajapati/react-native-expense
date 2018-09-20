import React from 'react';
import { View } from 'react-native';
export default (props) => {
    return (
        <View style={style.container} >{props.children}</View>)
}

const style = {
    container: {
        marginTop: 10,
        marginBottom: 10
    }
}