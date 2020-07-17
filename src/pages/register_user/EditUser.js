import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    ScrollView,
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
import { colorPrimaryDark, colorPrimary, pink,fontColor, colorFundo, black, blue, white  } from '../../../colors';
import { ICONBOY, ICONGIRL } from '../../../images'
import {
    cepPlaceholder,
    saudacaoStep1,
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
    avancarButtonLabel,
    saudacaoStep2,
    saudacaoStep3
} from '../../../strings';
import { findFirstByFilter, updateThis } from '../../../realm_services/RealmService';
import DatePicker from 'react-native-datepicker'

export default class EditUser extends Component {

    static navigationOptions = {
        headerTitle: 'Editar usuário'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        let is_edit = navigation.getParam('is_edit', 0)

        let nome = ""
        let idade = ""
        let cep = ""
        let bairro = ""
        let logradouro = ""
        let num_casa = ""
        let usuario = {}
        let edit = false
        let cartao_sus = ""

        let gravidez = {}
        let semana = ""
        let date = new Date()
        let peso = ""
        let nome_bebe = ""
        let is_male = false

        if (is_edit == 1) {
            usuario = findFirstByFilter('Usuario', 'removido = false')
            gravidez = findFirstByFilter('Gravidez', 'removido = false')

            nome = usuario.nome
            idade = usuario.idade.toString()
            cep = usuario.cep
            bairro = usuario.bairro
            logradouro = usuario.logradouro
            num_casa = usuario.num_casa.toString()
            cartao_sus = usuario.cartao_sus

            semana = gravidez.semana.toString()
            date = gravidez.dpp
            peso = gravidez.peso.toString()
            nome_bebe = gravidez.nome_bebe
            is_male = gravidez.is_male

            edit = true
        }


        this.state = {
            nome: nome,
            idade: idade,
            cep: cep,
            bairro: bairro,
            logradouro: logradouro,
            num_casa: num_casa,
            cartao_sus: cartao_sus,
            usuario: usuario,
            gravidez: gravidez,
            semana: semana,
            date: date,
            dateHasChange: false,
            peso: peso,
            nome_bebe: nome_bebe,
            is_male: is_male,
            edit: edit
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps={'handled'}>
                        <View style={styles.containerContent}>
                            <Text style={styles.saudacaoStyle}>{saudacaoStep1}</Text>
                            <Text style={styles.textOverField}>{nomeCompletoLabel}</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={nomeCompletoPlaceholder}
                                    value={this.state.nome}
                                    onChangeText={(nome) => this.setState({ nome })}
                                />
                            </View>

                            <Text style={styles.textOverField}>{idadeLabel}</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={idadePlaceholder}
                                    keyboardType={'numeric'}
                                    value={this.state.idade}
                                    onChangeText={(idade) => this.setState({ idade })}
                                />
                            </View>
                            <Text style={styles.textOverField}>{cepLabel}</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    keyboardType={'numeric'}
                                    placeholder={cepPlaceholder}
                                    value={this.state.cep}
                                    onChangeText={(cep) => this.setState({ cep })}
                                />
                            </View>
                            <Text style={styles.textOverField}>{bairroLabel}</Text>
                            <View style={styles.containerTextInput}>
                                <TextInput
                                    textColor={black}
                                    tintColor={black}
                                    baseColor={black}
                                    style={styles.text}
                                    placeholder={bairroPlaceholder}
                                    value={this.state.bairro}
                                    onChangeText={(bairro) => this.setState({ bairro })}
                                />
                            </View>
                            <View style={{ minHeight: 30, flexDirection: 'row' }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.textOverField}>{logradouroLabel}</Text>
                                    <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                                        <TextInput
                                            textColor={black}
                                            tintColor={black}
                                            baseColor={black}
                                            style={styles.text}
                                            placeholder={logradouroPlaceholder}
                                            value={this.state.logradouro}
                                            onChangeText={(logradouro) => this.setState({ logradouro })}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={styles.textOverField}>{numCasaLabel}</Text>
                                    <View style={[styles.containerTextInput, { marginStart: 8 }]}>
                                        <TextInput
                                            textColor={black}
                                            tintColor={black}
                                            baseColor={black}
                                            style={styles.text}
                                            keyboardType={'numeric'}
                                            placeholder={numCasaPlaceholder}
                                            value={this.state.num_casa}
                                            onChangeText={(num_casa) => this.setState({ num_casa })}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.saudacaoStyle, { marginTop: 16 }]}>{saudacaoStep2}</Text>
                            <Text style={styles.textOverField}>Número do cartão do SUS</Text>
                            <View style={[styles.containerTextInput, { marginStart: 8 }]}>
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
                            <Text style={[styles.saudacaoStyle, { marginTop: 16 }]}>{saudacaoStep3}</Text>

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
                            <Text style={styles.textOverField}>Data de previsão do parto</Text>
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <DatePicker
                                    style={{ marginTop: 6, color: black, flex: 1 }}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    format="DD/MM/YYYY"
                                    minDate="01-01-2000"
                                    maxDate="31-12-2100"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            height: 50,
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            backgroundColor: white,
                                            padding: 16,
                                            borderRadius: 15,
                                            borderWidth: 1,
                                            borderColor: fontColor,
                                            color: black
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({ date: date, dateHasChange: true })
                                    }}
                                />
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
                                    style={[styles.containerSelectSex, { backgroundColor: this.state.is_male ? blue : white, height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                    <Image source={ICONBOY} style={{ height: 40, aspectRatio: 1 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            is_male: !this.state.is_male
                                        })
                                    }}
                                    style={[styles.containerSelectSex, { backgroundColor: this.state.is_male ? white : pink, height: 60, alignItems: 'center', marginEnd: 8 }]}>
                                    <Image source={ICONGIRL} style={{ height: 40, aspectRatio: 1 }} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    let goOn = true
                                    let user = {}

                                    if (this.state.nome.length == 0) {
                                        alert('Preencha o nome antes...')
                                        goOn = false
                                    }

                                    if (this.state.idade.length == 0) {
                                        alert('Preencha a idade antes...')
                                        goOn = false
                                    }

                                    if (this.state.cep.length == 0) {
                                        alert('Preencha o cep antes...')
                                        goOn = false
                                    }

                                    if (this.state.bairro.length == 0) {
                                        alert('Preencha o bairro antes...')
                                        goOn = false
                                    }

                                    if (this.state.logradouro.length == 0) {
                                        alert('Preencha o logradouro antes...')
                                        goOn = false
                                    }

                                    if (this.state.num_casa.length == 0) {
                                        alert('Preencha o número da casa antes...')
                                        goOn = false
                                    }

                                    if (this.state.semana.length == 0) {
                                        alert('Preencha a semana antes...')
                                        goOn = false
                                    }

                                    if (this.state.peso.length == 0) {
                                        alert('Preencha o peso antes...')
                                        goOn = false
                                    }

                                    if (this.state.nome_bebe.length == 0) {
                                        alert('Preencha o nome antes...')
                                        goOn = false
                                    }

                                    if (goOn) {
                                        user.nome = this.state.nome
                                        user.idade = parseInt(this.state.idade, 10)
                                        user.cep = this.state.cep
                                        user.bairro = this.state.bairro
                                        user.logradouro = this.state.logradouro
                                        user.num_casa = this.state.num_casa
                                        user.cartao_sus = this.state.cartao_sus
                                        user.removido = false

                                        let gravidez = {}
                                        gravidez.semana = parseInt(this.state.semana, 10)
                                        gravidez.peso = parseFloat(this.state.peso)
                                        gravidez.nome_bebe = this.state.nome_bebe
                                        gravidez.sexo_bebe = this.state.is_male
                                        gravidez.removido = false

                                        if (this.state.dateHasChange) {
                                            let date = this.state.date.split("/")
                                            let dateD = new Date()
                                            dateD.setFullYear(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10))
                                            gravidez.dpp = dateD
                                        } else {
                                            gravidez.dpp = this.state.date
                                        }                                

                                        let fieldsUsuario = [ "nome", "idade", "cep", "bairro", "logradouro", "num_casa", "cartao_sus", "removido" ]
                                        let fieldsGravidez = [ "semana", "peso", "nome_bebe", "sexo_bebe", "dpp", "removido" ]

                                        user.mid = this.state.usuario.mid
                                        gravidez.mid = this.state.gravidez.mid

                                        updateThis('Usuario', user, fieldsUsuario)
                                        updateThis('Gravidez', gravidez, fieldsGravidez)
                                        
                                        this.props.navigation.state.params.onGoBack()
                                        this.props.navigation.goBack()
                                    }
                                }}
                                style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 24 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>EDITAR</Text>
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
        minHeight: 50,
        marginTop: 6,
        paddingStart: 6,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: "center",
        backgroundColor: white
    },
    containerSelectSex: {
        minHeight: 50,
        marginTop: 6,
        flex: 1,
        justifyContent: "center",
        borderWidth: 1,
        
        borderRadius: 15,
        backgroundColor: white
    },
    textOverField: {
        marginTop: 16,
        fontSize: 16,
        color: fontColor
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
