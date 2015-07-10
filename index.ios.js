/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
var NASA = React.createClass({
  render() {
    return (
      <NavigatorIOS
        barTintColor='#FFF8F2'
        tintColor='black'
        style={styles.container}
        initialRoute={{
          title: 'Home',
          component: Main
        }}
      />
    );
  }
});


AppRegistry.registerComponent('NASA', () => NASA);
