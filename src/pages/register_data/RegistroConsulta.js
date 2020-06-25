import React, { Component } from 'react'
import {
    Animated,
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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor } from '../../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE } from '../../../images'
import {
    cepPlaceholder,
    saudacaoStep1,
    nomeCompletoLabel,
    nomeCompletoPlaceholder,
    cepLabel,
    idadePlaceholder,
    idadeLabel,
    bairroLabel,
    bairroPlaceholder,
    logradouroLabel,
    numCasaLabel,
    logradouroPlaceholder,
    numCasaPlaceholder,
    avancarButtonLabel
} from '../../../strings';
import DatePicker from 'react-native-datepicker'
import { getNextMid, saveThis, findFirstByFilter, updateThis } from '../../../realm_services/RealmService';

export default class RegistroConsulta extends Component {

    static navigationOptions = {
        headerTitle: 'Nova consulta'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        let edit = false
        let numeroConsultas = navigation.getParam('numeroConsultas', 0)
        let midConsulta = navigation.getParam('midConsulta', 0)

        let consulta = {}
        let numero = numeroConsultas + 1
        let nome_medico = ""
        let date = new Date()
        let peso = 0
        let pressao_x = 0
        let pressao_y = 0
        let observacao = ""

        if (midConsulta != 0) {
            consulta = findFirstByFilter('Consulta', 'mid = ' + midConsulta)

            numero = consulta.numero
            nome_medico = consulta.nome_medico
            date = consulta.data
            peso = consulta.peso.toString()
            pressao_x = consulta.pressao_x.toString()
            pressao_y = consulta.pressao_y.toString()
            observacao = consulta.observacao

            edit = true
        }

        this.state = {
            consulta: consulta,
            numero: numero,
            nome_medico: nome_medico,
            date: date,
            dateHasChange: false,
            peso: peso,
            pressao_x: pressao_x,
            pressao_y: pressao_y,
            observacao: observacao,
            edit: edit
        }
    }

    getEstadoSaude(params1, params2) {
        let pressao_x = params1
        let pressao_y = params2

        if (params2 > 40) {
            pressao_x = pressao_x / 10
            pressao_y = pressao_y / 10
        }

        if (pressao_x > 14) {
            return 2
        } else if (pressao_y < 6) {
            if (pressao_x < 9) {
                return 3
            } else {
                return 1
            }
        } else {
            return 1
        }
    }

    saveAndCloseWindow() {
        let consulta = {}

        if (this.state.dateHasChange) {
            let date = this.state.date.split("/")
            let dateD = new Date()
            dateD.setFullYear(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10))
            consulta.data = dateD
        } else {
            consulta.data = this.state.date
        }

        let x = parseFloat(this.state.pressao_x)
        let y = parseFloat(this.state.pressao_y)

        consulta.numero = this.state.numero
        consulta.estado = this.getEstadoSaude(x, y)
        consulta.nome_medico = this.state.nome_medico
        consulta.peso = parseFloat(this.state.peso)
        consulta.pressao_x = x
        consulta.pressao_y = y
        consulta.observacao = this.state.observacao

        if (this.state.edit) {
            let fields = ['data', 'numero', 'nome_medico', 'peso', 'pressao_x', 'pressao_y', 'observacao']

            consulta.mid = this.state.consulta.mid
            updateThis('Consulta', consulta, fields)
        } else {
            consulta.mid = getNextMid('Consulta')
            consulta.createdAt = new Date()
            consulta.removido = false

            saveThis('Consulta', consulta)
        }

        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();  
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.containerContent}>
                            <Text style={styles.saudacaoStyle}>{saudacaoStep1}</Text>
                            <Text style={styles.textOverField}>Nome do médico</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    value={this.state.nome_medico}
                                    placeholder={'Digite o nome do médico...'}
                                    onChangeText={(nome_medico) => this.setState({ nome_medico })}
                                />
                            </View>
                            <Text style={styles.textOverField}>Data da consulta</Text>
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <DatePicker
                                    style={{ marginTop: 6, color: black, flex: 1 }}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    format="DD/MM/YYYY"
                                    minDate="01-01-2000"
                                    maxDate="31-12-2100"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            height: 50,
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            backgroundColor: white,
                                            padding: 16,
                                            borderRadius: 15,
                                            borderWidth: 1,
                                            borderColor: fontColor,
                                            color: black
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({ date: date, dateHasChange: true })
                                    }}
                                />
                            </View>
                            <Text style={styles.textOverField}>Peso</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    value={this.state.peso}
                                    placeholder={'Digite o seu peso...'}
                                    keyboardType={'numeric'}
                                    onChangeText={(peso) => this.setState({ peso })}
                                />
                            </View>
                            <View style={{ minHeight: 30, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textOverField}>Pressão</Text>
                                    <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                                        <TextInput
                                            textColor={black}
                                            tintColor={black}
                                            baseColor={black}
                                            style={styles.text}
                                            keyboardType={'numeric'}
                                            placeholder={'Ex: 12'}
                                            value={this.state.pressao_x}
                                            onChangeText={(pressao_x) => this.setState({ pressao_x })}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textOverField}></Text>
                                    <View style={[styles.containerTextInput, { marginStart: 8 }]}>
                                        <TextInput
                                            textColor={black}
                                            tintColor={black}
                                            baseColor={black}
                                            style={styles.text}
                                            keyboardType={'numeric'}
                                            placeholder={'Ex: 8'}
                                            value={this.state.pressao_y}
                                            onChangeText={(pressao_y) => this.setState({ pressao_y })}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.textOverField}>Observação</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    value={this.state.observacao}
                                    placeholder={'Digite o nome do médico...'}
                                    onChangeText={(observacao) => this.setState({ observacao })}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.saveAndCloseWindow()
                                }}
                                style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 24 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>{avancarButtonLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
        padding: 16
    },
    containerTextInput: {
        minHeight: 30,
        marginTop: 6,
        paddingStart: 6,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: white
    },
    textOverField: {
        marginTop: 16,
        fontSize: 16,
        color: fontColor
    },
    fundoImage: {
        height: '100%'
    },
    saudacaoStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor
    },
});
