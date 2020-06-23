import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main'
import { white, colorPrimary } from '../colors';
import RegistroFirstStep from './pages/register_user/RegistroFirstStep';
import RegistroSecondStep from './pages/register_user/RegistroSecondStep';
import RegistroThirdStep from './pages/register_user/RegistroThirdStep';

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
    },
    RegisterFirstStep: {
        screen: RegistroFirstStep,
        navigationOptions: navigationOptions
    },
    RegistroSecondStep: {
        screen: RegistroSecondStep,
        navigationOptions: navigationOptions
    },
    RegistroThirdStep: {
        screen: RegistroThirdStep,
        navigationOptions: navigationOptions
    }
},{
    initialRouteName: 'Main'
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;