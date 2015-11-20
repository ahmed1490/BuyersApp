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
// var PushPayload = require('./PushPayload.js');

class ArticleDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            article: this.props.article,
            showProgress: true
        };
    }

    componentDidMount(){
        this.fetchArticleDetail();
    }

    fetchArticleDetail(){
        return this.fakeArticleDetail();

        require('../services/AuthService').getAuthInfo((err, authInfo)=> {
            var url = '//buyersapp.domain.de/'
                + authInfo.user
                + '/' + this.props.session.session_id + '/articles/' + this.props.article.article_id;

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

    fakeArticleDetail() {
        console.log('fetchign detail for article', this.props.article.session_id)
         this.setState({article:{
                article_id: '342', serial_nr: '6456', name: 'T shirt round neck', image: '', brand_key: '33',
                brand:  'Leo', category_key: 44, category: 'T-Shirt', colors: ['#f00'], sizes: ['M', 'XL'],
                amount: '300', price: '50'
            }})

        this.setState({
            showProgress: false
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
                        source={{uri: rowData.image}}
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
                            flex: 1,
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
            flex: 1, backgroundColor: '#F1F1F0'
        }}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:3,  alignContent: 'stretch', justifyContent: 'space-around' }}>
                    <Text style={{ flex: 1, padding:8}}>
                        Name: <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                            {this.props.article.name}</Text>
                    </Text>
                    <Text style={{ flex: 1, padding:8}}>
                        Sr. No.: <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                            {this.props.article.serial_nr}</Text>
                    </Text>
                </View>
                <View style={{flex:1, }}>
                    <Text style={{borderRadius: 5, borderColor: '#F08532', padding:10,
                            alignSelf: 'flex-end', borderWidth: 2, width: 60, height: 60, margin: 10}}>bar code</Text>
                </View>
            </View>

            <View style={{}}>
                  <Image
                    style={{width: 365, height: 240, margin: 4}}
                    source={require('../../images/camera.png')}
                  />
            </View>
            
        </View>
      );
























    }
}

module.exports = ArticleDetail;