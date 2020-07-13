import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    Dimensions,
} from 'react-native'
import {
    colorFundo, fontColor, white, blackSemiTransparent,
} from '../../../colors';
import { ScrollView } from 'react-native-gesture-handler';
import { FLUXO3, FLUXO4 } from '../../../images';

export default class FluxoAtendimento extends Component {

    static navigationOptions = {
        title: "Fluxo de atendimento"
    }

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={styles.safeView}>
                <View style={styles.containerContent}>
                    <ScrollView>
                        <View style={styles.containerButtons}>
                            <Text style={styles.titlePage}>Estou grávida, onde devo realizar meu pré-natal:</Text>
                            <Text style={styles.subtitlePage}>
                                Unidade Básica de Saúde mais próxima da sua residência.
                            </Text>
                            <View style={{height: 16}} />
                            <Text style={styles.subitemTitle}>
                                - Durante seu pré-natal serão realizadas consultas pelo médico e enfermeiro, exames, vacinas, e também programar uma visita à maternidade onde acontecerá seu parto, tudo isso de preferência, acompanhada do pai do bebê. {"\n"}
                            </Text>
                            <Text style={styles.subitemTitle}>
                                - Em cada consulta você será avaliada, se apresentar alguma alteração clínica, e for classificada como alto risco, você será encaminhada para um serviço especializado, mas continuará realizando suas consultas também na Unidade Básica de Saúde. {"\n"}
                            </Text>
                            <Text style={styles.subitemTitle}>
                                - Se durante a gestação, você apresentar algum sintoma como sangramento, dor de cabeça intensa, dentre outros, procure imediatamente a Maternidade mais próxima. Você pode ligar também para o SAMU (192). {"\n"}
                            </Text>
                            <Text style={styles.subitemTitle}>
                                - Após o parto, você e seu bebê continuarão sendo acompanhados pela equipe da Estratégia Saúde da Família. {"\n"}
                            </Text>
                            <Text style={styles.itemTitle}>
                                Desenho da rede de atenção à gestante de alto risco no Piauí/Estabelecimentos de saúde.
                            </Text>
                            <Image source={FLUXO3} style={{ marginTop: 16, alignSelf: 'center', height: Dimensions.get('screen').width, width: Dimensions.get('screen').width}} />
                            <Text style={styles.subitemTitle}>Mapa do Piauí por região de saúde com estabelecimentos que realizam Parto Cesárea e Parto Vaginal. Fonte: BRASIL, 2020.</Text>

                            <Image source={FLUXO4} style={{ marginTop: 16, alignSelf: 'center', height: Dimensions.get('screen').width, width: Dimensions.get('screen').width}} />
                            <Text style={styles.subitemTitle}>Pontos de atenção de assistência à gestante.</Text>
                            <View style={{height: 32}} />
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
        backgroundColor: colorFundo
    },

    containerContent: {
        flex: 1,
        alignItems: 'center'
    },

    containerButtons: {
        flex: 1,
        flexDirection: 'column'
    },
    textInfo: {
        fontSize: 24,
        marginTop: 5,
        paddingTop: 10,
        paddingLeft: 20,
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: fontColor,
        textAlign: 'left'
    },
    textPhone: {
        fontSize: 20,
        fontWeight: 'bold',
        color: fontColor,
        textAlign: 'right'
    },
    titlePage: {
        fontSize: 24,
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        color: fontColor,
        fontWeight: 'bold'
    },
    chapterTitle: {
        fontSize: 20,
        color: fontColor,
        fontWeight: 'bold',
        marginTop: 16
    },
    itemTitle: {
        fontSize: 18,
        marginStart: 16,
        marginEnd: 16,
        color: fontColor,
        fontWeight: 'bold',
        marginTop: 16
    },
    subitemTitle: {
        fontSize: 16,
        color: fontColor,
        marginStart: 16,
        marginEnd: 16,
        textAlign: 'justify'
    },
    subtitlePage: {
        fontSize: 18,
        color: fontColor,
        marginStart: 16,
        marginEnd: 16,
        textAlign: 'justify'
    },
    cardData: {
        minHeight: 50,
        borderBottomWidth: 0.5,
        borderColor: blackSemiTransparent,
        alignItems: 'flex-start',
        padding: 16
    }

});