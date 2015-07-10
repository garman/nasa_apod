var React = require('react-native');
var List = require('./List');

var {
  View,
  Text,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#D8D0C8',
  },
  title: {
  },
});

var Main = React.createClass({
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  },
  goToList() {
    this.props.navigator.push({
      component: List,
      title: 'Last 10',
    })
  },
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToList.bind(this)}
          underlayColor='red'>
            <Text style={styles.title}> TESTING </Text>
        </TouchableHighlight>
      </View>
    )
  }
});

module.exports = Main;
