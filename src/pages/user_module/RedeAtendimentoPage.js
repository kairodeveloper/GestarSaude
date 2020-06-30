import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    FlatList,
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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor, pink, blue } from '../../../colors';
import { ICONGIRL, ICONBOY, BACKGROUNDPREGNANTIMAGESEMFUNDO, MAPAPIAUI } from '../../../images'
import {
    saudacaoStep3
} from '../../../strings';
import { NavigationActions, StackActions } from 'react-navigation';
import { getNextMid, saveThis } from '../../../realm_services/RealmService'
import { ScrollView } from 'react-native-gesture-handler';

export default class RedeAtendimentoPage extends Component {

    static navigationOptions = {
        headerTitle: 'Rede de atendimento'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ImageBackground source={MAPAPIAUI} style={styles.fundoImage}>
                        <View style={{height: '100%'}}>
                            <View style={{flex: 1, borderWidth: 1, flexDirection: 'row-reverse'}}>
                                <View style={{width: '30%', marginEnd: 16, borderWidth: 1}}></View>
                            </View>
                            <View style={{flex: 1, borderWidth: 1, flexDirection: 'row-reverse'}}>
                                <View style={{width: '40%', marginEnd: 16, borderWidth: 1}}></View>
                            </View>
                            <View style={{flex: 3, borderWidth: 1, flexDirection: 'row-reverse'}}>
                                <View style={{width: '50%', flexDirection: 'row', borderWidth: 1}}>
                                    <View style={{flex: 1.25, borderWidth: 1, flexDirection: 'row-reverse'}}></View>
                                    <View style={{flex: 1.75, borderWidth: 1}}>
                                        <View style={{flex: 1, borderWidth: 1}}></View>            
                                        <View style={{flex: 2, borderWidth: 1}}></View>            
                                    </View>
                                </View>
                            </View>
                               
                            <View style={{flex: 5, borderWidth: 1, flexDirection: 'row'}}>
                                <View style={{flex: 3, borderWidth: 1}}>
                                    <View style={{flex: 1, borderWidth: 1}}>
                                        <View style={{flex: 1.5, borderWidth: 1}}></View>
                                        <View style={{flex: 2.5, borderWidth: 1}}></View>
                                    </View>
                                </View>
                                <View style={{flex: 2, borderWidth: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 1, borderWidth: 1}}>
                                        <View style={{flex: 1.25, borderWidth: 1}}></View>
                                        <View style={{flex: 0.75, borderWidth: 1}}></View>
                                        <View style={{flex: 1, borderWidth: 1}}></View>    
                                    </View>
                                </View>
                                <View style={{flex: 2, borderWidth: 1}}>
                                    <View style={{flex: 2, borderWidth: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 1, borderWidth: 1}}>
                                            <View style={{flex: 1, borderWidth: 1}}></View>
                                            <View style={{flex: 1, borderWidth: 1}}></View>    
                                        </View>
                                        <View style={{flex: 1, borderWidth: 1}}>
                                            <View style={{flex: 2, borderWidth: 1}}></View>
                                            <View style={{flex: 1, borderWidth: 1}}></View>    
                                        </View>
                                    </View>
                                    <View style={{flex: 1, borderWidth: 1}}></View>
                                </View>             
                            </View>
                        </View>
                    </ImageBackground>
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
        backgroundColor: colorFundo,
        padding: 16
    },
    containerContent: {
        flex: 1,
        padding: 16
    },
    containerTextInput: {
        minHeight: 30,
        marginTop: 6,
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: white
    },
    fundoImage: {
        height: '100%'
    },
    saudacaoStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor
    },
    textOverField: {
        marginTop: 16,
        fontSize: 16,
        color: fontColor
    }
});
