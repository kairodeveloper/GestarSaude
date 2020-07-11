import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import { blackSemiTransparent, textCard, white, fontColor } from "../../colors";
import { ICONLOWRISK, ICONMEDIUMRISK, ICONHIGHRISK, ICONCLOSE } from '../../images';
import { getIconRegiaoById } from '../global_components/GlobalFunctions';

export default class ModalFatorRisco extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: props.modalVisible
        };
    }

    getMessageByState(state) {
        if (state>=10) {
            return {
                title: "ATENÇÃO",
                message: "Gravidez de alto risco!"
            }
        } else if (state<10 && state>= 5) {
            return {
                title: "CUIDADO",
                message: "Gravidez de médio risco!"
            }
        } else {
            return {
                title: "TUDO CERTO",
                message: "Gravidez de baixo risco!"
            }
        }
    }

    getIconByState(state) {
        if (state>=10) {
            return ICONHIGHRISK
        } else if (state<10 && state>= 5) {
            return ICONMEDIUMRISK
        } else {
            return ICONLOWRISK
        }
    }

    render() {
        return (

            <View style={styles.cardContent}>
                <View style={styles.viewTitleModal}>
                    <View style={styles.viewTitleImageModal}>
                        <Image source={this.getIconByState(this.props.result)} style={styles.imageModal} />
                    </View>
                    <View style={styles.viewTextImageModal}>
                        <Text style={styles.titleModal}>{this.getMessageByState(this.props.result).title}</Text>
                        <Text style={styles.subtitleModal}>{this.getMessageByState(this.props.result).message}</Text>
                    </View>
                    <View style={styles.viewImageCloseModal}>
                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                            <Image source={ICONCLOSE} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    cardContent: {
        flex: 1
    },
    viewTitleModal: {
        minHeight: 50,
        flexDirection: 'row'
    },
    viewTitleImageModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewImageCloseModal: {
        flex: 1,
        alignItems: 'center',
        marginTop: 6
    },
    viewTextImageModal: {
        flex: 3,
        paddingStart: 16
    },
    imageModal: {
        height: 50,
        width: 50
    },
    titleModal: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    subtitleModal: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    viewContentModal: {
        flex: 1,
        marginTop: 16
    },
    item: { 
        minHeight: 50, 
        backgroundColor: white, 
        elevation: 2, 
        shadowOpacity: 10, 
        borderRadius: 15, 
        marginBottom: 16, 
        padding: 6, 
        paddingStart: 16, 
        paddingEnd: 16, 
        justifyContent: 'center'
    },
    titleItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: fontColor
    },
    subtitleItem: {
        fontSize: 14,
        color: fontColor
    }
});

module.exports = ModalFatorRisco