'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ViewPagerAndroid,
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var TabBar = require("../../components/TabBar");

var api = require("../../network/api.js");

var RefreshableListView = require("../../components/RefreshableListView");

var NewsPage = require('../NewsPage');
var SubjectTitle = require('../SubjectTitle');//精选页标题栏
var Swiper = require('../../Swiper');

import ViewPage from '../../components/Swiper';
import Utils from '../../utils';

var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

module.exports = React.createClass({
	getInitialState: function(){
		return {
			topStoryIDS: null,
			lastIndex: 0,
      pages:[],
		};
	},
	render(){
		return (
			<TabBar structure={[
        {
          title: 'demo',
          iconName: 'cloud',
          renderContent: this.renderContent('demo',-1),
        },
				{
					title: "精选",
					iconName: 'list-thumbnails',
			    renderContent: this.renderContent('精选', 37),
				},
				 {
          title: '发现',
          iconName: 'eye',
          renderContent: this.renderContent('发现', 1),
        },
       
				]}
        selectedTab={0}
        activeTintColor={'#ff8533'}
        iconSize={20}
        onChangeTab = {this.onChangeTab}
        style = {{backgroundColor: '#FF6600'}}
        />
			);
	},

  renderContent(title, channelid){
    if(channelid == -1){
      return () => {
        // return (
        //   <Swiper/>
        //   );
        return(<ViewPage imgUrls={IMGS} size={{height:Utils.size.height/3, width:Utils.size.width}}/>);
        // var height = Utils.size.height/3;
        // var width = Utils.size.width;
        // return (
        //   <View style={{flexDirection:'column', backgroundColor: 'white', height: height, width: width}}>
        //     <ViewPagerAndroid
        //       style={{flex:1}}
        //       initialPage={0}
        //       pageMargin={0}
        //       ref={viewPager => { this.viewPager = viewPager; }}>
        //       {this.state.pages}
        //     </ViewPagerAndroid>
        //   </View>
        // );
      }
    } else {
     return () => {
      return (
        <View style={{flex:1}}>
          <ToolbarAndroid style={styles.toolbar}
                          title={title}
                          titleColor={'#FFFFFF'}/>
          <NewsPage navigator={this.props.navigator} channelid={channelid}/>
        </View>);
      }
    }
  },
	onChangeTab(tab){
		// console.log("onChangeTab: ", tab.i);
	},


	renderListViewRow: function(row, pushNavBarTitle){
      return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row, pushNavBarTitle)}>
            <View style={styles.rowContainer}>
                <Text style={styles.rowCount}>
                    {row.count}
                </Text>
                <View style={styles.rowDetailsContainer}>
                    <Text style={styles.rowTitle}>
                        {row.title}
                    </Text>
                    <Text style={styles.rowDetailsLine}>
                        Posted by {row.by} | {row.score} Points | {row.descendants} Comments
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </View>
          </TouchableHighlight>
      );
  },
  listViewOnRefresh: function(page, callback, api_endpoint){
      if (page != 1 && this.state.topStoryIDs){
          this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
      }
      else {
        fetch(api_endpoint)
        .then((response) => response.json())
        .then((topStoryIDs) => {
            this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
            this.setState({topStoryIDs: topStoryIDs});
        })
        .done();
      }
  },
  fetchStoriesUsingTopStoryIDs: function(topStoryIDs, startIndex, amountToAdd, callback){
      var rowsData = [];
      var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
      function iterateAndFetch(){
          if (startIndex < endIndex){
              fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
              .then((response) => response.json())
              .then((topStory) => {
                  topStory.count = startIndex+1;
                  rowsData.push(topStory);
                  startIndex++;
                  iterateAndFetch();
              })
              .done();
          }
          else {
              callback(rowsData);
              return;
          }
      }
      iterateAndFetch();
      this.setState({lastIndex: endIndex});
  },
  selectRow: function(row, pushNavBarTitle){
    this.props.navigator.push({
      id: 'Post',
      title: pushNavBarTitle+' #'+row.count,
      post: row,
    });
  }
})

var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      height: 56,
      backgroundColor: '#FF6600'
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    } 
});
