import React, { Component, AsyncStorage } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Alert,
    Image,
    Dimensions,
    ToastAndroid,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Platform,
    StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor } from '../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE } from '../../images'
import { removeAll, isEmpty } from '../../realm_services/RealmService';
import { saveExames } from '../global_components/GlobalFunctions';

export default class ModuloProfissional extends Component {

    static navigationOptions = {
        headerTitle: 'Módulo do profissional'
    }

    constructor(props) {
        super(props)

        //removeAll()
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.containerContent}>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={[Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos, { marginTop: 16 }]}
                            onPress={() => {
                                this.props.navigation.navigate('SyndromeDefinition', {tipoQuadro: 1})
                            }}>
                            <Text style={styles.textButton}>Definições, diagnóstico diferencial das Síndromes Hipertensivas na Gravidez</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos, { marginTop: 16 }]}
                            onPress={() => {
                                this.props.navigation.navigate('CalculadorFatorRisco')
                            }}>
                            <Text style={styles.textButton}>Fatores de risco gestacional</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos, { marginTop: 16 }]}
                            onPress={() => {
                                this.props.navigation.navigate('SyndromeDefinition', {tipoQuadro: 4})
                            }}>
                            <Text style={styles.textButton}>Recomendação de prática clínica</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos, { marginTop: 16 }]}
                            onPress={() => {
                                this.props.navigation.navigate('FluxoAtendimentoGestante')
                            }}>
                            <Text style={styles.textButton}>Fluxo de atendimento à gestante de alto risco</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos, { marginTop: 16 }]}
                            onPress={() => {
                                this.props.navigation.navigate('RedeAtendimentoPage')
                            }}>
                            <Text style={styles.textButton}>Rede de atendimento de alto risco a gestante no Piauí</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeView: {
        paddingTop: Platform.OS === 'ios' ? 44 : 0,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        backgroundColor: colorFundo
    },
    fundoImage: {
        height: '100%'
    },
    containerContent: {
        flex: 1,
        alignItems: 'center'
    },
    logoImage: {
        height: 100,
        width: 229,
        marginTop: 56,
        marginBottom: 56
    },
    containerButtons: {
        flex: 1,
        width: '100%',
    }, 
    buttonAndroid: {
        minHeight: 50, 
        backgroundColor: white, 
        elevation: 2, 
        shadowOpacity: 10, 
        borderRadius: 15, 
        padding: 6, 
        paddingStart: 16, 
        marginStart: 16,
        marginEnd: 16,
        paddingEnd: 16, 
        justifyContent: 'center'
    },

    buttonIos: {
        minHeight: 50, 
        backgroundColor: white, 
        borderWidth: 1,
        borderColor: fontColor, 
        borderRadius: 15, 
        padding: 6, 
        paddingStart: 16, 
        paddingEnd: 16, 
        marginStart: 16,
        marginEnd: 16,
        justifyContent: 'center'
    },


    textButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor,
        textAlign: 'center'
    }
});
