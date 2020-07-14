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
import { getNextMid, saveThis, findFirstByFilter, updateThis } from '../../../realm_services/RealmService'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'

export default class RegistroThirdStep extends Component {

    static navigationOptions = {
        headerTitle: 'Último passo'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props

        let edit = navigation.getParam('edit', false)
        let usuario = navigation.getParam('usuario', {})
        let user = navigation.getParam('user', {})
 
        let gravidez = {}

        let semana = ""
        let date = new Date()
        let peso = ""
        let nome_bebe = ""
        let is_male = false

        if (edit) {
            gravidez = findFirstByFilter('Gravidez', 'removido = false')
            
            semana = gravidez.semana.toString()
            date = gravidez.dpp
            peso = gravidez.peso.toString()
            nome_bebe = gravidez.nome_bebe
            is_male = gravidez.is_male
        }

        this.state = {
            user: user,
            semana: semana,
            date: date,
            dateHasChange: false,
            peso: peso,
            nome_bebe: nome_bebe,
            is_male: is_male,
            edit: edit,
            usuario: usuario,
            gravidez: gravidez
        }
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps={'handled'}>
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
                                    let user = this.state.user

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
                                        let usuario = {}
                                        usuario.nome = user.nome
                                        usuario.idade = parseInt(user.idade)
                                        usuario.cep = user.cep
                                        usuario.bairro = user.bairro
                                        usuario.logradouro = user.logradouro
                                        usuario.num_casa = user.num_casa
                                        usuario.cartao_sus = user.cartao_sus
                                        usuario.removido = false

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

                                        if (this.state.edit) {
                                            let fieldsUsuario = [ "nome", "idade", "cep", "bairro", "logradouro", "num_casa", "cartao_sus", "removido" ]
                                            let fieldsGravidez = [ "semana", "peso", "nome_bebe", "sexo_bebe", "dpp", "removido" ]

                                            usuario.mid = this.state.usuario.mid
                                            gravidez.mid = this.state.gravidez.mid

                                            updateThis('Usuario', usuario, fieldsUsuario)
                                            updateThis('Gravidez', gravidez, fieldsGravidez)
                                        } else {
                                            usuario.mid = getNextMid('Usuario')
                                            usuario.createdAt = new Date()
                                            saveThis('Usuario', usuario)

                                            gravidez.mid = getNextMid('Gravidez')
                                            gravidez.createdAt = new Date()
                                            saveThis('Gravidez', gravidez)    
                                        }

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
        minHeight: 50,
        marginTop: 6,
        flex: 1,
        justifyContent: "center",
        borderWidth: 1,
        paddingStart: 16,
        borderRadius: 15,
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
