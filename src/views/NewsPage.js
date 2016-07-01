/**
 * Created by stephan on 16/1/22.
 */
'use strict';

import React from 'react-native';
import NewsCell from './NewsCell';
import RefreshableListView from '../components/RefreshableListView';

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
var PARAMS = '?province=%E5%B9%BF%E4%B8%9C%E7%9C%81&lon=113.314586&lat=23.124376&city=%E5%B9%BF%E5%B7%9E%E5%B8%82&rows=' + PAGE_SIZE;

var url;

export default class NewsPage extends React.Component {

    // getInitialState(){
    //     return {
    //         topStoryIDS: null,
    //         lastIndex: 0
    //     };
    // }
    constructor(props) {
        super(props);
        //console.log("constructor");
        this.state = {
            lastIndex: 0,
            topStoryIDS: null,
            // dataSource: new ListView.DataSource({
            //     rowHasChanged: (row1, row2) => row1 !== row2,
            // }),
            // isLoading: true,
            offset: 0,
            lastTS: ''
        };
    }

    componentDidMount() {
        //console.log("componentDidMount");
        //url = API_URL + PARAMS;
        // this.fetchData();
    }

    /*
    * 刷新
    *
    * fromTop 是否从顶部下拉刷新
    * */
    // fetchData(fromTop: Boolean) {
    //     var offset = 0;
    //     if(!fromTop){
    //         offset = this.state.offset;
    //     }
    //     fetch(this.getUrl(offset)
    //         , {
    //             method: 'GET',
    //             headers: {
    //                 'appkey': '1000001',
    //                 'deviceid': 'xxxxxxx00-1234xxxx-1234'
    //             }
    //         }
    //     )
    //         .then((res) => (res.json()))
    //         .catch((err) => {
    //             //console.error("~error~ ：" + JSON.stringify(err));
    //             this.setState({
    //                     isLoading: false,
    //                     dataSource: "load error" + err
    //                 }
    //             );
    //         })
    //         .then((res) => {
    //             this.setState({
    //                     isLoading: false,
    //                     dataSource: this.state.dataSource.cloneWithRows(res.data.newsList)
    //                 }
    //             );

    //         }).done();
    // }

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
                    Loading...
                </Text>
            </View>
        );
    }

    renderListView() {
        // return (
        //     <ListView
        //         ref="listview"
        //         style={styles.listview}
        //         dataSource={this.state.dataSource}
        //         renderRow={this.renderRow}
        //         onEndReached={this.onEndReached}
        //         automaticallyAdjustContentInsets={false}
        //         keyboardDismissMode="on-drag"
        //         keyboardShouldPersistTaps={true}
        //         showsVerticalScrollIndicator={false}/>
        // );

        return (
          <RefreshableListView renderRow={(row)=>this.renderRow(row, 'Show Story')}
                               onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                               backgroundColor={'#F6F6EF'}
                               onEndReached={this.onEndReached}
                               />
        );
    }

    listViewOnRefresh(page, callback){
      // if (page != 1 && this.state.topStoryIDs){
      //     this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 10, callback);
      // }
      // else {
      //   fetch(api_endpoint)
      //   .then((response) => response.json())
      //   .then((topStoryIDs) => {
      //       this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 10, callback);
      //       this.setState({topStoryIDs: topStoryIDs});
      //   })
      //   .done();
      // }
      console.log('page ', page, 'offset', this.state.offset);
       var offset = 0;
        if (page != 1){
            offset = this.state.offset;
        } else {
            offset = 0;
        }
        fetch(this.getUrl(offset, this.props.channelid)
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
            if(res){
                // console.log(res.data.newsList);
                callback(res.data.newsList);
                var entity;
                for(var i = res.data.newsList.length -1;i >=0; i--){
                    entity = res.data.newsList[i];
                    if(entity && entity.advType == undefined){
                        this.state.offset = entity.newsId;
                        this.state.lastTS = entity.timestamp;
                        break;
                    }
                }
                // this.state.offset += res.data.newsList.length;
                this.setState({
                    isLoading: false,
                    // dataSource: this.state.dataSource.cloneWithRows(res.data.newsList)
                });
            }else{
                //TODO 增加错误页面
                this.setState({
                    isLoading: false,
                    // dataSource: "network error"
                    }
                );
            }

        }).done();
  }

    getUrl(offset:number, channelid:number) {
        var myDate = new Date();
        // var timestamp = myDate.getMilliseconds();
        // console.info("getUrl() offset " + offset + " timestamp: " + timestamp);
        var url = API_URL + PARAMS;
        url = url + "&channel=" + channelid;
        if (offset > 0) {
            url = url + "&direction=former&offset=" + offset + "&timestamp=" + this.state.lastTS;
        }
        return url;
    }
    /* 加载到底部 */
    onEndReached() {
        console.info('onEndReached');
    }


    seletItem(news) {
        this.props.navigator.push({
            title: news.newsTitle,
            name: 'detail',
            news: news
        });
    }

    renderRow(news: Object) {
        return(
            <NewsCell
            key = {news.newsId}
            onSelect = {() => this.seletItem(news)}
            news = {news} />
        );
    }

    // renderRow = (news: Object, sectionID: number, rowID: number) => {
    //     return(
    //         <NewsCell
    //         key={news.newsId}
    //         onSelect={() => this.seletItem(news)}
    //         onHighlight={() => highlightRowFunc(sectionID, rowID)}
    //         onUnhighlight={() => highlightRowFunc(null, null)}
    //         news={news} />
    //     );
    // };
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