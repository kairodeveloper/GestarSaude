import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main'
import { white, colorPrimary } from '../colors';

const navigationOptions = {
    headerTitleStyle: {
        color: white,
    },
    headerTitleStyle: {
        color: white
    },
    headerTintColor:  white,
    headerStyle: {
        backgroundColor: colorPrimary
    }
}


const RootStack = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: navigationOptions
    }
},{
    initialRouteName: 'Main'
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;