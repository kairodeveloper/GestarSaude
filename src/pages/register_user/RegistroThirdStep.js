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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor, pink, blue } from '../../../colors';
import { ICONGIRL, ICONBOY } from '../../../images'
import {
    saudacaoStep3
} from '../../../strings';
import { NavigationActions, StackActions } from 'react-navigation';
import { getNextMid, saveThis } from '../../../realm_services/RealmService'
import { ScrollView } from 'react-native-gesture-handler';

export default class RegistroThirdStep extends Component {

    static navigationOptions = {
        headerTitle: 'Último passo'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        let user = navigation.getParam('user', {})

        this.state = {
            user: user,
            semana: "",
            peso: "",
            nome_bebe: "",
            is_male: false
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.containerContent}>
                            <Text style={styles.saudacaoStyle}>{saudacaoStep3}</Text>

                            <Text style={styles.textOverField}>Você está em qual semana da sua gravidez?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                                    <TextInput
                                        textColor={black}
                                        tintColor={black}
                                        baseColor={black}
                                        style={styles.text}
                                        keyboardType={'numeric'}
                                        placeholder={"Digite a semana da gravidez..."}
                                        value={this.state.semana}
                                        onChangeText={(semana) => this.setState({ semana })}
                                    />
                                </View>
                            </View>

                            <Text style={styles.textOverField}>Qual seu peso atual?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                                    <TextInput
                                        textColor={black}
                                        tintColor={black}
                                        baseColor={black}
                                        style={styles.text}
                                        keyboardType={'numeric'}
                                        placeholder={"Digite o seu peso..."}
                                        value={this.state.peso}
                                        onChangeText={(peso) => this.setState({ peso })}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                                    <Text>kg</Text>
                                </View>
                            </View>

                            <Text style={styles.textOverField}>Qual o nome do bebê?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                                    <TextInput
                                        textColor={black}
                                        tintColor={black}
                                        baseColor={black}
                                        style={styles.text}
                                        placeholder={"Digite o nome do bebê"}
                                        value={this.state.nome_bebe}
                                        onChangeText={(nome_bebe) => this.setState({ nome_bebe })}
                                    />
                                </View>
                            </View>

                            <Text style={styles.textOverField}>Qual o sexo do bebê?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            is_male: !this.state.is_male
                                        })
                                    }}
                                    style={[styles.containerTextInput, { backgroundColor: this.state.is_male ? blue : white, height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                    <Image source={ICONBOY} style={{ height: 56, width: 56 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            is_male: !this.state.is_male
                                        })
                                    }}
                                    style={[styles.containerTextInput, { backgroundColor: this.state.is_male ? white : pink, height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                    <Image source={ICONGIRL} style={{ height: 56, width: 56 }} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    let goOn = true
                                    let user = this.state.user

                                    if (this.state.semana.length == "") {
                                        alert('Preencha a semana antes...')
                                        goOn = false
                                    }

                                    if (this.state.peso.length == "") {
                                        alert('Preencha o peso antes...')
                                        goOn = false
                                    }

                                    if (this.state.nome_bebe.length == "") {
                                        alert('Preencha o nome antes...')
                                        goOn = false
                                    }

                                    if (goOn) {
                                        let usuario = {}
                                        usuario.mid = getNextMid('Usuario')
                                        usuario.nome = user.nome
                                        usuario.idade = parseInt(user.idade)
                                        usuario.cep = user.cep
                                        usuario.bairro = user.bairro
                                        usuario.logradouro = user.logradouro
                                        usuario.num_casa = user.num_casa
                                        usuario.cartao_sus = user.cartao_sus
                                        usuario.createdAt = new Date()
                                        usuario.removido = false

                                        let gravidez = {}
                                        gravidez.mid = getNextMid('Gravidez')
                                        gravidez.semana = parseInt(this.state.semana, 10)
                                        gravidez.peso = parseFloat(this.state.peso)
                                        gravidez.nome_bebe = this.state.nome_bebe
                                        gravidez.sexo_bebe = this.state.is_male
                                        gravidez.createdAt = new Date()
                                        gravidez.removido = false

                                        saveThis('Usuario', usuario)
                                        saveThis('Gravidez', gravidez)

                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'UserMainPage',
                                                    params: { teste: 'true' }
                                                })
                                            ]
                                        })

                                        this.props.navigation.dispatch(resetAction)
                                    }

                                }}
                                style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 16 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>FINALIZAR</Text>
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
        marginTop: 6,
        flex: 1,
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
