'use strict';

import React from 'react-native';
var {
    View,
    Text,
    StyleSheet,
    } = React;

class SubjectTitle extends React.Component{
// var SubjectTitle = React.createClass({
	render() {
 	return (<View style={styles.container}>
 		<View style={styles.icon}/>
 		<Text style={styles.text}>{this.props.title}</Text>
 	</View>);
 }
}
var styles = StyleSheet.create({
	container:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 25
    },
    icon:{
    	 marginLeft: 10,
    	 width:6,
    	 height:15,
    	 backgroundColor: '#00BAA2',
    	 borderColor: '#fff',
	     borderStyle: null,
	     borderWidth: 0.5,
	     borderRadius: 3,
    },
    text:{
    	marginLeft: 6,
    	flex: 1,
	    fontSize: 16,
	    color: '#00BAA2',
    }


});
module.exports = SubjectTitle