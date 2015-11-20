'use strict';

var React = require('react-native');

var {
    Text,
    View,
    Component,
    StyleSheet,
    TabBarIOS,
    NavigatorIOS
} = React;

var Session = require('./Session');

class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'session'
        }
    }

    render(){
      return (
       
                <NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        component: Session,
                        title: 'Sessions'
                    }}
                    tintColor="#FFFFFF"
                    barTintColor="#EE853D"
                    titleTextColor="#FFFFFF"
                    translucent={false}
    
                />
        

      );
    }
}

var styles = StyleSheet.create({
    listingsTitle: {
        backgroundColor: '#EE853D'
    }
});

module.exports = AppContainer;