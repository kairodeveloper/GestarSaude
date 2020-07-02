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
import { ICONGIRL, ICONBOY, BACKGROUNDPREGNANTIMAGESEMFUNDO, MAPAPIAUI, ICONCLOSE } from '../../../images'
import {
    saudacaoStep3
} from '../../../strings';
import { NavigationActions, StackActions } from 'react-navigation';
import { getNextMid, saveThis } from '../../../realm_services/RealmService'
import { ScrollView } from 'react-native-gesture-handler';
import { getRegiaoData } from '../../global_components/GlobalFunctions';

const ModalAtendimento = require('../../modals/ModalForList')

export default class RedeAtendimentoPage extends Component {

    static navigationOptions = {
        headerTitle: 'Rede de atendimento'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        this.handler = this.closeModal.bind(this)

        this.state = {
            showModal: false,
            regiao: {}
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    showModalRede(numeroRegiao) {
        let regiao = getRegiaoData(numeroRegiao)
        this.setState({
            regiao: regiao,
            showModal: true
        })
    }

    render() {
        
        let modalAtendimentoList = <Modal    
                                        animationType="slide"
                                        visible={this.state.showModal}
                                        transparent>
                                        <View style={styles.containerModal}>
                                            <View style={styles.viewContentModal}>
                                                <ModalAtendimento 
                                                    regiao = {this.state.regiao}
                                                    closeModal = {this.closeModal} />
                                            </View>
                                        </View>
                                    </Modal>
    
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                {modalAtendimentoList}
                <View style={styles.container}>
                    <ImageBackground source={MAPAPIAUI} style={styles.fundoImage}>
                        <View style={{height: '100%'}}>
                            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.showModalRede(1)
                                    }}
                                    style={{width: '30%', marginEnd: 16}}
                                />
                            </View>
                            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.showModalRede(2)
                                    }}
                                    style={{width: '40%', marginEnd: 16}}
                                />
                            </View>
                            <View style={{flex: 3, flexDirection: 'row-reverse'}}>
                                <View style={{width: '50%', flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.showModalRede(3)
                                        }}
                                        
                                        style={{flex: 1.25, flexDirection: 'row-reverse'}} 
                                    />
                                    <View style={{flex: 1.75}}>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                this.showModalRede(4)
                                            }}
                                            
                                            style={{flex: 2}}
                                        />       
                                        <TouchableOpacity 
                                            onPress={() => {
                                                this.showModalRede(5)
                                            }}
                                            
                                            style={{flex: 1}}
                                        />       
                                    </View>
                                </View>
                            </View>
                               
                            <View style={{flex: 5, flexDirection: 'row'}}>
                                <View style={{flex: 3}}>
                                    <View style={{flex: 1}}>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                this.showModalRede(6)
                                            }}
                                            
                                            style={{flex: 1.5}} 
                                        />
                                        <View style={{flex: 2.5}}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        this.showModalRede(6)
                                                    }}
                                                    
                                                    style={{flex: 1}} 
                                                />
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        this.showModalRede(7)
                                                    }}
                                                    
                                                    style={{flex: 1}}
                                                />
                                            </View>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.showModalRede(7)
                                                }}
                                                
                                                style={{flex: 2}}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <View style={{flex: 1.25, flexDirection: 'row'}}>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.showModalRede(8)
                                                }}
                                                
                                                style={{flex: 2}}/>
                                            <View style={{flex: 1}}>
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        this.showModalRede(9)
                                                    }}
                                                    
                                                    style={{flex: 1}}
                                                />
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        this.showModalRede(8)
                                                    }}
                                                    
                                                    style={{flex: 1}} 
                                                />
                                            </View>    
                                        </View>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                this.showModalRede(10)
                                            }}
                                            
                                            style={{flex: 0.75}}
                                        />
                                        <View style={{flex: 1}} />    
                                    </View>
                                </View>
                                <View style={{flex: 2}}>
                                    <View style={{flex: 2, flexDirection: 'row'}}>
                                        <View style={{flex: 1}}>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.showModalRede(9)
                                                }}
                                                
                                                style={{flex: 1}}
                                            />
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.showModalRede(10)
                                                }}
                                                
                                                style={{flex: 1}}
                                            />
                                        </View>
                                        <View style={{flex: 2}}>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.showModalRede(11)
                                                }}
                                                
                                                style={{flex: 2}} />
                                            <View style={{flex: 1}}></View>    
                                        </View>
                                    </View>
                                    <View style={{flex: 1}}></View>
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
    containerModal: {
        flex: 1,
        backgroundColor: blackSemiTransparent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContentModal: {
        height: '60%',
        width: '75%',
        backgroundColor: white,
        borderRadius: 25,
        padding: 16
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
