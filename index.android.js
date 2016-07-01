/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Dimensions,
  BackAndroid,
  Navigator,
  WebView,
  Text,
  View,
} = React;


var ScrollableTabView = require('react-native-scrollable-tab-view');
//var InTheatersPage = require('./InTheatersPage');
//var DetailScreen = require('./DetailScreen');
var DetailView = require('./DetailView');
//var HomeScreen = require('./HomeScreen')
var NewsPage = require('./NewsPage');
var Dashboard = require('./src/views/Dashboard');

var deviceWidth = Dimensions.get('window').width;
 
var _navigator;

BackAndroid.addEventListener('hardwareBackPress',() => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1){
    _navigator.pop();
    return true;
  }
  return false;
});
  // return <HomeScreen navigator={navigationOperations} />
var RouteMapper = function(route, navigationOperations, onComponentRef){
  _navigator = navigationOperations;
  if(route.name === 'home'){
      // return <NewsPage navigator={navigationOperations} />
      return <Dashboard navigator={navigationOperations}/>
  }else if(route.name === 'detail'){
    console.log("news: " + JSON.stringify(route.news));
    return <DetailView navigator={navigationOperations}
              news={route.news} 
              title={route.title} />
  }
};

var TestRN = React.createClass({
  render() {
    var initialRoute = {name: 'home'};
    return (
      <Navigator
        style = {styles.container}
        initialRoute = {initialRoute}
        configureScreen = {() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper} />
    /*  <ScrollableTabView> 
     <InTheatersPage style={{flex: 1, width: deviceWidth}} navigator={this.props.navigator} url={"https://api.douban.com/v2/movie/in_theaters"} tabLabel="正在热映" />
        <Text tabLabel="Flow" > Page 2</Text>
        <Text tabLabel="Jest" > Page 3</Text>
      </ScrollableTabView>*/
      );
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Welcome to React Native!
    //     </Text>
    //     <Text style={styles.instructions}>
    //       To get started, edit index.android.js
    //     </Text>
    //     <Text style={styles.instructions}>
    //       Shake or press menu button for dev menu
    //     </Text>
    //   </View>
    // );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
});

AppRegistry.registerComponent('TestRN', () => TestRN);
