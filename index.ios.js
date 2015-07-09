/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var moment = require('moment');

var NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod?concept_tags=True&api_key='+NASA_API_KEY;
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} = React;

var NASA = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      //console.log(this.state.dataSource);
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPic}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style= {styles.container}>
        <Text>
          Loading Image...
        </Text>
      </View>
    );
  },

  fetchData: function() {
    var results = [];
    for(var i=0; i<11; i++) {
      var date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      this.queryAPOD(results, date);
    };
  },

  queryAPOD: function(results, date) {
    fetch(NASA_APOD_URL+'&date='+date)
    .then((response) => response.json())
    .then((responseData) => {
      results.push({ date: date, responseData: responseData });
      if(results.length === 11) {
        results.sort(this.order);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(results),
          loaded: true,
        });
      }
    })
    .done();
  },

  order: function(a, b) {
    return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0);
  },

  renderPic: function(result) {
    var data = result.responseData;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: data.url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{result.date}: {data.title}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      borderBottomWidth: 0.3,
      borderColor: '#ABCABC',
    },
  rightContainer: {
      flex: 1,
    },
  title: {
      fontSize: 14,
      textAlign: 'center',
    },
  year: {
      textAlign: 'center',
    },
  thumbnail: {
      width: 91,
      height: 63,
      marginTop:10,
      marginBottom:10,
    },
  listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('NASA', () => NASA);
