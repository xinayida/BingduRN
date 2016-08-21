'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} = React;

var Icon = require('react-native-vector-icons/Foundation');//FontAwesome

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  // icon: {
  //   width: 30,
  //   height: 30,
  //   position: 'absolute',
  //   top: 0,
  //   left: 20,
  // },
  // tab: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingBottom: 10,
  // },
  // tabs: {
  //   height: 45,
  //   flexDirection: 'row',
  //   paddingTop: 5,
  //   borderWidth: 1,
  //   borderTopWidth: 0,
  //   borderLeftWidth: 0,
  //   borderRightWidth: 0,
  //   borderBottomColor: 'rgba(0,0,0,0.05)',
  //   backgroundColor:"#e32524"
  // },
  icon: {
    position: 'absolute',
    // top: 0,
    // right: 0,
  },
  iconTab: {
    flex : 1,
  },
  labelText:{
    // position: 'absolute',
    top: 20,
    flex : 1,
    fontSize: 8,
    opacity: 0.5,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'gray'
  }
});

var CustomTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(valsString, page) {
    // console.log("renderTabOption", valsString);
    var vals = valsString.split('!$#');
    var isTabActive = this.props.activeTab === page;
    return (
      <TouchableOpacity key={valsString} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Icon name={vals[1]} 
              size={parseInt(vals[2])}
              color={'gray'} />
        <Text style={styles.labelText}>
          {vals[0]}
        </Text>
      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({opacity: value - i});
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({opacity: i - value});
      }
    });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: '#FF6600',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={styles.separator}/>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});


 var FacebookTabBar = React.createClass({
  // selectedTabIcons: [],
  unselectedTabIcons: [],
  tabTextOpt:[],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(valsString, page) {
    var vals = valsString.split('!$#');
    var name = vals[1];
    // console.log("renderTabOption name: ", name);
    var isTabActive = this.props.activeTab === page;
    this.tabTextOpt[page] = isTabActive ? 0 : 1;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
         <View style={styles.iconTab}>
          <Icon name={name} size={parseInt(vals[2])} color='#fff' style={styles.icon}
                />
          <Icon name={name} size={parseInt(vals[2])} color='#5b0e0d' style={styles.icon}
                ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
        <Text style={styles.labelText}>
          {vals[0]}
        </Text>
        </View>

      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {

        this.tabTextOpt[i] = value - i;
        iconRef.setNativeProps({ style: {opacity: value - i} });
      }
      if (i - value >= 0 &&  i - value <= 1) {

        this.tabTextOpt[i] = i - value;
        iconRef.setNativeProps({ style: {opacity: i - value} });
      }
    });

    // this.tabTextOpt.forEach((i) => {
    //     if (value - i >= 0 && value - i <= 1) {

    //     }
    //     if (i - value >= 0 &&  i - value <= 1) {
        
    //     }
    //   });
    // }
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: '#fff',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={[styles.tabs, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

module.exports = FacebookTabBar;//CustomTabBar;
