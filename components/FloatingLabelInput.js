import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated, StyleSheet } from 'react-native';

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const { keyName, label, ...props } = this.props;
        const labelStyle = {
            position: 'absolute',
            zIndex: -1,
            left: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 0],
            }),
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#1976d2'],
            }),
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    onChangeText={(value) => props.onChangeText(keyName, value)}
                    style={styles.floatingInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
            </View>
        );
    }
}

export default FloatingLabelInput;

const styles = StyleSheet.create({
    floatingInput: {
        // height: 26,
        width: 300,
        fontSize: 18,
        color: '#000',
        borderWidth: 1,
        borderColor: '#00000032',
        padding: 10,
        borderRadius: 3,
        marginBottom: 2
    },
});