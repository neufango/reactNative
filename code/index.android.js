/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fingerprint from 'react-native-fingerprint-android';
import { ToastAndroid as Toast } from 'react-native';
import Camera from 'react-native-camera';
import {
  AppRegistry,
  StyleSheet,
    Dimensions,
  Text,
    Button,
    Alert,
  View
} from 'react-native';
const barCodeReaded=(data)=>{
    Alert.alert('Hello 2',`Barcode read:${data.data} && ${data.barCodeType}`);
    console.log(data);
};
const onButtonPress = () => {
  
    (async() => {
    const hardware = await Fingerprint.isHardwareDetected();
    const permission = await Fingerprint.hasPermission();
    const enrolled = await Fingerprint.hasEnrolledFingerprints();

    if (!hardware || !permission || !enrolled) {
        let message = !enrolled ? 'No fingerprints registered.' : !hardware ? 'This device doesn\'t support fingerprint scanning.' : 'App has no permission.'
        Toast.show(message, Toast.SHORT);
        return;
    }else{
        Alert.alert('Please put your finger on your finger print sensor');
    }

    try {
        await Fingerprint.authenticate(warning => {
            Toast.show(`Try again: ${warning.message}`, Toast.SHORT);
        });
    } catch(error) {
        Toast.show(`Authentication aborted: ${error.message}`, Toast.SHORT);
    }

    Toast.show("Auth successful!", Toast.SHORT);
})();
};
export default class hello5 extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Button
          onPress={onButtonPress}
          title="Press Me"
        
          accessibilityLabel="See an informative alert"
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={barCodeReaded}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        
        </Camera>
      </View>
       
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('hello5', () => hello5);
