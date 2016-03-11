'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ToolbarAndroid,
    View,
    WebView
    } = React;

var ProgressBar = require('ProgressBarAndroid');
var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://www.baidu.com';
// news: {
//     "adId": "",
//     "channel": "1",
//     "commentNum": "461",
//     "detailUrl": "http://bingodu.oeeee.com/sohu/2016/03/09/17931763.html?cid=1&nid=293748&update=1457514251000",
//     "dislikeNum": "0",
//     "displayType": "2",
//     "likeNum": "0",
//     "newsId": "293748",
//     "newsSource": "中国新闻网",
//     "newsTitle": "伊朗再试射弹道导弹 2枚导弹击中1400公里外目标",
//     "onTop": false,
//     "picList": [
//         {
//             "newsId": "293748",
//             "picId": "754731",
//             "picName": "",
//             "picUrl": "http://bdimg.oeeee.com/group1/M04/25/0E/CgELI1bf3D2ATTLrAAARU3g_nUI34.jpeg"
//         }
//     ],
//     "praiseNum": "211",
//     "promotion": "0",
//     "publishTime": "46分钟前",
//     "readNum": "8903",
//     "shareNum": "177",
//     "timestamp": "1457511469"
// }

var WebViewExample = React.createClass({

    getInitialState: function () {
        console.log("detail url: " + this.props.news.detailUrl);
        return {
           // url: this.props.news.detailUrl,//DEFAULT_URL,
            isLoading: true,
            url: DEFAULT_URL,
            title: this.props.news.newsTitle,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true
        };
    },

    componentDidMount (){
        this.setState({
            url: this.props.news.detailUrl,
            isLoading: true,
        });
    },

    render() {
        return this.renderDetailView();
    },

    renderDetailView(){
        return (
            <View style={[styles.outSideContainer]}>
             {this.state.isLoading && this.renderLoadingView()}
             {this.renderWebView()}
             </View>
      );
    },

    renderWebView(){
        console.log("renderWebView");
        return(
        <View style={[styles.outSideContainer]}>
            <ToolbarAndroid
                title={this.state.title}
                titleColor='#61a972'
                style={styles.toolbar}/>
            <WebView
                ref={WEBVIEW_REF}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: this.state.url}}
                javaScriptEnabled={true}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
                onLoadEnd={this.onLoadEnd}
                />
         </View>);
    },

    renderLoadingView(){
        console.log("renderLoadingView");
        return (
         <View style={{ flex: 99, flexDirection: 'column', backgroundColor: 'white'}}>
            <View style={styles.loadingContainer}>
            <ProgressBar styleAttr="Large"/>
            <Text style={styles.loadingText}>正在加载详情</Text>
            </View>
         </View>
      );
    },

    onLoadEnd(){
        console.log("onLoadEnd");
        this.setState({
            isLoading: false
        })
        //styles.loadingContainer.backfaceVisibility = "hidden";
    },

    // goBack: function () {
    //     this.refs[WEBVIEW_REF].goBack();
    // },

    // goForward: function () {
    //     this.refs[WEBVIEW_REF].goForward();
    // },

    // reload: function () {
    //     this.refs[WEBVIEW_REF].reload();
    // },

    onShouldStartLoadWithRequest: function (event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    },

    onNavigationStateChange: function (navState) {
        this.setState({
            //backButtonEnabled: navState.canGoBack,
            //forwardButtonEnabled: navState.canGoForward,
            //url: navState.url,
            status: navState.title,
            //loading: navState.loading,
            scalesPageToFit: true
        });
    },

});

var styles = StyleSheet.create({
    outSideContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    toolbar: {
        backgroundColor: 'white',
        height: 50
    },
    container: {
        flex: 1,
        backgroundColor: HEADER
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8
    },
    webView: {
        backgroundColor: BGWASH,
        flex: 1
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch'
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22
    },
    statusBarText: {
        color: 'white',
        fontSize: 13
    },
    spinner: {
        width: 20,
        marginRight: 6
    },  
    titleBarSplitLine: {
        height: 1, 
        backgroundColor: '#e5e5e5',
    },
});

// exports.displayName = (undefined: ?string);
// exports.title = '<WebView>';
// exports.description = 'Base component to display web content';
// exports.examples = [
//   {
//     title: 'WebView',
//     render(): ReactElement { return <WebViewExample />; }
//   }
// ];

module.exports = WebViewExample;