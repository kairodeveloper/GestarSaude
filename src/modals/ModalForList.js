import React, {Component} from 'react'

import {View, Text, StyleSheet, ScrollView, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';
import {blackSemiTransparent, textCard} from "../../colors";

export default class ModalForList extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props, item) {
        super(props)
        this.item = item;
    }

    state = {
        modalVisible: false,
    }

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.cardContent}
                onPress={() => {
                    this.toggleModal(true)
                }}>
                <Text style={styles.syndroTitle}>{this.item.name}</Text>
                <Modal animationType={"slide"} transparent={false}
                       visible={this.state.modalVisible}>
                    <ScrollView>
                        <View style={styles.modal}>
                            <Text style={styles.syndroTitle}>{this.item.name}</Text>
                            <Text style={styles.syndroDescription}>{this.item.description}</Text>

                            <TouchableHighlight onPress={() => {
                                this.toggleModal(!this.state.modalVisible)
                            }}>
                                <Text style={styles.text}>Voltar</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </Modal>
            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },

    syndroTitle: {
        fontSize: 25,
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        color: textCard,
        fontWeight: 'bold',

    },
    syndroDescription: {
        fontSize: 21,
        fontWeight: 'bold',
        color: textCard,

    },
    modal: {
        flex: 1,
        margin: 8,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
        backgroundColor: blackSemiTransparent,
        borderRadius: 10,
    },

});

module.exports = ModalForList