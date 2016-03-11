/**
 * Created by stephan on 16/1/22.
 */
'use strict';

import React from 'react-native';

import NewsCell from './NewsCell'

var {
    View,
    Text,
    TouchableHighlight,
    PullToRefreshViewAndroid,
    StyleSheet,
    ListView,
    } = React;
//
//

var API_URL = 'http://api.bingodu.cn/api/news/listv14';
//var API_URL2 = 'http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=football&_sport_s_=opta&_sport_a_=teamOrder&type=213&season=2015&format=json';
//var API_URL3 = 'http://www.vip.com/detail-ajax.php?callback=_getSizeTableData&act=getSizeHtml&merchandiseId=86321838&brandId=642112';
//var API_URL_4 = 'https://api.douban.com/v2/movie/in_theaters?apikey=00aefce4d06e0bb7020cf6ae714a2325';

var PAGE_SIZE = 20;
var channel = 1;
var PARAMS = '?province=%E5%B9%BF%E4%B8%9C%E7%9C%81&lon=113.314586&lat=23.124376&city=%E5%B9%BF%E5%B7%9E%E5%B8%82&channel=' + channel + '&rows=' + PAGE_SIZE;

var url;

export default class NewsPage extends React.Component {


    constructor(props) {
        super(props);
        //console.log("constructor");
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoading: true,
            offset: 0,
            lastTimestamp: ''
        };
    }

    componentDidMount() {
        //console.log("componentDidMount");
        //url = API_URL + PARAMS;
        this.fetchData();
    }

    /*
    * 刷新
    *
    * fromTop 是否从顶部下拉刷新
    * */
    fetchData(fromTop: Boolean) {
        var offset = 0;
        if(!fromTop){
            offset = this.state.offset;
        }
        fetch(this.getUrl(offset)
            , {
                method: 'GET',
                headers: {
                    'appkey': '1000001',
                    'deviceid': 'xxxxxxx00-1234xxxx-1234'
                }
            }
        )
            .then((res) => (res.json()))
            .catch((err) => {
                //console.error("~error~ ：" + JSON.stringify(err));
                this.setState({
                        isLoading: false,
                        dataSource: "load error" + err
                    }
                );
            })
            .then((res) => {
                this.setState({
                        isLoading: false,
                        dataSource: this.state.dataSource.cloneWithRows(res.data.newsList)
                    }
                );

            }).done();
    }

    getDataSource(subjects:Array<any>):ListView.DataSource {
        return this.state.dataSource.cloneWithRows(subjects);
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        return this.renderListView();
    }

    renderLoadingView() {
        return (
            <View style={styles.textContainer}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderListView() {
        // <View style={styles.container}>
        //     <PullToRefreshViewAndroid
        //         style={styles.pulltorefresh}
        //         refreshing={this.state.isLoading}
        //         progressBackgroundColor={'#ffff00'}
        //         onRefresh={()=>this.fetchData()}>
        return (
                <ListView
                    ref="listview"
                    style={styles.listview}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.onEndReached}
                    automaticallyAdjustContentInsets={false}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={true}
                    showsVerticalScrollIndicator={false}/>
               
        );
        // </PullToRefreshViewAndroid>
        // </View>
    }

    getUrl(offset:number, timestamp:string) {
        console.info("getUrl() offset " + offset + " timestamp: " + timestamp);
        var url = API_URL + PARAMS;
        if (offset > 0) {
            url = url + "&direction=former&offset=" + offset + "&timestamp=" + timestamp;
        }
        return url;
    }
    /* 加载到底部 */
    onEndReached() {

    }


    seletItem(news) {
        this.props.navigator.push({
            title: news.newsTitle,
            name: 'detail',
            news: news
        });
    }

    // renderRow(news: object, sectionID:number,
    //           rowID: number,
    //           highlightRowFunc: (sectionID: number, rowID: number) => void) {
     renderRow = (news: Object, sectionID: number, rowID: number) => {
        return(
            <NewsCell
            key={news.newsId}
            onSelect={() => this.seletItem(news)}
            onHighlight={() => highlightRowFunc(sectionID, rowID)}
            onUnhighlight={() => highlightRowFunc(null, null)}
            news={news} />
        );
    };
}

var styles = StyleSheet.create({
    pulltorefresh: {
        flex: 1
    },
    listview: {
        backgroundColor: '#FAFAFA',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textview: {
        flex: 1
    }
});

module.exports = NewsPage;