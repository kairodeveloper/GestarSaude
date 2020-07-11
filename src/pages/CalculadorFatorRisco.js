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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor, colorButtons } from '../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE, FLUXO1, FLUXO2, ICONCHECKED } from '../../images'
import { removeAll, isEmpty } from '../../realm_services/RealmService';
import { getOpcoesRiscoGestacional } from '../global_components/GlobalFunctions';

const ModalFator = require('../modals/ModalFatorRisco')

export default class CalculadorFatorRisco extends Component {

    static navigationOptions = {
        headerTitle: 'Fatores de risco gestacional'
    }

    constructor(props) {
        super(props)

        let fatores = getOpcoesRiscoGestacional()

        this.state = {
            fatores: fatores,
            result: 0,
            showModal: false
        }
    }

    getFatoresByGrupo(grupo_id) {
        let retorno = []

        this.state.fatores.map((it) => {
            if (it.grupo==grupo_id) {
                retorno.push(it)
            }
        })

        return retorno
    }

    setSelecionadoOnFator(mid) {
        let fatores = this.state.fatores

        fatores.map((it) => {
            if (it.mid==mid) {
                it.selecionado=!it.selecionado
            }
        })

        this.setState({
            showModal: false,
            fatores: fatores
        })
    }

    getCardsFatores(grupo_id) {
        let rows = []
        let fatores = this.getFatoresByGrupo(grupo_id)

        fatores.map((it) => {
            rows.push(
              <TouchableOpacity
                onPress={() => {
                    this.setSelecionadoOnFator(it.mid)
                }}
                style={{ minHeight: 60, width: '100%', marginBottom: 16, padding: 16, borderRadius: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: fontColor,  backgroundColor: white }}>
                <View flex={4}>
                  <Text style={styles.subtitlePage}>{it.nome}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                  {it.selecionado ? (
                    <Image source={ICONCHECKED} style={{ marginStart: 6, height: 27, width: 27 }} />
                  ) : (
                      <View style={{ marginStart: 6, height: 25, width: 25, borderWidth: 2, borderRadius: 5 }} />
                    )}
                </View>
              </TouchableOpacity>
            )
        })
    
        return rows
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })

        this.props.navigation.goBack()
    }

    render() {

        let modalFator = <Modal
            animationType="slide"
            visible={this.state.showModal}
            transparent>
            <View style={styles.containerModal}>
                <View style={styles.viewContentModal}>
                    <ModalFator
                        result={this.state.result}
                        closeModal={this.closeModal} />
                </View>
            </View>
        </Modal>

        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.containerContent}>
                    {modalFator}
                    <ScrollView>
                        <View style={styles.containerButtons}>
                            <View style={{ minHeight: 50, alignItems: 'flex-start' }}>
                                <Text style={styles.titlePage}>Classificação de Risco da Gestante</Text>
                                <Text style={styles.subtitlePage}>Atenção Básica</Text>
                            </View>
                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>1 - IDADE:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(1)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>2 - RENDA FAMILIAR per capita:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(2)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>3 - Aceitação da GRAVIDEZ:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(3)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>4 - ESCOLARIDADE - alfabetizada:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(4)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>5 - HÁBITOS:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(5)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>6 - FATOR RH:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(6)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>7 - AVALIAÇÃO NUTRICIONAL:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(7)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>8 - ANTECEDENTES OBSTÉTRICOS:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(8)}
                                </View>
                            </View>

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>9.1 - PATOLOGIAS OBSTÉTRICAS E GINECOLÓGICAS:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(9)}
                                </View>
                            </View>                           

                            <View style={{ minHeight: 50, marginTop: 16, padding: 6, borderWidth: 0.3, borderColor: fontColor, borderRadius: 15, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>9.2 - PATOLOGIAS MÉDICAS E CIRURGICAS:</Text>
                                <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                                    {this.getCardsFatores(10)}
                                </View>
                            </View>                           
                        </View>
                    </ScrollView>
                    <View style={{height: 100, padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                let result = 0

                                this.state.fatores.map((it) => {
                                    if (it.selecionado) {
                                        result += it.pontuacao
                                    }
                                })

                                this.setState({
                                    showModal: true,
                                    result: result
                                })
                            }}
                            style={Platform.OS=="android" ? styles.buttonAndroid : styles.buttonIos }>
                            <Text style={styles.textButton}>CONCLUIR</Text>
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
    containerContent: {
        flex: 1,
    },
    containerButtons: {
        flex: 1,
        padding: 16
    },
    containerModal: {
        flex: 1,
        backgroundColor: blackSemiTransparent,
        justifyContent: 'center',
        alignItems: 'center'
    },

    viewContentModal: {
        height: 100,
        width: '75%',
        backgroundColor: white,
        borderRadius: 25,
        padding: 16
    },
    buttonAndroid: {
        minHeight: 50,
        width: '100%',
        backgroundColor: colorPrimaryDark,
        elevation: 2,
        shadowOpacity: 10,
        borderRadius: 15,
        padding: 6,
        paddingStart: 16,
        marginStart: 16,
        marginEnd: 16,
        paddingEnd: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonIos: {
        minHeight: 50,
        width: '100%',
        backgroundColor: colorPrimaryDark,
        borderWidth: 1,
        borderColor: fontColor,
        borderRadius: 15,
        padding: 6,
        paddingStart: 16,
        paddingEnd: 16,
        marginStart: 16,
        marginEnd: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: white,
        textAlign: 'center'
    },
    titlePage: {
        fontSize: 18,
        color: fontColor,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    chapterTitle: {
        fontSize: 20,
        color: fontColor,
        fontWeight: 'bold',
        marginTop: 16
    },
    itemTitle: {
        fontSize: 18,
        color: fontColor,
        fontWeight: 'bold'
    },
    subitemTitle: {
        fontSize: 16,
        color: fontColor,
        marginTop: 6,
        textAlign: 'justify'
    },
    subtitlePage: {
        fontSize: 18,
        color: fontColor
    }
});
