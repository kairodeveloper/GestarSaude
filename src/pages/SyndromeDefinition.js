import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Modal,
    Button,
} from 'react-native'
import {
    blackSemiTransparent, colorPrimary, textCard
} from '../../colors';


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
    }

    state = {
        modalVisible: false,
    }

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    render() {

        let items = [
            {
                name: 'Hipertensão Gestacional (HG)',
                description: 'refere-se à identificação de hipertensão arterial, em ' +
                    'gestante previamente normotensa, porém sem proteinúria ou manifestação de outros sinais/sintomas' +
                    ' relacionados a pré-eclâmpsia. Essa forma de hipertensão deve desaparecer até 12 semanas após o ' +
                    'parto. Assim, diante da persistência dos níveis pressóricos elevados, deve ser reclassificada como' +
                    ' hipertensão arterial crônica, que foi mascarada pelas alterações fisiológicas da primeira metade ' +
                    'da gestação. Diante dos conceitos atuais sobre o diagnóstico de pré-eclâmpsia, mesmo na ausência' +
                    ' de proteinúria, é preciso estar sempre atento à possibilidade de evolução desfavorável de casos ' +
                    'inicialmente diagnosticados como hipertensão gestacional, pois até 25% dessas pacientes ' +
                    'apresentarão sinais e/ou sintomas relacionados a pré-eclâmpsia, alterando-se, portanto, o seu ' +
                    'diagnóstico.'
            },
            {
                name: 'Hipertensão Arterial Crônica (HAC)', description: 'presença de hipertensão reportada pela ' +
                    'gestante ou identificada antes de 20 semanas de gestação.'
            },
            {
                name: 'Pré-eclâmpsia (PE)',
                description: 'manifestação de hipertensão arterial identificada após a 20ª ' +
                    'semana de gestação, associada à proteinúria significativa. Ainda que essa apresentação ' +
                    'seja classicamente considerada, a presença de proteinúria não é mandatória para o ' +
                    'diagnóstico de pré-eclâmpsia. Assim, deve-se admitir o diagnóstico da doença se a ' +
                    'manifestação de hipertensão após a 20ª semana estiver acompanhada de ' +
                    'comprometimento sistêmico ou disfunção de órgãos-alvo (trombocitopenia, disfunção ' +
                    'hepática, insuficiência renal, edema agudo de pulmão, iminência de eclâmpsia ou ' +
                    'eclâmpsia), mesmo na ausência de proteinúria. Além disso, a associação de hipertensão ' +
                    'arterial com sinais de comprometimento placentário, como restrição de crescimento fetal ' +
                    'e/ou alterações dopplervelocimétricas, também deve chamar atenção para o diagnóstico ' +
                    'de pré-eclâmpsia, mesmo na ausência de proteinúria'
            },
            {
                name: 'Pré-eclâmpsia sobreposta à hipertensão arterial crônica',
                description: 'esse diagnóstico deve ser ' +
                    'estabelecido em algumas situações específicas: 1) quando, após 20 semanas de gestação, ' +
                    'ocorre o aparecimento ou piora da proteinúria já detectada na primeira metade da ' +
                    'gravidez (sugere-se atenção se o aumento for superior a três vezes o valor inicial); 2) ' +
                    'quando gestantes portadoras de hipertensão arterial crônica necessitam de associação de ' +
                    'anti-hipertensivos ou incremento das doses terapêuticas iniciais; 3) na ocorrência de ' +
                    'disfunção de órgãos-alvo. ' +
                    'A PE pode ser classificada ainda em:\n ' +
                    '1. PE de início precoce (com entrega < 34 semanas de gestação);\n' +
                    '2. PE prematuro (com parto < 37 semanas de gestação);\n' +
                    '3. PE de início tardio (com entrega em ≥34 semanas de gestação);\n' +
                    '4. PE a termo (com parto em ≥ 37 semanas de gestação).'
            },

            {
                name: 'Características individuais e condições sociodemográcas desfavoráveis', description: 'Idade ' +
                    'maior que 35 anos; Idade menor que 15 anos ou menarca há menos de 2 anos*; Altura menor que ' +
                    '1,45m; Peso pré-gestacional menor que 45kg e maior que 75kg (IMC30);' +
                    'Anormalidades estruturais nos órgãos reprodutivos; Situação conjugal insegura;' +
                    'Conflitos familiares; Baixa escolaridade; Condições ambientais desfavoráveis;' +
                    'Dependência de drogas lícitas ou ilícitas; Hábitos de vida – fumo e álcool; Exposição a' +
                    'riscos ocupacionais: esforço físico, carga horária, rotatividade de horário, exposição a' +
                    'agentes físicos, químicos e biológicos nocivos, estresse.'
            },
            {
                name: 'História reprodutiva anterior',
                description: 'Abortamento habitual; Morte perinatal explicada e ' +
                    'inexplicada; História de recém-nascido com crescimento restrito ou malformado; Parto ' +
                    'pré-termo anterior; Esterilidade/infertilidade; Intervalo interpartal menor que dois anos ' +
                    'ou maior que cinco anos; Nuliparidade e grande multiparidade; Síndrome hemorrágica ' +
                    'ou hipertensiva; Diabetes gestacional; Cirurgia uterina anterior (incluindo duas ou mais ' +
                    'cesáreas anteriores).'
            },
            {
                name: 'Condições clínicas preexistentes', description: 'Hipertensão arterial; Cardiopatias; ' +
                    'Pneumopatias; Nefropatias; Endocrinopatias (principalmente diabetes e tireoidopatias); ' +
                    'Hemopatias; Epilepsia; Doenças infecciosas (considerar a situação epidemiológica ' +
                    'local); Doenças autoimunes; Ginecopatias; Neoplasias'
            },
            {
                name: 'Doença obstétrica na gravidez atual', description: 'Desvio quanto ao crescimento uterino, ' +
                    'número de fetos e volume de líquido amniótico; Trabalho de parto prematuro e ' +
                    'gravidez prolongada; Ganho ponderal inadequado; Pré-eclâmpsia e eclâmpsia; ' +
                    'Diabetes gestacional; Amniorrexe prematura; Hemorragias da gestação; Insuciência ' +
                    'istmo-cervical; Aloimunização; Óbito fetal.'
            },
            {
                name: 'Intercorrências clínicas',
                description: 'Doenças infectocontagiosas vividas durante a presente ' +
                    'gestação (ITU, doenças do trato respiratório, rubéola, toxoplasmose etc.); Doenças ' +
                    'clínicas diagnosticadas pela primeira vez nessa gestação (cardiopatias, ' +
                    'endocrinopatias). ' +
                    'A Secretaria de Estado da Saúde do Piauí (SESAPI), estabeleceu uma ficha de ' +
                    'classificação de risco da gestante na Atenção Básica com sistema de pontuação para ' +
                    'identificação da gravidade do risco gestacional e direcionamento dos encaminhamentos ' +
                    'necessários dessa gestante, assim como também a identificação precoce de riscos ' +
                    'para pré-eclâmpsia, considerando os seguintes critérios: Pré-eclâmpsia/ Eclâmpsia ' +
                    'anterior; Doença autoimune; Diabetes mellitus; Gestação múltipla atual; Hipertensão ' +
                    'crônica; Hipertensão gestacional anterior; Raça negra; Intervalo Interpartal ≥ 5anos; ' +
                    'Obesidade; Fatores socioeconômicos desfavoráveis; Doença Renal.\n' +
                    '- Idade materna avançada, definida como idade maior ou igual a 35 anos no ' +
                    'momento do parto, está associada a um risco 1,2 a 3 vezes maior de desenvolver EP. A ' +
                    'probabilidade preditiva de EP aumenta quando a idade materna é superior a 35 anos e a ' +
                    'probabilidade aumenta ainda mais rapidamente quando a idade materna é superior a 40 ' +
                    'anos. Paridade: Em mulheres nulíparas, o risco aumentado de desenvolver EP tem ' +
                    'sido amplamente relatado.\n' +
                    'História prévia de PE: estudos focados na EP de acordo com a gravidade da doença ' +
                    'mostrou que uma história de EP dobrou o risco de desenvolver EP de início precoce ' +
                    '(<32 semanas) em uma gravidez subsequente, em oposição à EP de início ' +
                    'tardio. Outros estudos relataram um risco de recorrência de 5% a 17% de EP de início ' +
                    'precoce (<34 semanas) no índice de gravidez para aquelas com histórico prévio de PE ' +
                    'de início precoce.\n' +
                    'Intervalo de gravidez: Intervalos de interpregnação curtos e longos estão associados a ' +
                    'um risco aumentado de PE. Estudos apontam que intervalos entre gestantes inferiores a ' +
                    '12 meses ou superiores a 72 meses estão associados a um maior risco de ' +
                    'desenvolvimento de PE em comparação com intervalos entre 12 e 23 meses.\n' +
                    'História familiar de EP: Embora a maioria dos casos de EP seja esporádica, uma ' +
                    'suscetibilidade familiar à EP foi documentada. Filhas ou irmãs de mulheres com PE ' +
                    'têm de 3 a 4 vezes mais chances de desenvolver a doença do que as mulheres sem ' +
                    'histórico familiar.\n' +
                    'Obesidade: Existem evidências substanciais para mostrar que a obesidade (IMC ≥ 30kg / m²) ' +
                    'confere um risco 2 a 4 vezes maior de EP. Os mecanismos exatos que ' +
                    'vinculam sobrepeso / obesidade e EP permanecem obscuros. A obesidade é conhecida ' +
                    'como um estado de inflamação crônica de baixo grau, também chamada de ' +
                    '“metainflamação”. A inflamação de baixo grau pode induzir disfunção endotelial e ' +
                    'isquemia da placenta por mecanismos imunomediados, que por sua vez levam à ' +
                    'produção de mediadores inflamatórios, resultando em resposta inflamatória materna ' +
                    'exagerada e desenvolvimento de PE.\n' +
                    'Comorbidades: Existem certas condições médicas que predispõem as mulheres a ' +
                    'desenvolver PE. Estes incluem hiperglicemia na gravidez (diabetes mellitus ' +
                    'pré-gravidez tipo 1 e tipo 2, diabetes gestacional que requerem tratamento com ' +
                    'insulina), hipertensão crônica pré-existente, doença renal e doenças auto-imunes, como ' +
                    'lúpus eritematoso sistêmico (LES) e síndrome antifosfolípide (SAF).'
            },

            {
                name: 'Alterações Vasculares', description: 'Além da hipertensão, as mulheres com pré eclâmpsia ou\n' +
                    'eclâmpsia geralmente não apresentam a hipervolemia associada à gravidez\n' +
                    'normal; assim, a hemoconcentração é um achado frequente. Além disso, a interação de\n' +
                    'vários agentes vasoativos, como prostaciclina (vasodilatador), tromboxano\n' +
                    'A 2(vasoconstritor potente), óxido nítrico (vasodilatador potente) e endotelinas ' +
                    '(vasoconstritores potentes) resultam em outra mudança significativa descrita na\n' +
                    'pré-eclâmpsia: vasospasmo intenso.'
            },
            {
                name: 'Alterações Hematológicas',
                description: 'Várias alterações hematológicas também podem ocorrer em\n' +
                    'mulheres com pré-eclâmpsia, especialmente na pré-eclâmpsia com características\n' +
                    'graves. Trombocitopenia e hemólise podem ocorrer e podem atingir níveis graves como\n' +
                    'parte da síndrome HELLP. A trombocitopenia resulta do aumento da ativação, agregação\n' +
                    'e consumo de plaquetas e é um marcador da gravidade da doença. Uma contagem de\n' +
                    'plaquetas inferior a 150.000 x 10 9 / L é encontrada em aproximadamente 20% dos\n' +
                    'pacientes com pré-eclâmpsia, variando de 7% nos casos sem manifestações graves a\n' +
                    '50% nos casos com manifestações graves. No entanto, a contagem reduzida de plaquetas\n' +
                    'não é encontrada em todos os casos de pré-eclâmpsia ou eclampsia. A interpretação dos\n' +
                    'níveis de hematócrito na pré-eclâmpsia deve levar em consideração que podem ocorrer\n' +
                    'hemólise e hemoconcentração. Em alguns casos, o hematócrito pode não parecer\n' +
                    'diminuído, apesar da hemólise, devido à hemoconcentração basal. A lactato\n' +
                    'desidrogenase está presente nos eritrócitos em alta concentração. Altas concentrações\n' +
                    'séricas de LDH (mais de 600 UI / L) podem ser um sinal de hemólise.'
            },
            {
                name: 'Alterações hepáticas',
                description: 'A função hepática pode ser significativamente alterada em\n' +
                    'mulheres com pré-eclâmpsia com características graves. Alanina aminotransferase e\n' +
                    'AST podem estar elevados. O aspartato aminotransferase é a transaminase dominante\n' +
                    'liberada na circulação periférica na disfunção hepática devido à pré-eclâmpsia e está\n' +
                    'relacionada à necrose periportal. O fato de o AST ser aumentado em maior extensão que\n' +
                    'o ALT, pelo menos inicialmente, pode ajudar a distinguir a pré-eclâmpsia de outras\n' +
                    'causas potenciais de doença hepática parenquimatosa, nas quais o ALT geralmente é\n' +
                    'maior que o AST. Os níveis séricos aumentados de LDH na pré-eclâmpsia são causados\n' +
                    'por disfunção hepática (LDH derivada de tecidos isquêmicos ou necróticos, ou ambos) e\n' +
                    'hemólise (LDH da destruição de glóbulos vermelhos). O aumento da bilirrubina\n' +
                    'secundária a hemólise significativa pode se desenvolver apenas nos estágios finais da\n' +
                    'doença. Similarmente, alterações na função sintética hepática, refletidas por\n' +
                    'anormalidades no tempo de protrombina, tempo parcial de protrombina e fibrinogênio,\n' +
                    'geralmente se desenvolvem na pré-eclâmpsia avançada. A avaliação desses parâmetros\n' +
                    'de coagulação provavelmente é útil apenas quando a contagem de plaquetas estiver\n' +
                    'abaixo de 150.000 x 109 / L, há disfunção hepática significativa ou suspeita de\n' +
                    'descolamento de placenta.'
            },
            {
                name: 'Alterações renais',
                description: 'As alterações renais histopatológicas classicamente descritas ' +
                    'na pré-eclâmpsia como endoteliose glomerular consistem em células endoteliais inchadas e\n' +
                    'vacuolizadas com fibrilas, células mesangiais inchadas, depósitos subendoteliais de\n' +
                    'proteína reabsorvida do filtrado glomerular e moldes tubulares. A proteinúria na\n' +
                    'pré-eclâmpsia não é seletiva, como resultado do aumento da permeabilidade tubular à\n' +
                    'maioria das proteínas de grande peso molecular (albumina, globulina, transferrina e\n' +
                    'hemoglobina). O cálcio urinário diminui devido a uma reabsorção tubular aumentada de\n' +
                    'cálcio. O aumento normal do fluxo sanguíneo renal e a taxa de filtração glomerular e a\n' +
                    'diminuição esperada da creatinina sérica podem não ocorrer em mulheres com\n' +
                    'pré-eclâmpsia, principalmente se a doença for grave. A pré-eclâmpsia com\n' +
                    'características graves pode incluir deterioração renal aguda como parte do espectro\n' +
                    'clínico. A oligúria na pré-eclâmpsia grave é uma consequência do vasoespasmo\n' +
                    'intrarrenal com uma redução aproximada de 25% na taxa de filtração glomerular. Nesses\n' +
                    'pacientes, a oligúria transitória (menos de 100 mL em 4 horas) é uma observação comum\n' +
                    'no trabalho de parto ou nas primeiras 24 horas do período pós-parto. As concentrações\n' +
                    'plasmáticas de ácido úrico normalmente aumentam no final da gravidez, e isso se deve\n' +
                    'ao aumento das taxas de produção fetal ou placentária, ou a ambos, diminuição da\n' +
                    'ligação à albumina e diminuição da depuração do ácido úrico) A explicação mais\n' +
                    'comumente aceita para hiperuricemia na pré-eclâmpsia, além do aumento da produção, é\n' +
                    'o aumento da reabsorção e diminuição da excreção de ácido úrico nos túbulos renais\n' +
                    'proximais.'
            },
            {
                name: 'Consequências fetais', description: 'Como resultado do comprometimento do fluxo sanguíneo\n' +
                    'uteroplacentário secundário à falha da transformação fisiológica das artérias espirais ou\n' +
                    'dos insultos vasculares da placenta, ou ambos, manifestações de pré-eclâmpsia também\n' +
                    'podem ser vistas na unidade feto-placentária. Anormalidades no leito placentário e\n' +
                    'subsequente falha da transformação fisiológica das artérias espirais no primeiro ou no\n' +
                    'segundo trimestre limitam o fluxo sanguíneo para a unidade uteroplacentária. Mecanismos ' +
                    'adicionais para isquemia uteroplacentária crônica incluem insultos vasculares placentários. ' +
                    'Entre as mulheres com pré-eclâmpsia, as manifestações clínicas que se seguem a essa isquemia ' +
                    'uteroplacentária incluem restrição do crescimento fetal, oligoidrâmnio, descolamento da placenta ' +
                    'e status fetal não-ressegurador demonstrado na vigilância pré-parto. Consequentemente, os fetos ' +
                    'de mulheres com pré-eclâmpsia têm um risco aumentado de parto prematuro espontâneo ou ' +
                    'indicado.'
            }
        ];

        return (
            <View style={styles.safeView}>
                <View style={styles.containerContent}>
                    <ScrollView>
                        <View>
                            {items.map((item) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.cardContent}
                                        onPress={() => {
                                            this.toggleModal(true)
                                        }}>
                                        <Text style={styles.syndroTitle}>{item.name}</Text>
                                        <Modal animationType={"slide"} transparent={false}
                                               visible={this.state.modalVisible}>
                                            <ScrollView>
                                                <View style={styles.modal}>
                                                    <Text style={styles.syndroTitle}>{item.name}</Text>
                                                    <Text style={styles.syndroDescription}>{item.description}</Text>

                                                    <TouchableHighlight onPress={() => {
                                                        this.toggleModal(!this.state.modalVisible)
                                                    }}>
                                                        <Text style={styles.text}>Voltar</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </ScrollView>
                                        </Modal>
                                    </TouchableOpacity>
                                )
                            })}
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
        backgroundColor: "#fff",
    },

    containerContent: {
        flex: 1,
        alignItems: 'center'
    },

    cardContent: {
        margin: 8,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
        backgroundColor: blackSemiTransparent,
        borderRadius: 10,
    },

    text: {
        marginTop: 10,
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },

    syndroTitle: {
        fontSize: 25,
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        color: textCard,
        fontWeight: 'bold',

    },
    syndroDescription: {
        fontSize: 21,
        fontWeight: 'bold',
        color: textCard,

    },
    modal: {
        flex: 1,
        margin: 8,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
        backgroundColor: blackSemiTransparent,
        borderRadius: 10,
    },

});
