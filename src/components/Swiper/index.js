'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PropTypes,
  Animated,
  View,
  ViewPagerAndroid,
} = ReactNative;


import { ViewPagerScrollState } from 'ViewPagerAndroid';
import DefaultSwiperIndicator from './DefaultSwiperIndicator';


var Swiper = React.createClass({
  propTypes: {
    ...View.propTypes,
    renderPageIndicator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
  },

  getInitialState: function() {
    return {
      currentPage: 0,
      progress: {
        position: 0,
        offset: 0,
      },
      curPage: 0,
      animationsAreEnabled: true,
      // scrollValue: new Animated.Value(0),
      pages: [],
    };
  },
  go: function(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }

    this.setState({page});
  },
  componentDidMount(){
    var pages = [];
    var imgUrls = this.props.imgUrls;
    for (var i = 0; i < imgUrls.length; i++) {
      pages.push(
        <View key={i} style={{alignItems: 'center'}} collapsable={false}>
          <Image style={{height:this.props.size.height, width:this.props.size.width}} source={{uri:imgUrls[i]}} />
        </View>
      );
    }
     setTimeout(() => this.setState({pages}),500);
  },
  render(){
  	// console.info("height:",this.props.size.height);
  	// console.info("width:",this.props.size.width);
  	// var pages = [];
  	// var imgUrls = this.props.imgUrls;
   //  for (var i = 0; i < imgUrls.length; i++) {
   //  	console.info("imgUrls[i]",imgUrls[i]);
   //    pages.push(
   //      <View key={i} style={{flex:1, alignItems: 'center', backgroundColor: 'green'}} collapsable={false}>
   //        <Image style={{height: this.props.size.height, width: this.props.size.width}} source={{uri: imgUrls[i]}} />
   //     	</View>
   //    );
  	// }
      return (
      	<View style={{backgroundColor: 'white', height: this.props.size.height, width: this.props.size.width}}>
	      	<ViewPagerAndroid
	          style={{flex:1}}
	          initialPage={0}
	          onPageScroll={this.onPageScroll}
	          onPageSelected={this.onPageSelected}
	          onPageScrollStateChanged={this.onPageScrollStateChanged}
	          pageMargin={0}
	          ref={viewPager => { this.viewPager = viewPager; }}>
	          {this.state.pages}
	        </ViewPagerAndroid>
             {this.renderPageIndicator({goToPage: this.go,
                    pageCount: this.props.imgUrls.length,
                    activePage: this.state.currentPage,
                    // scrollValue: this.state.scrollValue,
                    // scrollOffset: 0,
                    progress: this.state.progress,
                  })}
        </View>
      );
  },

  getCurrentPage() {
    return this.state.curPage;
  },
  onPageSelected: function(e) {
    this.setState({curPage: e.nativeEvent.position});
  },

  onPageScroll: function(e) {
    var p = e.nativeEvent;
    this.setState({progress: p});

    var fractionalPosition = (p.position + p.offset);
    var offset = (fractionalPosition / (this.props.imgUrls.length - 1));

    // var dx = p.offset;
    // var offsetX = -dx / this.state.viewWidth + this.state.currentPage;
    // this.state.scrollValue.setValue(offset);
  },

  onPageScrollStateChanged: function(state : ViewPagerScrollState) {
    // this.setState({scrollState: state});
  },

  renderPageIndicator(props) {
    if (this.props.renderPageIndicator === false) {
      return null;
    } else if (this.props.renderPageIndicator) {
      return React.cloneElement(this.props.renderPageIndicator(), props);
    } else {
      return (
        <View style={styles.indicators}>
          <DefaultSwiperIndicator {...props} />
        </View>
      );
    }
  },
});

var styles = StyleSheet.create({
  indicators: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

module.exports = Swiper;