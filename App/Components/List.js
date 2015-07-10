var React = require('react-native');
var Detail = require('./Detail');
var moment = require('moment');

var NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod?concept_tags=True&api_key='+NASA_API_KEY;

var {
  View,
  Image,
  Text,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#D8D0C8',
  },
  title: {
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomWidth: 1,
    //borderTopWidth: 1,
    //borderBottomColor: 'white',
    //borderTopColor: 'gray',
  },
  rightContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 5,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    marginRight: 3,
    marginLeft: 3,
    color: '#FFFFFF',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 63,
    height: 36,
    marginTop:6,
    marginBottom:6,
    marginLeft:6,
  },
  listView: {
    paddingTop: 3,
    backgroundColor: 'lightgray',
  },
});

var List = React.createClass({
  goToDetail() {
    this.props.navigator.push({
      component: Detail,
      title: 'Detail',
    });
  },
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
    for(var i=0; i<10; i++) {
      var date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      this.queryAPOD(results, date);
    };
  },

  queryAPOD: function(results, date) {
    fetch(NASA_APOD_URL+'&date='+date)
    .then((response) => response.json())
    .then((responseData) => {
      results.push({ date: date, responseData: responseData });
      if(results.length === 10) {
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
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableHighlight
            onPress={this.goToDetail.bind(this)}>
              <Text style={styles.title}>></Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
});

module.exports = List;
