import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Modal,
} from 'react-native'
import {
    blackSemiTransparent, colorPrimary, textCard, white, colorFundo, fontColor
} from '../../colors';
import ModalSindromeDefinition from "../modals/ModalSindromeDefinition";
import { getDefinicoes } from '../global_components/GlobalFunctions';

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
        const {navigation} = this.props

        let tipoQuadro = navigation.getParam('tipoQuadro', 1)
        this.items = getDefinicoes(tipoQuadro)

        this.state = {
            isAndroid: Platform.OS=="android",
            isModalVisible: false,
            selectedItem: null,
            tipoQuadro: tipoQuadro
        };

    }

    closeModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    showModal = (item) => this.setState({ 
        isModalVisible: true,
        selectedItem: item 
    })

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {
            this.showModal(item)
        }} style={ this.state.isAndroid ? styles.itemAndroid : styles.itemIos}>
            <Text style={styles.titleItem}>{item.name}</Text>
        </TouchableOpacity>
    );

    render() {
        let modal = <Modal
                        animationType="slide"
                        visible={this.state.isModalVisible}
                        transparent>
                        <View style={styles.containerModal}>
                            <View style={styles.viewContentModal}>
                                <ModalSindromeDefinition
                                    item={this.state.selectedItem}
                                    closeModal={this.closeModal} />
                            </View>
                        </View>
                    </Modal>

        return (
            <View style={styles.safeView}>
                {modal}
                <View style={styles.containerContent}>
                    <FlatList
                        data={this.items}
                        ItemSeparatorComponent = {this.flatListItemSeparator}
                        renderItem={this.renderItem}
                        
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeView: {
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        flexDirection: "column",
        backgroundColor: colorFundo,
    },

    containerContent: {
        flex: 1,
        padding: 16
    },

    cardContent: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        padding: 20,
        textAlign: 'justify',
        backgroundColor: white,
        borderRadius: 10,
        elevation: 2,
        shadowOpacity: 10
    },

    containerModal: {
        flex: 1,
        backgroundColor: blackSemiTransparent,
        justifyContent: 'center',
        alignItems: 'center'
    },

    itemAndroid: {
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

    itemIos: {
        minHeight: 50, 
        backgroundColor: white, 
        borderWidth: 1,
        borderColor: fontColor, 
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
        textAlign: 'center',
        color: fontColor
    },

    viewContentModal: {
        height: '60%',
        width: '75%',
        backgroundColor: white,
        borderRadius: 25,
        padding: 16
    },

    syndroTitle: {
        fontSize: 22,
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        color: textCard,
        fontWeight: 'bold',

    },

});
