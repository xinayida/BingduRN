'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ViewPagerAndroid,
} = ReactNative;

import { ViewPagerScrollState } from 'ViewPagerAndroid';
import Utils from './utils';

var PAGES = 5;
var BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
var IMAGE_URIS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
];

var LikeCount = React.createClass({
  getInitialState: function() {
    return {
      likes: 7,
    };
  },

  onClick: function() {
    this.setState({likes: this.state.likes + 1});
  },
  render: function() {
    var thumbsUp = '\uD83D\uDC4D';
    return (
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={this.onClick} style={styles.likeButton}>
          <Text style={styles.likesText}>
            {thumbsUp + ' Like'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.likesText}>
          {this.state.likes + ' likes'}
        </Text>
      </View>
    );
  },
});

var Button = React.createClass({
  _handlePress: function() {
    if (this.props.enabled && this.props.onPress) {
      this.props.onPress();
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

var ProgressBar = React.createClass({
  render: function() {
    var fractionalPosition = (this.props.progress.position + this.props.progress.offset);
    // var progressBarSize = (fractionalPosition / (PAGES - 1)) * this.props.size;
    var progressBarSize = this.props.size/(PAGES);
    var left = (fractionalPosition / (PAGES - 1)) * this.props.size;
    return (
      <View style={[styles.progressBarContainer, {width: (this.props.size + progressBarSize)}]}>
        <View style={[styles.progressBar, {width: progressBarSize, left: left}]}/>
      </View>
    );
  }
});

var ViewPagerAndroidExample = React.createClass({
  statics: {
    title: '<ViewPagerAndroid>',
    description: 'Container that allows to flip left and right between child views.'
  },
  getInitialState: function() {
    return {
      page: 0,
      animationsAreEnabled: true,
      pages: [],
      progress: {
        position: 0,
        offset: 0,
      },
    };
  },
  componentDidMount(){
    var pages = [];
    for (var i = 0; i < PAGES; i++) {
      var pageStyle = {
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        padding: 20,
      };
      pages.push(
        <View key={i} style={pageStyle} collapsable={false}>
          <Image
            style={styles.image}
            source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
          />
       </View>
      );
    }
    // this.setState({pages:pages});
    // setInterval(() => this.setState({page}),1000);
    setTimeout(() => this.setState({pages}),500);
  },
  onPageSelected: function(e) {
    this.setState({page: e.nativeEvent.position});
  },

  onPageScroll: function(e) {
    this.setState({progress: e.nativeEvent});
  },

  onPageScrollStateChanged: function(state : ViewPagerScrollState) {
    this.setState({scrollState: state});
  },

  move: function(delta) {
    var page = this.state.page + delta;
    this.go(page);
  },

  go: function(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }
    this.setState({page});
  },

  render: function() {
    // var pages = [];
    // for (var i = 0; i < PAGES; i++) {
    //   var pageStyle = {
    //     backgroundColor: BGCOLOR[i % BGCOLOR.length],
    //     alignItems: 'center',
    //     padding: 20,
    //   };
    //   pages.push(
    //     <View key={i} style={pageStyle} collapsable={false}>
    //       <Image
    //         style={styles.image}
    //         source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
    //       />
    //    </View>
    //   );
    // }
    // var { page, animationsAreEnabled } = this.state;

    var height = Utils.size.height/3;
    var width = Utils.size.width;
    return (
      <View style={{height:height, width:width}}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          pageMargin={10}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {this.state.pages}
        </ViewPagerAndroid>
       <View style={styles.buttons}>
          <ProgressBar size={100} progress={this.state.progress}/>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});

module.exports = ViewPagerAndroidExample;