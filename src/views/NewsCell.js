'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  PropTypes,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;


var NewsCell = React.createClass({

  //getActors: function(movie) {
  //  var actors = new Array();
  //  for(var i in movie.casts){
  //    actors.push(movie.casts[i].name);
  //  }
  //  return actors.join('/');
  //},

  render: function() {

    //var image = this.props.news.picList[0].picUrl;
    var title = this.props.news.newsTitle;
    var rating = '来源：' + this.props.news.newsSource;

    var image = null;
    if (this.props.news.picList && this.props.news.picList[0]) {
      image = <Image
        source={{uri: this.props.news.picList[0].picUrl}}
        style={styles.cellImage} />
    }

    var TouchableElement = TouchableNativeFeedback;
    if (Platform.OS === 'ios') {
      TouchableElement = TouchableHighlight;
    }

    return (
      <View {...this.props}>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
              <Text style={styles.newsTitle} numberOfLines={2}>
                 {title} 
               </Text>
            {image}
          </View>
        </TouchableElement>
      </View>
      );
    // return (
    //   <View style={{flex: 1}}>
    //     <TouchableElement
    //       onPress={this.props.onSelect}
    //       onShowUnderlay={this.props.onHighlight}
    //       onHideUnderlay={this.props.onUnhighlight}>
    //       <View style={styles.row}>
    //         <Image
    //           source={{uri: image}}
    //           style={styles.cellImage} />
    //         <View style={styles.textContainer}>
    //           <Text style={styles.newsTitle} numberOfLines={2}>
    //             {title} 
    //           </Text>
    //           <Text style={styles.movieRating} numberOfLines={1}>
    //             {rating}
    //           </Text>
    //         </View>
    //       </View>
    //     </TouchableElement>
    //   </View>
    // );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  newsTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  movieRating: {
    marginTop: 5,
    color: '#999999',
    fontSize: 14,
  },
  // row: {
  //   flex: 1,
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   flexDirection: 'row',
  // },
   row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    borderColor: '#dddddd',
    borderStyle: null,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    marginLeft: 10,
    width: 80,
  },
});

module.exports = NewsCell;
