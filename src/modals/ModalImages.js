import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import { blackSemiTransparent, textCard, white, fontColor } from "../../colors";
import { ICONCOCAIS, ICONCLOSE } from '../../images';
import { getIconRegiaoById } from '../global_components/GlobalFunctions';

export default class ModalImages extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: props.modalVisible
        };
    }

    formatText(stringModal) {
        if (stringModal.length > 12) {
            return stringModal.substring(0, 11) + "..."
        }

        return stringModal
    }

    render() {
        return (

            <View style={styles.cardContent}>
                <View style={styles.viewTitleModal}>
                    <View style={styles.viewTitleImageModal}>
                    </View>
                    <View style={styles.viewTextImageModal}>
                    </View>
                    <View style={styles.viewImageCloseModal}>
                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                            <Image source={ICONCLOSE} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewContentModal}>
                    <Image source={{ uri: this.props.image.uri }} style={{width: '100%', aspectRatio: 1}} />

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
        width: '100%'
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

module.exports = ModalImages