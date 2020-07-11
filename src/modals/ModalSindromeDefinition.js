import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity, Linking } from 'react-native';
import { blackSemiTransparent, textCard, white, fontColor } from "../../colors";
import { ICONCOCAIS, ICONCLOSE } from '../../images';
import { getIconRegiaoById } from '../global_components/GlobalFunctions';
import { ScrollView } from 'react-native-gesture-handler';

export default class ModalSindromeDefinition extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: props.modalVisible
        };
    }

/*
http://www.saude.pi.gov.br/ckeditor_assets/attachments/1762/LINHAS-GERAIS-PARA-QUALIFICACAO-DO-CUIDADO-PRE-NATAL.pdf

(esse link é deve estar disponível nas informações do Quadro 02: Fatores de risco gestacional, Teresina, 2020.
*/

/*
https://pubmed.ncbi.nlm.nih.gov/28133834/

esse link vai para o Quadro 04: Recomendação de prática clínica, Teresina, 2020; ITEM: 35 a 37 semanas.
*/

    render() {
        return (

            <View style={styles.cardContent}>
                <View style={styles.viewTitleModal}>
                    <View style={styles.viewTextImageModal}>
                        <Text style={styles.titleModal}>{this.props.item.name}</Text>
                    </View>
                    <View style={styles.viewImageCloseModal}>
                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                            <Image source={ICONCLOSE} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.viewContentModal}>
                        <Text style={styles.subtitleItem }>{this.props.item.description}</Text>
                    </View>
                </ScrollView>
                { this.props.item.link!="" ? (
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(this.props.item.link)
                        }}
                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>LER MAIS +</Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                ) }
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
        paddingStart: 16,
        justifyContent: 'center'
    },
    imageModal: {
        height: 50,
        width: '100%'
    },
    titleModal: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign: 'center',
        color: fontColor
    },
    viewContentModal: {
        flex: 1,
        padding: 16
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'justify',
        color: fontColor 
    },
    subtitleItem: {
        fontSize: 14,
        color: fontColor,
        textAlign: 'justify'
    }
});

module.exports = ModalSindromeDefinition