import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity, Image, ScrollView,
} from 'react-native'
import {
    black,
    blackSemiTransparent, colorPrimary, white, colorFundo,
} from '../../colors';
import {NEXT, PREVIOUS, ICONCALENDAR} from "../../images";
import {FormatDateToString, getScheduleConsultationAlert} from "../global_components/GlobalFunctions";
import {findAllNotRemoved, findFirstByFilter} from "../../realm_services/RealmService";


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

        const { navigation } = this.props;

        let agendamentosBD = findAllNotRemoved('Agendamento');
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
                <ScrollView>
                <View style={styles.listConsultations}>
                    {this.state.agendamentos.map((item) => {
                        return (
                            <TouchableOpacity style={styles.consultationCard}
                                              onPress={() => this.props.navigation.navigate('ConsultationSchedules')}>
                                <View>
                                    <View style={styles.calendarViewAlign}>
                                        <Image source={ICONCALENDAR} style={styles.calendarStyle}/>
                                    </View>
                                    <View>
                                        <Text style={[styles.textBase, styles.textData]}>{FormatDateToString(item.data)}</Text>
                                        <Text style={[styles.textBase, styles.textConsultation]}>{item.nome}</Text>
                                        <Text style={[styles.textBase, styles.textTime]}>{item.hora}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
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
                </ScrollView>
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
        width: '100%',
        marginTop: 20,
        marginLeft: 29,

    },
    consultationCard: {
        borderWidth: 0.8,
        borderColor: blackSemiTransparent,
        width: '90%',
        backgroundColor: white,
        borderRadius: 25,
        padding: 17,
        marginBottom: 30,
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
        flex: 1,
        width: '100%',
        marginTop: '50%',
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
