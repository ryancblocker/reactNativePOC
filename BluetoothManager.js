import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  useEffect(() => {
    BleManager.start({ showAlert: false });

    // Listen for Bluetooth events
    const handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral
    );

    return () => {
      handlerDiscover.remove();
    };
  }, []);

  const handleDiscoverPeripheral = (peripheral) => {
    console.log('Discovered peripheral:', peripheral);
  };

  const startScan = () => {
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning...');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View>
      <Text>React Native BLE Manager</Text>
      <Button title="Start Scan" onPress={startScan} />
    </View>
  );
};

export default App;