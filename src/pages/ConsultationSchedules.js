import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity, Image,
} from 'react-native'
import {
    black,
    blackSemiTransparent, colorPrimary, white, colorFundo,
} from '../../colors';
import {NEXT, PREVIOUS, ICONCALENDAR} from "../../images";
import {getScheduleConsultationAlert} from "../global_components/GlobalFunctions";


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
        super(props)
    }

    render() {

        let items = [
            {name: 'UBS São Cristovão', data: '08/07/2020', time: '13:52'},
            {name: 'UBS São Miguel', data: '08/07/2020', time: '13:53'},
        ];

        items.map(item => getScheduleConsultationAlert(item.data, item.time, item.name));

        return (
            <View style={styles.safeView}>
                <View style={styles.containerData}>
                    <Image source={PREVIOUS} style={styles.arrowsStyle}/>
                    <View style={styles.dataStyle}>
                        <Text style={styles.monthStyle}>AGOSTO</Text>
                        <Text style={styles.yearStyle}>2020</Text>
                    </View>
                    <Image source={NEXT} style={styles.arrowsStyle}/>
                </View>
                <View style={styles.listConsultations}>
                    {items.map((item) => {
                        return (
                            <TouchableOpacity style={styles.consultationCard}
                                              onPress={() => this.props.navigation.navigate('ConsultationSchedules')}>
                                <View>
                                    <View style={styles.calendarViewAlign}>
                                        <Image source={ICONCALENDAR} style={styles.calendarStyle}/>
                                    </View>
                                    <View>
                                        <Text style={[styles.textBase, styles.textData]}>{item.data}</Text>
                                        <Text style={[styles.textBase, styles.textConsultation]}>{item.name}</Text>
                                        <Text style={[styles.textBase, styles.textTime]}>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}
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

});
