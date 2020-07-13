import React, { Component, AsyncStorage } from 'react'
import {
    SafeAreaView,
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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor } from '../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE, FLUXO1, FLUXO2, FLUXO3 } from '../../images'
import { removeAll, isEmpty } from '../../realm_services/RealmService';
import { saveExames } from '../global_components/GlobalFunctions';

export default class FluxoAtendimentoGestante extends Component {

    static navigationOptions = {
        headerTitle: 'Fluxo de atendimento à gestante de alto risco'
    }

    constructor(props) {
        super(props)

        //removeAll()
    }

    render() {
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.containerContent}>
                    <ScrollView>
                        <View style={styles.containerButtons}>
                            <View style={{ minHeight: 50, alignItems: 'flex-start' }}>
                                <Text style={styles.titlePage}>1º Consulta:</Text>
                                <Text style={styles.subtitlePage}>Estratificação de risco gestacional</Text>
                            </View>
                            <Text style={styles.chapterTitle}>Possibilidades:</Text>
                            <View style={{ minHeight: 50, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>a) Alto Risco</Text>
                                <Text style={styles.subitemTitle}> - encaminhamento ao pré-natal de referência para avaliação obstétrica</Text>
                            </View>

                            <Text style={styles.subitemTitle}> - Se confirmado, a paciente passará a ter a modalidade de assistência especial obrigatória, por equipe multiprofissional no pré-natal de referência, em acréscimo à que terá no local de residência na Atenção Básica, que também será obrigatória e de forma a interagir com aquela prestada no pré-natal de alto risco. O intervalo interconsultas depende de cada caso, geralmente semanal ou quinzenal.</Text>
                            <Text style={styles.subitemTitle}> - Se o alto risco não for confirmado a gestante será contra–referenciada para o pré-natal de médio ou baixo risco.</Text>

                            <View style={{ minHeight: 50, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>b) Pré-Natal de médio Risco</Text>
                            </View>

                            <Text style={styles.subitemTitle}> - Se confirmado, atendimento pré-natal por médico/ enfermeiro;</Text>
                            <Text style={styles.subitemTitle}> - Cuidados especiais recomendados;</Text>
                            <Text style={styles.subitemTitle}> - Intervalo interconsultas: mensal até o 6º mês, quinzenal no 7º e 8º meses e semanal no 9º mês, ou a intervalo menor, se necessário;</Text>
                            <Text style={styles.subitemTitle}>Manter assistência obrigatória na Atenção Básica, se o atendimento ocorrer fora desta. </Text>
                            
                            <View style={{ minHeight: 50, alignItems: 'flex-start' }}>
                                <Text style={styles.itemTitle}>c) Risco habitual:</Text>
                            </View>
                            <Text style={styles.subitemTitle}> - Assistência na Atenção Básica por médico/enfermeiro obedecendo aos critérios normativos do Ministério da Saúde.</Text>

                            <Image source={FLUXO1} style={{ marginStart: 16, marginEnd: 16, marginTop: 16, marginBottom: 6, alignSelf: 'center', height: Dimensions.get('screen').width, width: Dimensions.get('screen').width}} />
                            <Text style={styles.subitemTitle}>Fluxo da assistência à gestante no pré-natal, Teresina-Piauí, 2019. Fonte: SESAPI, 2019</Text>
                            <Image source={FLUXO2} style={{ margin: 24, marginBottom: 6, alignSelf: 'center', height: Dimensions.get('screen').width, width: Dimensions.get('screen').width}} />
                            <Text style={styles.subitemTitle}>Fluxograma da gestante no processo de identificação de risco para pré-eclampsia, Teresina-PI, 2019. Fonte: SESAPI, 2019.</Text>

                            <Text style={styles.itemTitle}>Rede de atenção à gestante de alto risco</Text>
                            <Image source={FLUXO3} style={{ margin: 24, marginBottom: 6, alignSelf: 'center', height: Dimensions.get('screen').width, width: Dimensions.get('screen').width}} />
                            <Text style={styles.subitemTitle}>Mapa do Piauí por região de saúde com estabelecimentos que realizam Parto Cesárea e Parto Vaginal. Fonte: BRASIL, 2020.</Text>
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
    },
    containerButtons: {
        flex: 1,
        padding: 16
    },
    buttonAndroid: {
        minHeight: 50,
        backgroundColor: white,
        elevation: 2,
        shadowOpacity: 10,
        borderRadius: 15,
        padding: 6,
        paddingStart: 16,
        marginStart: 16,
        marginEnd: 16,
        paddingEnd: 16,
        justifyContent: 'center'
    },

    buttonIos: {
        minHeight: 50,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: fontColor,
        borderRadius: 15,
        padding: 6,
        paddingStart: 16,
        paddingEnd: 16,
        marginStart: 16,
        marginEnd: 16,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor,
        textAlign: 'center'
    },
    titlePage: {
        fontSize: 24,
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
        color: fontColor,
        fontWeight: 'bold',
        marginTop: 16
    },
    subitemTitle: {
        fontSize: 16,
        color: fontColor,
        marginTop: 6,
        textAlign: 'justify'
    },
    subtitlePage: {
        fontSize: 18,
        color: fontColor
    }
});
