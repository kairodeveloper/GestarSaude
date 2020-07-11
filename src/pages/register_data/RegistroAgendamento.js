import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Modal,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native'
import {
    colorPrimaryDark,
    colorPrimary,
    colorFundo,
    black,
    blackSemiTransparent,
    white,
    fontColor
} from '../../../colors';

import {
    saudacaoStep1,
} from '../../../strings';
import DatePicker from 'react-native-datepicker'
import {getNextMid, saveThis, findFirstByFilter, updateThis} from '../../../realm_services/RealmService';

import ModalImages from "../../modals/ModalImages";
import {getScheduleConsultationAlert} from "../../global_components/GlobalFunctions";

export default class RegistroAgendamento extends Component {

    static navigationOptions = {
        headerTitle: 'Novo Agendamento'
    }

    constructor(props) {
        super(props)
        const {navigation} = this.props

        let edit = false
        let midAgendamento = navigation.getParam('midAgendamento', 0)

        let agendamento = {}
        let nome = ""
        let date = new Date()
        let hora = ""

        if (midAgendamento !== 0) {
            agendamento = findFirstByFilter('Agendamento', 'mid = ' + midAgendamento)

            nome = agendamento.nome
            date = agendamento.data
            hora = agendamento.hora

            edit = true
        }

        this.state = {
            agendamento: agendamento,
            nome: nome,
            date: date,
            hora: hora,
            dateHasChange: false,
            isModalVisible: false,
            edit: edit
        }
    }

    saveAndCloseWindow() {
        let agendamento = {}

        if (this.state.dateHasChange) {
            let date = this.state.date.split("/")
            let dateD = new Date()
            dateD.setFullYear(parseInt(date[2], 10), parseInt(date[1],
                10) - 1, parseInt(date[0], 10))
            agendamento.data = dateD
        } else {
            agendamento.data = this.state.date
        }

        agendamento.nome = this.state.nome
        agendamento.hora = this.state.hora

        getScheduleConsultationAlert(agendamento);

        if (this.state.edit) {
            let fields = ['data', 'nome', 'hora']

            agendamento.mid = this.state.agendamento.mid
            updateThis('Agendamento', agendamento, fields)
        } else {
            agendamento.mid = getNextMid('Agendamento')
            agendamento.createdAt = new Date()
            agendamento.removido = false

            saveThis('Agendamento', agendamento)
        }

        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }

    closeModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
        let modal = <Modal
            animationType="slide"
            visible={this.state.isModalVisible}
            transparent>
            <View style={styles.containerModal}>
                <View style={styles.viewContentModal}>
                    <ModalImages
                        image={this.state.selectedImage}
                        closeModal={this.closeModal}/>
                </View>
            </View>
        </Modal>


        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark}/>
                <View style={styles.container}>
                    {modal}
                    <ScrollView>
                        <View style={styles.containerContent}>
                            <Text style={styles.saudacaoStyle}>{saudacaoStep1}</Text>
                            <Text style={styles.textOverField}>Nome do local da consulta</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    value={this.state.nome}
                                    placeholder={'Nome...'}
                                    onChangeText={(nome) => this.setState({nome})}
                                />
                            </View>
                            <Text style={styles.textOverField}>Data da consulta</Text>
                            <View style={{height: 50, flexDirection: 'row'}}>
                                <DatePicker
                                    style={{marginTop: 6, color: black, flex: 1}}
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
                                        this.setState({date: date, dateHasChange: true})
                                    }}
                                />
                            </View>

                            <Text style={styles.textOverField}>Horário que deseja ser notificada</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    value={this.state.hora}
                                    placeholder={'Escreva no formato hh:mm | Ex.: 15:30'}
                                    onChangeText={(hora) => this.setState({hora})}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    this.saveAndCloseWindow()
                                }}
                                style={{
                                    height: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 25,
                                    backgroundColor: colorPrimary,
                                    marginTop: 24
                                }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', color: white}}>SALVAR</Text>
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
    item: {
        marginTop: 5,
        borderRadius: 15,
        marginStart: 16,
        height: 50,
        width: 50,
    }
});
