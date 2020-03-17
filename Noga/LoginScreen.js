import React, { Component } from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { AsyncStorage } from 'react-native';
import consts from "../src/modules/tools/client/hooks/consts"
import hooksFactory from "../src/modules/tools/client/hooks/HooksFactory"
import Auth from "../src/modules/auth/Auth"
import ValidateFields from '../src/modules/tools/ValidateFields'
import FloatingLabelInput from '../components/FloatingLabelInput.js'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@carmel6000.amitnet.org',
      password: 'E2PSzAmJ-5-ldKnl',
      emailOutput: '',
      passwordOutput: '',
      loginErr: ''
    };
    this.hooksRepository = hooksFactory.getRepository();
    this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_LOGIN, (x) => { console.log("hiiii from home screen", x) });
    this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_LOGIN, () => { console.log("hiiii shalva") });
  }

  async onLogin() {
    const { email, password } = this.state;

    console.log('Credentials', `${email} + ${password}`);
    let res = null;
    try {
      res = await Auth.login(email, password, null);
      if (!res.success) {
        this.setState({ loginErr: res.msg.error.msg });
        return;
      }
      else {
        this.setState({ loginErr: '' });
        this.props.navigation.navigate("Home")
      }
    } catch (err) { console.log("login err?", err); }
  }

  handleChange = (name, value) => {
    console.log("valuee", name)
    this.setState({ [name]: value })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
  
        <Text style={{ fontSize: 25 }}>Sign In</Text>

        <FloatingLabelInput
          label="Email *"
          keyName="email"
          value={this.state.email}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
        />

        <FloatingLabelInput
          label="Password *"
          keyName="password"
          value={this.state.password}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
          // secureTextEntry={true}
        />

        <Text style={{ fontSize: 15, height: 10, color: 'red' }}>{this.state.loginErr ? this.state.loginErr : ''}</Text>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.onLogin.bind(this)}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>

        <Text style={{ color: '#1976d2', marginTop: 10 }} onPress={() => navigate('registration')}>Not registered?</Text>

      </View>
    );
  }
}










const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  input: {
    // width: 200,
    // height: 44,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: 'black',
    // marginBottom: 10,
  },
  buttonContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 300,
  },
  signupButton: {
    backgroundColor: "#1976d2",
  },
  signUpText: {
    color: 'white',
  }
});
