import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native'
import {
    blackSemiTransparent,
} from '../../colors';

export default class Contatos extends Component {

    static navigationOptions = {
        title: "Contatos para ajuda"
    }

    constructor(props) {
        super(props)
    }

    render() {

        let items = [
            {name: 'SAMU', phone: '192'},
            {name: 'BOMBEIROS', phone: '193'},
            {name: 'MATERNIDADE DONA', phone: '3221-0219'},
        ];

        return (
            <View style={styles.safeView}>
                <Text style={[styles.textName, styles.textInfo]}>Contatos que podem ser úteis a você</Text>
                <View style={styles.containerContent}>
                    <View style={styles.containerButtons}>
                        {items.map((item) => {
                            return (<View style={[styles.button, {marginBottom: 6}]}>
                                <Text style={styles.textName}
                                      onPress={() => this.props.navigation.navigate('Main')}>{item.name}</Text>
                                <Text style={styles.textPhone}>{item.phone}</Text>
                            </View>)
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
