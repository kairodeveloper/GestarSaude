import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
} from 'react-native'
import {
    blackSemiTransparent, colorPrimary,
} from '../../colors';


export default class SyndromeDefinition extends Component {

    static navigationOptions = {
        title: "Definições de síndromes",
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
            {name: 'UBS São Cristovão', data: '11/08/2019', time: '09:00'},
            {name: 'UBS São Cristovão', data: '07/08/2019', time: '08:00'},
        ];

        return (
            <View style={styles.safeView}>
                <View style={styles.dataStyle}>
                    <Text style={styles.monthStyle}>AGOSTO</Text>
                    <Text style={styles.yearStyle}>2019</Text>
                </View>
                <View style={styles.containerContent}>
                    <View style={styles.containerButtons}>
                        {items.map((item) => {
                            return (<TouchableOpacity style={[styles.button, {marginBottom: 6}]}
                                                      onPress={() => this.props.navigation.navigate('ConsultationSchedules')}>
                                <Text style={styles.textName}>{item.name}</Text>
                                <Text style={styles.textPhone}>{item.phone}</Text>
                            </TouchableOpacity>)
                        })}
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
        backgroundColor: "#fff",
    },

    dataStyle: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 20
    },

    monthStyle: {
        fontSize: 20,
        fontWeight: "bold"
    },

    yearStyle: {
        fontSize: 14,
        fontWeight: "bold"
    },

    containerContent: {
        flex: 1,
        alignItems: 'center'
    },

    containerButtons: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        marginLeft: 29,
    },
    button: {
        height: 60,
        borderWidth: 3,
        borderColor: blackSemiTransparent,
        width: '90%',
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16
    },
    textInfo: {
        fontSize: 24,
        marginTop: 5,
        paddingTop: 10,
        paddingLeft: 20,
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5b5959',
        textAlign: 'left'
    },
    textPhone: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5b5959',
        textAlign: 'right'
    }
});
