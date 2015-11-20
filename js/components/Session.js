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
var Article = require('./Article.js');

class Session extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true,
        };
    }

    componentDidMount(){
        this.fetchSession();
    }

    fetchSession(){
        return setTimeout( () => { this.fakeSessions(); } , 100);

        require('../services/AuthService').getAuthInfo((err, authInfo)=> {
            var url = '//buyersapp.domain.de/'
                + authInfo.user
                + '/sessions';

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

    fakeSessions() {
        var fakeSessionData = [
            {session_id: 'abc', supplier: 'Ahmed', date: '11/18/2015' },
            {session_id: 'xyz', supplier: 'Tony', date: '11/17/2015' },
            {session_id: 'stu', supplier: 'John', date: '11/15/2015' }
        ];

        this.setState({
            dataSource: this.state.dataSource
                .cloneWithRows(fakeSessionData),
            showProgress: false
        });
    }

    pressRow(rowData){
        this.props.navigator.push({
            title: 'Articles for ' + rowData.supplier,
            component: Article,
            backButtonTitle: 'Articles', //this is the back button title of article compoennt
            passProps: {
                session: rowData
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
                        source={{uri: rowData.avatar_url}}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }}
                    />

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{flex:1 }}>
                            <Text style={{
                                    fontWeight: '600',
                                    fontSize: 18
                            }}>
                                {rowData.supplier}
                            </Text>
                            <Text>
                                <Text>{moment(rowData.date).fromNow()}</Text>
                            </Text>
                        </View>
                        <Text style={{
                            fontSize:22,
                            color: '#ccc'
                        }}>
                            &gt;
                        </Text>
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

module.exports = Session;