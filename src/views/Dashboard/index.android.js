'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var TabBar = require("../../components/TabBar");

var api = require("../../network/api.js");

var RefreshableListView = require("../../components/RefreshableListView");

var NewsPage = require('../NewsPage');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			topStoryIDS: null,
			lastIndex: 0
		};
	},
	render(){
		return (
			<TabBar structure={[
				{
					title: "精选",
					iconName: 'ios-car',
			    renderContent: this.renderContent('精选', 37),
				},
				 {
          title: '发现',
          iconName: 'ios-cloudy',
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
     return () => {
      // return(
      //   <View style={{flex:1}}>
      //     <ToolbarAndroid style={styles.toolbar}
      //                     title={title}
      //                     titleColor={'#FFFFFF'}/>
      //     <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Show Story')}
      //                          onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_SHOW_STORIES_ENDPOINT)}
      //                          backgroundColor={'#F6F6EF'}/>
      //   </View>)
      return (
        <View style={{flex:1}}>
          <ToolbarAndroid style={styles.toolbar}
                          title={title}
                          titleColor={'#FFFFFF'}/>
          <NewsPage navigator={this.props.navigator} channelid={channelid}/>
        </View>)
      ;}
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
