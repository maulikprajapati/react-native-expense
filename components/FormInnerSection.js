import React from 'react';
import { View } from 'react-native';
export default ({ children, ...props }) => {

    return (
        <View {...props} style={style.container} >{children}</View>)
}

const style = {
    container: {
        marginTop: 10,
        marginBottom: 10
    }
}