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
import { ICONGIRL, ICONBOY } from '../../../images'
import {
    cepPlaceholder,
    saudacaoStep3,
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

export default class RegistroThirdStep extends Component {

    static navigationOptions = {
        headerTitle: 'Último passo'
    }

    constructor(props) {
        super(props)

        let ubses = []

        for (let index = 0; index < 10; index++) {
            const element = {}
            element.nome = "UBS "+index

            ubses.push(element)
        }

        this.state = {
            fullname: "",
            ubses: ubses
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <View style={styles.containerContent}>
                        <Text style={styles.saudacaoStyle}>{saudacaoStep3}</Text>
                        
                        <Text>Você está em qual semana da sua gravidez?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.containerTextInput, { alignItems: 'center', marginEnd: 8 }]}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={"000"}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </View>
                            <View flex={2} />
                        </View>

                        <Text>Qual seu peso atual?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.containerTextInput, { alignItems: 'center', marginEnd: 8 }]}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={"000"}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </View>
                            <View style={{flex: 2, flexDirection: 'column-reverse'}}>
                                <Text>kg</Text>
                            </View>
                        </View>

                        <Text>Qual o nome do bebê?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.containerTextInput, { alignItems: 'center', marginEnd: 8 }]}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={"Digite o nome do bebê"}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </View>
                        </View>

                        <Text>Qual o sexo do bebê?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.containerTextInput, { height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                <Image source={ICONBOY} style={{height: 56, width: 56}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.containerTextInput, { height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                <Image source={ICONGIRL} style={{height: 56, width: 56}} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 16 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>FINALIZAR</Text>
                        </TouchableOpacity>
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
        flex: 1,
        borderWidth: 1,
        borderRadius: 15
    },
    fundoImage: {
        height: '100%'
    },
    saudacaoStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor
    },
});
