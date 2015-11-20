'use strict';

var React = require('react-native');

var {
    Text,
    View,
    Component,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight
} = React;

var moment = require('moment');
var ArticleDetail = require('./ArticleDetail');

class Article extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true
        };
    }

    componentDidMount(){
        this.fetchArticle();
    }

    fetchArticle(){
        return setTimeout( () => { this.fakeArticles(); } , 100);

        require('../services/AuthService').getAuthInfo((err, authInfo)=> {
            var url = '//buyersapp.buyer.de/'
                + authInfo.user
                + '/' + this.props.session.session_id + '/articles';

            fetch(url, {
                headers: authInfo.header
            })
            .then((response)=> response.json())
            .then((responseData)=> {
                this.setState({
                    dataSource: this.state.dataSource
                        .cloneWithRows(responseData),
                    showProgress: false
                });
            })
        });
    }

    fakeArticles() {
        console.log('fetchign articles for session', this.props.session.session_id)
        var fakeArticleData = [
        ];

        if( this.props.session.session_id === 'xyz' ){
            fakeArticleData.push({
                article_id: '342', serial_nr: '6456', name: 'T shirt round neck', brand_key: '33',
                brand:  'Leo', category_key: 44, category: 'T-Shirt', colors: ['#f00'], sizes: ['M', 'XL'],
                amount: '300', price: '50', image: '../../images/articles/Male-Round-Neck-T-shirt.jpg'
            })
            fakeArticleData.push({
                article_id: '343', serial_nr: '6457', name: 'T shirt V neck', brand_key: '33',
                brand:  'Leo', category_key: 44, category: 'T-Shirt', colors: ['#f00'], sizes: ['M', 'XL'],
                amount: '300', price: '52', image: '../../images/articles/T-shirt-V-neck.jpg'
            })
        } else if( this.props.session.session_id === 'abc' ) {
            fakeArticleData.push({
                article_id: '345', serial_nr: '5453', name: 'Shirt formal', brand_key: '33',
                brand:  'Leo', category_key: 44, category: 'Shirt', colors: ['#f00'], sizes: ['M', 'XL'],
                amount: '220', price: '30', image: '../../images/articles/Shirt-formal.jpg'
            })
            fakeArticleData.push({
                article_id: '347', serial_nr: '5455', name: 'Half sleeve summer shirt', brand_key: '33',
                brand:  'Leo', category_key: 44, category: 'Shirt', colors: ['#0f0'], sizes: ['M', 'XL'],
                amount: '220', price: '30', image: '../../images/articles/Half-sleeve-summer-shirt.png'
            })
        }   


        this.setState({
            dataSource: this.state.dataSource
                .cloneWithRows(fakeArticleData),
            showProgress: false
        });
    }

    pressRow(rowData){
        this.props.navigator.push({
            title: rowData.name,
            component: ArticleDetail,
            passProps: {
                article: rowData,
                session: this.props.session
            }
        });
    }

    renderRow(rowData){
        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Image
                        source={require('../../images/articles/soon.jpg')}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }}
                    />

                    <View style={{
                        paddingLeft: 20
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={{
                                fontWeight: '600',
                                fontSize: 18
                            }}>{rowData.name}</Text>
                            <Text>
                                {rowData.category} from {rowData.brand}
                            </Text>
                        </View>
                
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
      if(this.state.showProgress){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicatorIOS
                    size="large"
                    animating={true} />
            </View>
        );
      }

      return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start'
        }}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
        </View>
      );
    }
}

module.exports = Article;