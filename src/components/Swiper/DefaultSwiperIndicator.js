'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = ReactNative;

var deviceWidth = Dimensions.get('window').width;
var DOT_SIZE = 6;
var DOT_SAPCE = 4;
var indicators = [];

var styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#E0E1E2',
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE,
  },
  curDot2: {
    alignSelf: 'flex-start',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#80ACD0',
    margin: DOT_SAPCE,
  },
  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#80ACD0',
    margin: DOT_SAPCE,
    bottom: 0,
  },
});

var DefaultSwiperIndicator = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    pageCount: React.PropTypes.number,
  },

  getInitialState() {
    return {
      viewWidth: 0,
    };
  },

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={styles.dot} />
      </TouchableOpacity>
    );
  },

  render() {
    var pageCount = this.props.pageCount;
    var itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2;// + itemWidth * this.props.activePage;
    console.log('offset',offset);
    // // var left = offset;

    // var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    // var left = this.props.scrollValue.interpolate({
    //   inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    // })

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i));
    }
    var pageCount = this.props.pageCount;
    // console.log('position',this.props.progress.position, 'offset',this.props.progress.offset);
    var fractionalPosition = (this.props.progress.position + this.props.progress.offset);
    // var progressBarSize = (fractionalPosition / (PAGES - 1)) * this.props.size;
    // var progressBarSize = this.props.size/(pageCount);
    var left = fractionalPosition * itemWidth + offset;
    // console.log('left',left);
    return (
      <View style={styles.tabs}
        onLayout={(event) => {
            var viewWidth = event.nativeEvent.layout.width;
            if (!viewWidth || this.state.viewWidth === viewWidth) {
              return;
            }
            this.setState({
              viewWidth: viewWidth,
            });
          }}>
        {indicators}
        <Animated.View style={[styles.curDot, {left}]}/>
      </View>
    );
  },
});
// {position: 'absolute',left: left, width:100, height:DOT_SIZE, backgroundColor: 'green'}
     //<Animated.View style={[styles.curDot, {left}]} />

module.exports = DefaultSwiperIndicator;