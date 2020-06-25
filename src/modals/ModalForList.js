import React, {Component} from 'react'

import {View, Text, StyleSheet, ScrollView, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';
import {blackSemiTransparent, textCard} from "../../colors";

export default class ModalForList extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: props.modalVisible
        };

    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (

            <TouchableOpacity
                style={styles.cardContent}
                onPress={() => {
                    this.toggleModal(true)
                }}>
                <View>
                    <Text style={styles.closeButton}>X</Text>
                </View>
                <Text style={styles.syndroTitle}>{this.props.selectedItem.name}</Text>
                <Modal animationType="slide"
                       transparent={false}
                       visible={this.state.isModalVisible}
                       onRequestClose={() => { this.props.hideModal() }}>
                    <ScrollView>
                        <View style={styles.modal}>
                            <Text style={styles.syndroTitle}>{this.props.selectedItem.name}</Text>
                            <Text style={styles.syndroDescription}>{this.props.selectedItem.description}</Text>

                            <TouchableHighlight
                                style={styles.buttonContainer}
                                onPress={() => { this.props.hideModal() }}>
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

    closeButton: {
        textAlign: 'right',
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
        textAlign: 'justify'
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