import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity, Image, ScrollView,
} from 'react-native'
import {
    black,
    blackSemiTransparent, colorPrimary, white, colorFundo, fontColor,
} from '../../colors';
import { ICONCALENDAR } from "../../images";
import { FormatDateToString, maskForDate } from "../global_components/GlobalFunctions";
import { findAllNotRemoved } from "../../realm_services/RealmService";


export default class ConsultationSchedules extends Component {

    static navigationOptions = {
        title: "Consultas Pré-natal",
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    constructor(props) {
        super(props);

        let agendamentosBD = findAllNotRemoved('Agendamento', 'data', true);
        let agendamentos = [];

        agendamentosBD.map((agendamento) => {
            agendamentos.push({
                mid: agendamento.mid,
                nome: agendamento.nome,
                data: agendamento.data,
                hora: agendamento.hora,
            })
        })

        this.state = {
            agendamentos: agendamentos
        }
    }

    refreshAgendamentos = () => {
        let agendamentos = findAllNotRemoved('Agendamento')
        this.setState({
            agendamentos: agendamentos
        });
    }

    render() {

        // items.map(item => getScheduleConsultationAlert(item.data, item.time, item.name));

        return (
            <View style={styles.safeView}>
                <View style={styles.listConsultations}>
                    <ScrollView>
                        <View>
                            {this.state.agendamentos.map((item) => {
                                return (
                                    <TouchableOpacity style={styles.consultationCard}
                                        onPress={() => this.props.navigation.navigate('ConsultationSchedules')}>
                                        <View>
                                            <View style={styles.calendarViewAlign}>
                                                <Image source={ICONCALENDAR} style={styles.calendarStyle} />
                                            </View>
                                            <View>
                                                <Text style={[styles.textBase, styles.textData]}>{maskForDate(item.data)}</Text>
                                                <Text style={[styles.textBase, styles.textConsultation]}>{item.nome}</Text>
                                                <Text style={[styles.textBase, styles.textTime]}>{item.hora}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonAddView}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('RegistroAgendamento', {
                                onGoBack: this.refreshAgendamentos,
                                numeroAgendamentos: this.state.agendamentos.length
                            })
                        }}
                        style={styles.buttonAddSchedule}>
                        <Text style={styles.textButtonAdd}>NOVO AGENDAMENTO</Text>
                    </TouchableOpacity>
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
        backgroundColor: colorFundo,
    },
    containerData: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    dataStyle: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 40,
        marginRight: 40
    },
    monthStyle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    yearStyle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    arrowsStyle: {
        height: 25,
        width: 25,
        paddingLeft: 20,
    },
    listConsultations: {
        flex: 1,
        padding: 16
    },
    consultationCard: {
        borderWidth: 1,
        borderColor: fontColor,
        minHeight: 60,
        backgroundColor: white,
        borderRadius: 25,
        padding: 16,
        marginBottom: 16,
    },
    calendarStyle: {
        height: 35,
        width: 35,
    },
    calendarViewAlign: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    textBase: {
        color: black,
    },
    textConsultation: {
        fontSize: 30,
        paddingTop: 4,
        paddingBottom: 4,
    },
    textData: {
        fontSize: 18,
    },
    textTime: {
        fontSize: 18,
    },
    buttonAddView: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAddSchedule: {
        minHeight: 60,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: colorPrimary,
    },
    textButtonAdd: {
        fontSize: 18,
        fontWeight: 'bold',
        color: white
    }
});