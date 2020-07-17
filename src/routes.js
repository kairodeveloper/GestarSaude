import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main'
import { white, colorPrimary } from '../colors';
import RegistroFirstStep from './pages/register_user/RegistroFirstStep';
import RegistroSecondStep from './pages/register_user/RegistroSecondStep';
import RegistroThirdStep from './pages/register_user/RegistroThirdStep';
import UserMainPage from './pages/user_module/UserMainPage';
import SyndromeDefinition from "./pages/SyndromeDefinition";
import ConsultationSchedules from "./pages/ConsultationSchedules";
import Contact from "./pages/Contact";
import RegistroConsulta from './pages/register_data/RegistroConsulta';
import RedeAtendimentoPage from './pages/user_module/RedeAtendimentoPage';
import UBSesProximasPage from './pages/user_module/UBSesProximasPage';

import ScheduleNotification from "./pages/ScheduleNotification";
import RegistroAgendamento from "./pages/register_data/RegistroAgendamento";
import ModuloProfissional from './pages/ModuloProfissional';
import FluxoAtendimentoGestante from './pages/FluxoAtendimentoGestante';
import CalculadorFatorRisco from './pages/CalculadorFatorRisco';
import FluxoAtendimento from './pages/user_module/FluxoAtendimento';
import EditUser from './pages/register_user/EditUser';

const navigationOptions = {
    headerTitleStyle: {
        color: white
    },
    headerTintColor:  white,
    headerStyle: {
        backgroundColor: colorPrimary
    }
}

const navigationOptionsNoShadow = {
    headerTitleStyle: {
        color: white
    },
    headerTintColor:  white,
    headerStyle: {
        backgroundColor: colorPrimary,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0
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
    },
    UserMainPage: {
        screen: UserMainPage,
        navigationOptions: navigationOptionsNoShadow
    },
    RegistroConsulta: {
        screen: RegistroConsulta,
        navigationOptions: navigationOptions
    },
    Contatos: {
        screen: Contact,
        navigationOptions: navigationOptions
    },
    SyndromeDefinition: {
        screen: SyndromeDefinition,
        navigationOptions: navigationOptions
    },
    ConsultationSchedules: {
        screen: ConsultationSchedules,
        navigationOptions: navigationOptions
    },
    RedeAtendimentoPage: {
        screen: RedeAtendimentoPage,
        navigationOptions: navigationOptions
    },
    UBSesProximasPage: {
        screen: UBSesProximasPage,
        navigationOptions: navigationOptions
    },
    ScheduleNotification: {
        screen: ScheduleNotification,
        navigationOptions: navigationOptions
    },
    RegistroAgendamento: {
        screen: RegistroAgendamento,
        navigationOptions: navigationOptions
    },
    ModuloProfissional: {
        screen: ModuloProfissional,
        navigationOptions: navigationOptions
    },
    FluxoAtendimento: {
        screen: FluxoAtendimento,
        navigationOptions: navigationOptions
    },
    FluxoAtendimentoGestante: {
        screen: FluxoAtendimentoGestante,
        navigationOptions: navigationOptions
    },
    CalculadorFatorRisco: {
        screen: CalculadorFatorRisco,
        navigationOptions: navigationOptions
    },
    EditUser: {
        screen: EditUser,
        navigationOptions: navigationOptions
    }
},{
    initialRouteName: 'Main'
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
