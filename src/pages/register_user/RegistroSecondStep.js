import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    Alert,
    Image,
    Dimensions,
    ToastAndroid,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Platform,
    StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor } from '../../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE, ICONPLUS } from '../../../images'
import {
    cepPlaceholder,
    saudacaoStep2,
    nomeCompletoLabel,
    nomeCompletoPlaceholder,
    cepLabel,
    idadePlaceholder,
    idadeLabel,
    bairroLabel,
    bairroPlaceholder,
    logradouroLabel,
    numCasaLabel,
    logradouroPlaceholder,
    numCasaPlaceholder,
    avancarButtonLabel
} from '../../../strings';
import { ScrollView } from 'react-native-gesture-handler';

export default class RegistroSecondStep extends Component {

    static navigationOptions = {
        headerTitle: 'Quase lá...'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        let user = navigation.getParam('user', {})

        let ubses = []

        for (let index = 0; index < 10; index++) {
            const element = {}
            element.nome = "UBS " + index

            ubses.push(element)
        }

        this.state = {
            ubses: ubses,
            user: user,
            cartao_sus: ""
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.containerContent}>
                            <Text style={styles.saudacaoStyle}>{saudacaoStep2}</Text>

                            <Text style={styles.textOverField}>Número do cartão do SUS</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    keyboardType={'numeric'}
                                    placeholder={"000 0000 0000 0000"}
                                    value={this.state.cartao_sus}
                                    onChangeText={(cartao_sus) => this.setState({ cartao_sus })}
                                />
                            </View>

                            {/*<TouchableOpacity
                                onPress={() => {

                                }}
                                style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimaryDark, marginTop: 24 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>Localizar UBS mais próxima</Text>
                            </TouchableOpacity>

                            <Text style={styles.textOverField}>UBSes localizadas</Text>
                            <View style={{ height: 100, marginTop: 6, borderRadius: 15 }}>
                                <FlatList
                                    extraData={this.state}
                                    horizontal={true}
                                    data={this.state.ubses}
                                    snapToAlignment={"center"}
                                    flex={1}
                                    style={{ height: 100 }}
                                    renderItem={({ item }) =>
                                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingStart: 6, paddingEnd: 6, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
                                            <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: fontColor, height: 75, minWidth: 75, width: '100%', backgroundColor: white, borderRadius: 50, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={ICONPLUS} style={{ height: 32, width: 32 }} />
                                            </View>
                                            <Text style={{ color: black, fontWeight: 'bold', marginTop: 6, fontSize: 12, marginTop: 4 }}>{item.nome}</Text>

                                        </View>
                                    }
                                />
                                </View>*/}

                            <TouchableOpacity
                                onPress={() => {
                                    let user = this.state.user
                      
                                    user.cartao_sus = this.state.cartao_sus
                                    this.props.navigation.navigate('RegistroThirdStep', { user: user })
                                }}
                                style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 16 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>{avancarButtonLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        backgroundColor: colorFundo
    },
    containerContent: {
        flex: 1,
        padding: 16
    },
    containerTextInput: {
        minHeight: 30,
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: white
    },
    fundoImage: {
        height: '100%'
    },
    saudacaoStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor
    },
    textOverField: {
        marginTop: 16,
        fontSize: 16,
        color: fontColor
    }
});
