import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyloginPage from './component/login';
//import Profile from './component/Profile';
import MainScreen from './screen/mainScreen';
export default function App() {
  return (
      <MainScreen></MainScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
