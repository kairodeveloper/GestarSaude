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
} from 'react-native'
import {
    colorPrimary, colorFundo, black, colorButtons
} from '../../colors';
import ModalForList from "../modals/ModalForList";


class MyItem extends React.Component {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };
    render() {
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
            >
                <Text style={styles.syndroTitle}> {this.props.item.name}</Text>
            </TouchableOpacity>
        )
    }
}

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

        this.items = [
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
                    'estabelecido em algumas situações específicas:\n\n' +
                    '1) quando, após 20 semanas de gestação, ' +
                    'ocorre o aparecimento ou piora da proteinúria já detectada na primeira metade da ' +
                    'gravidez (sugere-se atenção se o aumento for superior a três vezes o valor inicial); \n\n' +
                    '2) ' +
                    'quando gestantes portadoras de hipertensão arterial crônica necessitam de associação de ' +
                    'anti-hipertensivos ou incremento das doses terapêuticas iniciais; \n\n' +
                    '3) na ocorrência de ' +
                    'disfunção de órgãos-alvo. ' +
                    'A PE pode ser classificada ainda em:\n\n ' +
                    '1. PE de início precoce (com entrega < 34 semanas de gestação);\n\n' +
                    '2. PE prematuro (com parto < 37 semanas de gestação);\n\n' +
                    '3. PE de início tardio (com entrega em ≥34 semanas de gestação);\n\n' +
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
            },

            {
                name: 'Triagem/Manejo Clínico', description: '11 a 13 semanas\n\n' +
                    'Em um estudo do tipo secundário, derivado de três estudos prospectivos com objetivo de ' +
                    'analisar o desempenho da triagem para pré-eclâmpsia (EP) precoce, pré-termo e a termo ' +
                    'na gestação de 11 a 13 semanas por fatores maternos e combinações de pressão arterial ' +
                    'média (PAM), índice de pulsatilidade da artéria uterina (UtA), soro fator de crescimento ' +
                    'placentário (PlGF) e proteína plasmática associada à gravidez sérica (PAPP-A). De um ' +
                    'total de 61.174 gestações únicas, incluindo 1770 (2,9%) que desenvolveram EP. ​ Nas ' +
                    'gestações que desenvolveram EP, em comparação com aquelas sem EP, os valores de ' +
                    'MoM de UtA - PI e MAP foram aumentados e os de PAPP - A e PlGF diminuíram, e o ' +
                    'desvio do normal foi maior para o PE precoce do que tardio para todos os quatro ' +
                    'biomarcadores . A triagem combinada por fatores maternos, UtA - PI, MAP e PlGF ' +
                    'previu 90% de PE precoce, 75% de PE prematuro e 41% de PE a termo, a uma taxa de ' +
                    'tela positiva de 10%; a inclusão de PAPP - A não melhorou o desempenho da ' +
                    'triagem. Concluíram que a triagem por fatores maternos e biomarcadores entre 11 e 13 ' +
                    'semanas de gestação pode identificar uma alta proporção de gestações que desenvolvem ' +
                    'PE precoce e prematuro.' +
                    '\n\n19 a 24 semanas\n\n' +
                    'Um estudo observacional prospectivo, com objetivo de estimar o risco específico do ' +
                    'paciente EP nas 19-24 semanas de gestação por fatores maternos e combinações de ' +
                    'PAM, UtA-PI, fator PLGF e tirosina quinase-1 solúvel em soro do tipo sérica ' +
                    '(sFlt-1). Com base no risco de EP, as mulheres seriam estratificadas em grupos de ' +
                    'gerenciamento de alto, intermediário e baixo risco. O grupo de alto risco exigiria um ' +
                    'monitoramento cuidadoso da pressão alta e da proteinúria entre 24 e 31 semanas. O ' +
                    'grupo de risco intermediário, juntamente com as gestações não entregues do grupo de ' +
                    'alto risco, teria uma reavaliação do risco de EP em 32 semanas para identificar aqueles ' +
                    'que precisariam de monitoramento próximo da pressão arterial alta e proteinúria em ' +
                    '32-35 semanas. Os riscos específicos do paciente ao parto com EP com <32 e <36 ' +
                    'semanas de gestação foram calculados usando o modelo de riscos concorrentes para ' +
                    'combinar a distribuição anterior da idade gestacional no parto com PE, obtida a partir ' +
                    'das características maternas e do histórico médico, com múltiplos de os valores ' +
                    'medianos (MoM) de MAP, UtA-PI, PlGF e sFlt-1. A população estudada de 16 254 ' +
                    'gestações únicas incluiu 467 (2,9%) que desenvolveram EP subsequentemente (23 ' +
                    'entregues em <32 semanas, 58 entregues em 32 + 0 a 35 + 6 semanas e 386 entregues em ' +
                    '≥ 36 semanas). Usando um risco de> 1 em 25 para EP com <32 semanas de gestação e ' +
                    'risco de> 1 em 150 para EP com <36 semanas, a proporção da população estratificada no ' +
                    'grupo de alto risco foi de cerca de 1% do total, e a proporção de casos de EP com <32 ' +
                    'semanas de gestação contidos nesse grupo de alto risco variou de cerca de 35% com ' +
                    'triagem por fatores maternos e PAM, a 78% com fatores maternos, PAM e UtA-PI e até ' +
                    '100 % com fatores maternos, PAM, UtA-PI e PlGF, com ou sem sFlt-1. Da mesma ' +
                    'forma, a proporção da população que requer reavaliação de risco em 32 semanas. ' +
                    'Concluíram que na nova pirâmide de cuidados com a gravidez, a avaliação do risco de ' +
                    'EP nas 19-24 semanas de gestação pode estratificar a população naqueles que necessitam ' +
                    'de monitoramento intensivo nas 24-31 semanas e naqueles que necessitam de ' +
                    'reavaliação às 32 semanas.' +
                    '\n\n30 a 34 semanas\n\n' +
                    'Um estudo observacional prospectivo, com objetivo de estimar o risco específico da ' +
                    'paciente com EP entre 30 e 34 semanas de gestação por uma combinação de ' +
                    'características maternas e histórico médico com múltiplos dos valores medianos (MoM) ' +
                    'da PAM, UtA-PI, PLGF e sFlt-1 e estratificam as mulheres em grupos de manejo de alto, ' +
                    'intermediário e baixo risco. ​ Os riscos específicos da paciente ao parto com EP com ' +
                    'menos de 4 semanas da avaliação e com menos de 40 semanas de gestação foram ' +
                    'calculados usando o modelo de riscos competitivos para combinar o risco anterior de ' +
                    'características maternas e histórico médico com os valores MoM de MAP, UtA-PI, PlGF ' +
                    'e sFlt-1. Com base nesses riscos, a população foi estratificada em grupos de alto, ' +
                    'intermediário e baixo risco. A população estudada de 8128 gestações únicas incluiu 234 ' +
                    '(2,9%) que subsequentemente desenvolveram EP. Usando um ponto de corte de risco de ' +
                    '1 em 50 para PE com menos de 4 semanas e um ponto de corte de 1 em 150 para PE com ' +
                    '<40 semanas de gestação, a proporção da população estratificada em risco alto, ' +
                    'intermediário e baixo foi de cerca de 3%, 26% e 71%, respectivamente. O grupo de alto ' +
                    'risco continha 90% das gestações com PE em <4 semanas e 40% daquelas com PE em 4 ' +
                    'semanas, desde a avaliação até a gestação de 40 semanas. O grupo de risco intermediário ' +
                    'continha mais 49% de mulheres com PE às 4 semanas da avaliação às 40 semanas ' +
                    'gestacionais. No grupo de baixo risco, nenhuma das mulheres desenvolveu EP em <4 ' +
                    'semanas e apenas 0,3% desenvolveu EP em 4 semanas a 40 semanas gestacionais. ' +
                    'Concluem que ao identificar o grupo de alto risco deve-se ter um monitoramento ' +
                    'intensivo desde o momento da avaliação inicial e até 40 semanas de gestação e que todas ' +
                    'as gestações precisariam ser reavaliadas com 40 semanas.' +
                    '\n\n35 a 37 semanas\n\n' +
                    'Em um estudo observacional, com objetivo de ​ estimar o risco específico do paciente de ' +
                    'pré-eclâmpsia (EP) nas 35-37 semanas de gestação por uma combinação de ' +
                    'características maternas e histórico médico com múltiplos dos valores medianos (MoM) ' +
                    'de PAM, UtA - PI, PLGF e sFlt - 1 e estratificam as mulheres em grupos de manejo de ' +
                    'alto, intermediário e baixo risco. O grupo de alto risco exigiria monitoramento intensivo ' +
                    'desde o momento da avaliação inicial e até 40 semanas de gestação, o grupo de risco ' +
                    'intermediário exigiria uma reavaliação com 40 semanas de gestação e o grupo de baixo ' +
                    'risco seria gerenciado com expectativa. A população estudada de 3703 gestações únicas ' +
                    'incluiu 38 (1,0%) com PE <40 semanas de gestação e 22 (0,6%) com PE ≥ 40 ' +
                    'semanas. O grupo de alto risco continha 92% das gestações com PE com menos de 40 ' +
                    'semanas de gestação e 73% daquelas com PE com ≥ 40 semanas. O grupo de risco ' +
                    'intermediário continha mais 27% de mulheres com PE com ≥ 40 semanas. No grupo de ' +
                    'baixo risco, nenhuma das mulheres desenvolveu EP com <40 ou ≥ 40 semanas de ' +
                    'gestação. O grupo classificado como de alto risco para EP pode ser monitorado por ' +
                    'medição da pressão arterial e exame de urina pelo menos semanalmente e as mulheres ' +
                    'podem ser aconselhadas a relatar quaisquer sintomas associados à EP grave, como ' +
                    'distúrbios visuais e dor epigástrica. O grupo de risco intermediário exige reavaliação ' +
                    'com 40 semanas de gestação, mas essas mulheres também seriam aconselhadas a relatar ' +
                    'quaisquer sintomas associados à EP grave. O grupo de baixo risco pode ter certeza de ' +
                    'que o desenvolvimento de EP é muito improvável e, na ausência de achados anormais de ' +
                    'ultrassom ou outras indicações obstétricas, as gestações podem ser gerenciadas com ' +
                    'expectativa, aguardando o início espontâneo do trabalho de parto. Os limites de risco ' +
                    'para definir a proporção da população estratificada em cada um dos três grupos de ' +
                    'manejo e os protocolos para esse manejo variarão inevitavelmente de acordo com as ' +
                    'preferências locais e as considerações econômicas da saúde.' +
                    '\n\nUso da aspirina\n\n' +
                    'Uma meta-análise, incluindo 31 estudos randomizados de prevenção de EP, incluindo ' +
                    '32.217 gestações, mostrou que pacientes que receberam agentes antiplaquetários, ' +
                    'especialmente aspirina para prevenção de PE, tiveram uma redução de 10% da PE (RR ' +
                    '0,90; IC95%, 0,84 –0,97), parto prematuro antes das 34 semanas de gestação e resultados ' +
                    'adversos graves da gravidez (EP, parto <34 semanas de gestação, bebês com ASG, morte ' +
                    'fetal ou materna). ' +
                    'Um outro estudo, mostraram que a dose baixa de aspirina iniciada com menos de ou ' +
                    'igual a 16 semanas de gestação em mulheres com risco de EP teve uma redução ' +
                    'substancial na taxa de PE. No entanto, a aspirina iniciada após 16 semanas de gestação ' +
                    'não diminuiu a taxa de EP. A administração de aspirina em baixa dose (50–150 mg / d) ' +
                    'com menor ou igual a 16 semanas de gestação em mulheres com risco de EP teve uma ' +
                    'redução significativa na EP, em particular EP prematuro. Além disso, destacaram que os ' +
                    'benefícios adicionais da profilaxia precoce com aspirina incluem uma redução de 60% ' +
                    'no risco de morte perinatal. Esses resultados estimularam a necessidade de um estudo ' +
                    'randomizado prospectivo para avaliar o potencial benefício da aspirina na prevenção da ' +
                    'EP.'
            },

            {
                name: 'Fluxo de assistência a mulher grávida-FAMG',
                description: 'Roteiro de consultas\n\n' +
                    '1ª Consulta: classificação de risco gestacional pelo uso do Instrumento Oficial (ficha 01).\n' +
                    'Possibilidades:\n' +
                    'a) Alto Risco: encaminhamento ao pré-natal de referência para avaliação obstétrica\n' +
                    '- Se confirmado, a paciente passará a ter a modalidade de assistência especial obrigatória,\n' +
                    'por equipe multiprofissional no pré-natal de referência, em acréscimo à que terá no local\n' +
                    'de residência na Atenção Básica, que também será obrigatória e de forma a interagir com\n' +
                    'aquela prestada no pré-natal de alto risco. O intervalo interconsultas depende de cada caso,\n' +
                    'geralmente semanal ou quinzenal.\n' +
                    '- Se o alto risco não for confirmado a gestante será contra–referenciada para o pré-natal de\n' +
                    'médio ou baixo risco.\n\n' +
                    'b) Pré-Natal de médio Risco:\n' +
                    '- Se confirmado, atendimento pré-natal por médico/ enfermeiro;\n' +
                    '- Cuidados especiais recomendados;\n' +
                    '- Intervalo interconsultas: mensal até o 6o mês, quinzenal no 7o e 8o meses e semanal no 9o\n' +
                    'mês, ou a intervalo menor, se necessário;\n' +
                    'Manter assistência obrigatória na Atenção Básica, se o atendimento ocorrer fora desta.\n\n' +
                    'c) Risco habitual:\n' +
                    '- Assistência na Atenção Básica por médico/enfermeiro obedecendo aos critérios\n' +
                    'normativos do Ministério da Saúde.\n\n' +
                    'Considerações necessárias:\n\n' +
                    'a) ​ O instrumento de classificação de risco deverá ser preenchido em duas vias, na primeira\n' +
                    'consulta, ficando uma com a paciente e outra no prontuário/Serviço de Saúde;\n\n' +
                    'b) ​ A cada consulta a gestante deverá ser reclassificada quanto ao risco. Assim, uma ' +
                    'gestante de baixo risco poderá ser reclassificada como de alto risco, quando desenvolver ' +
                    'agravo(s) capaz (es) de preencher os requisitos deste, a exemplo da pré-eclampsia; e ' +
                    'vice-versa, quando a gestante portando doença que foi submetida ' +
                    'a tratamento exitoso, a exemplo de ameaça de abortamento com involução completa dos ' +
                    'sinais e sintomas.\n\n' +
                    'c) ​ Os critérios clínicos, laboratoriais e de conduta obedecerão aos preceitos normativos do ' +
                    'Manual do Ministério da Saúde e Manual de Condutas Obstétricas oficializadas para o ' +
                    'Estado.\n\n' +
                    'd) ​ Até que haja implantação do pré-natal de referência para o alto risco em todos os ' +
                    'Territórios de Desenvolvimento, as gestantes classificadas no grupo de alto risco deverão ' +
                    'ser encaminhadas ao serviço mais próximo de sua residência.'
            },

            {
                name: 'Sinais e Sintomas de alerta, valores de referência da Pressão arterial e exames ' +
                    'laboratoriais',
                description: 'Sinais e Sintomas de alerta\n\n' +
                    '- Síndromes hemorrágicas (incluindo descolamento prematuro de placenta, placenta prévia), ' +
                    'independentemente da dilatação cervical e da idade gestacional;\n' +
                    '- Suspeita de pré-eclâmpsia: pressão arterial > 140/90, medida após um mínimo de 5 ' +
                    'minutos de repouso, na posição sentada. Quando estiver associada à proteinúria, pode-se ' +
                    'usar o teste rápido de proteinúria;\n' +
                    '- Sinais premonitórios de eclâmpsia em gestantes hipertensas: escotomas cintilantes, cefaleia ' +
                    'típica occipital, epigastralgia ou dor intensa no hipocôndrio direito;\n' +
                    '- Eclâmpsia (crises convulsivas em pacientes com pré-eclâmpsia) Crise hipertensiva (PA > ' +
                    '160/110);\n' +
                    '- Amniorrexe prematura: perda de líquido vaginal (consistência líquida, em pequena ou ' +
                    'grande quantidade, mas de forma persistente), podendo ser observada mediante exame ' +
                    'especular com manobra de Valsalva e elevação da apresentação fetal;\n' +
                    'Anemia grave (hemoglobina < 8);\n' +
                    '- Trabalho de parto prematuro (contrações e modificação de colo uterino em gestantes com ' +
                    'menos de 36 semanas);\n' +
                    '- Hipertermia (Tax > = 37,8C), na ausência de sinais ou sintomas clínicos;\n' +
                    '- Suspeita/diagnóstico de abdome agudo em gestantes;\n' +
                    '- Suspeita/diagnóstico de pielonefrite, infecção ovular ou outra infecção que necessite de ' +
                    'internação hospitalar;\n' +
                    '- Suspeita de trombose venosa profunda em gestantes (dor no membro inferior, edema ' +
                    'localizado e/ou varicosidade aparente);\n' +
                    '- Investigação de prurido gestacional/icterícia;\n' +
                    '- Vômitos incoercíveis não responsivos ao tratamento, com comprometimento sistêmico ' +
                    'com menos de 20 semanas;\n' +
                    '- Vômitos inexplicáveis no 3o trimestre;\n' +
                    '- Restrição de crescimento intrauterino;\n' +
                    '- Oligoidrâmnio;\n' +
                    '- Casos clínicos que necessitem de avaliação hospitalar: cefaleia intensa e súbita, sinais ' +
                    'neurológicos, crise aguda de asma etc. Nos casos com menos de 20 semanas, as gestantes ' +
                    'podem ser encaminhadas à emergência clínica.' +
                    '\n\nEdema\n\n' +
                    '-​ ​ Edema ausente: Acompanhe a gestante, seguindo o calendário de rotina.\n' +
                    '-​ ​ Apenas edema de tornozelo, sem hipertensão\n' +
                    'ou aumento súbito de peso: Verifique se o edema está relacionado à postura, ao fim do dia, ' +
                    'ao aumento da temperatura ou ao tipo de ' +
                    'calçado.\n' +
                    '- Edema limitado aos membros inferiores, porém na presença de ' +
                    'hipertensão ou ganho de peso: Oriente repouso em decúbito lateral esquerdo. Verifique a ' +
                    'presença de sinais ou sintomas de pré-eclâmpsia ' +
                    'grave e interrogue a gestante sobre os movimentos fetais. Marque retorno em sete dias, na ' +
                    'ausência de sintomas. A gestante deve ser avaliada e acompanhada pelo médico da unidade, ' +
                    'de acordo com o calendário de rotina. Caso haja hipertensão, a gestante deve ser ' +
                    'encaminhada para um serviço de alto risco. Se houver presença de proteinúria, veja a ' +
                    'conduta específica;\n' +
                    '- Edema generalizado (face, tronco e membros) ou que já se mostra presente quando a ' +
                    'gestante acorda, acompanhado ou não de hipertensão ou aumento súbito de peso:\n' +
                    '- ​ Gestante de risco em virtude de suspeita de pré-eclâmpsia ou outras intercorrências: A ' +
                    'gestante deve ser avaliada pelo médico da unidade e encaminhada para serviço de alto risco.\n' +
                    '- Edema unilateral de MMII, com dor e/ou sinais flogísticos: Suspeita de processos ' +
                    'trombóticos (tromboflebite, TVP). A gestante deve ser avaliada pelo médico da unidade e ' +
                    'encaminhada para o serviço de alto risco.' +
                    '\n\nPressão arterial (PA)\n\n' +
                    '-​ ​ Níveis de PA conhecidos e normais antes da ' +
                    'gestação: Manutenção dos mesmos níveis de PA;\n' +
                    '- ​ Níveis tensionais normais: Mantenha o calendário habitual; Cuide da alimentação;\n' +
                    'Pratique atividade física regularmente.\n' +
                    '-​ ​ Níveis de PA desconhecidos antes da gestação:\n' +
                    'Valores da pressão < 140/90mmHg: Considere o aumento dos níveis tensionais em relação ' +
                    'aos níveis anteriores à gestação: Diminua a ingestão de sal; aumente a ingestão hídrica;\n' +
                    'pratique atividade física regularmente.\n' +
                    '- Níveis de PA conhecidos e normais antes da gestação:\n' +
                    'Aumento da PA, mantendo nível < 140/90mmHg: Sinal de alerta - Diminua a ingestão de ' +
                    'sal; aumente a ingestão hídrica; pratique atividade física regularmente; agende controles ' +
                    'mais próximos.\n' +
                    '- Níveis de PA conhecidos ou desconhecidos antes da gestação: Valores da PA > ' +
                    '140/90mmHg e < 160/110, sem sintomas e sem ganho ponderal maior do que ' +
                    '500g semanais; Considere HAS na gestação: Atente para a possibilidade de erro de cálculo ' +
                    'da idade gestacional (IG); Realize proteinúria (teste rápido); A gestante deve ser vista pelo ' +
                    'médico da unidade e deve ser avaliada a possibilidade de polidrâmnio, macrossomia, ' +
                    'gravidez gemelar, mola hidatiforme; Solicite ultrassonografia, se possível; Caso permaneça ' +
                    'dúvida, marque retorno em 15 dias para reavaliação ou, se possível, faça o encaminhamento ' +
                    'da gestante para o serviço de alto risco.\n' +
                    '- ​ Níveis de PA conhecidos ou desconhecidos antes da gestação: Valores de PA > ' +
                    '140/90mmHg, proteinúria (teste rápido) positiva e/ou com sintomas clínicos (cefaleia, ' +
                    'epigastralgia, escotomas, reflexos tendíneos aumentados) ou paciente assintomática, ' +
                    'porém com níveis de PA > 160/110mmHg - Paciente com suspeita de pré-eclâmpsia grave: ' +
                    'Deve-se referir imediatamente a gestante ao pré-natal de alto risco e/ou à unidade de ' +
                    'referência hospitalar.\n' +
                    '- ​ Paciente com hipertensão arterial crônica, moderada ou grave, ou em uso de medicação ' +
                    'anti-hipertensiva; Paciente de risco: Deve-se referir a gestante ao pré-natal de alto risco.' +
                    '\n\nExames Laboratoriais\n\n' +
                    '1º trimestre\n' +
                    'Hemograma: identifica problemas como, por exemplo, anemia (falta de ferro no sangue), ' +
                    'que é comum na gravidez e deve ser tratada.\n' +
                    'Tipagem sanguínea e fator Rh:​ identifica seu tipo de sangue. Se a ' +
                    'gestante tem Rh negativo e o pai do bebê tem Rh positivo, ela deve fazer um outro exame ' +
                    'durante o pré-natal, o Coombs Indireto. Após o nascimento, caso o bebê tenha Rh positivo, a ' +
                    'mulher deverá tomar uma vacina em até três dias após o parto, para evitar problemas na ' +
                    'próxima gestação. Você tem direito a essa vacina pelo SUS.\n' +
                    'Glicemia em jejum: mede a quantidade de açúcar no sangue. Se estiver alta, pode indicar ' +
                    'diabetes, que deve ser cuidada com dieta, atividade física e, às vezes, uso de medicamentos. ' +
                    'Teste rápido de triagem para sífilis e/ou VDRL/RPR: identificam a sífilis, uma doença ' +
                    'sexualmente transmissível que pode passar da gestante para o bebê durante a gravidez. ' +
                    'Quando não tratada, a sífilis pode causar aborto, morte do feto, parto prematuro, baixo peso ' +
                    'ao nascer, malformações, e morte do recém-nascido. Em caso de teste positivo, tanto a ' +
                    'gestante quanto seu(sua) parceiro(a) devem ser tratados o mais rápido possível, pois caso ' +
                    'o(a) parceiro(a) não se trate, a gestante pode ser reinfectada. O tratamento da sífilis com a ' +
                    'penicilina benzatina (Benzetacil) é o único meio eficaz de tratar o bebê ainda na barriga da ' +
                    'mãe e prevenir que ele tenha algum problema. Esse tratamento deve ser feito na Unidade ' +
                    'Básica de Saúde onde é realizado o pré-natal. Você e seu(sua) parceiro(a) devem realizar o ' +
                    'teste de sífilis no primeiro e no terceiro trimestre de gravidez.\n' +
                    'Teste rápido diagnóstico HIV: identificam o vírus causador da AIDS, doença que ' +
                    'compromete o sistema de defesa do organismo, provocando a perda da resistência e da ' +
                    'proteção contra outras doenças. Pode ser transmitido da mãe para o filho durante a gravidez, ' +
                    'o parto ou a amamentação. Quanto mais cedo iniciar o tratamento, maior a chance de a ' +
                    'mulher e seu bebê ficarem saudáveis. Você deverá realizar o teste rápido de HIV no início ' +
                    '(primeiro trimestre) e no final da gestação (terceiro trimestre). Ele também poderá ser feito ' +
                    'no momento do parto.\n' +
                    'Toxoplasmose: identifica se a mulher tem toxoplasmose. Esta doença pode ser adquirida ' +
                    'pela ingestão de alimentos contaminados. Como medida de prevenção, é importante lavar as ' +
                    'mãos ao manipular alimentos; lavar bem as frutas, legumes e verduras; não ingerir carnes ' +
                    'cruas ou mal passadas e não consumir leite ou queijo crus; lavar bem as mãos após mexer ' +
                    'com a terra e evitar o contato com fezes de gatos e cães.\n' +
                    'Sorologia para hepatite B (HbsAg): identificam o vírus da hepatite B, que pode passar da ' +
                    'mãe para o bebê durante a gravidez. Caso você tenha o vírus, seu bebê poderá ser protegido ' +
                    'se receber a vacina e a imunoglobulina para hepatite B nas primeiras 12 horas após o parto. ' +
                    'Urocultura + urina tipo I (sumário de urina – SU, EQU): identificam a presença de infecção ' +
                    'urinária, que deve ser tratada ainda durante o pré-natal.\n' +
                    'Ultrassonografia obstétrica: Se possível realizar 1 USG obstétrica até 20 semanas, quando ' +
                    'houver impossibilidade de determinação da idade gestacional correta e na presença de ' +
                    'intercorrências clínicas ou obstétricas, assim como detecção precoce de gestações múltiplas ' +
                    'e retardo de crescimento intrauterino.\n' +
                    'Citopatológico de colo de útero (se for necessário): este exame precisa ser realizado ' +
                    'periodicamente por todas as mulheres, de acordo com a necessidade. Procure saber se você ' +
                    'tem a necessidade de fazê-lo durante o pré-natal.\n' +
                    '2º trimestre\n' +
                    'Teste de tolerância para glicose com 75g, se a glicemia estiver acima de 85mg/dl ou se ' +
                    'houver fator de risco (realize este exame preferencialmente entre a 24a e a 28a semana). ' +
                    'Coombs indireto (se for Rh negativo).\n' +
                    '3º trimestre\n' +
                    'Hemograma; Glicemia em jejum; Coombs indireto (se for Rh negativo); VDRL Anti-HIV; ' +
                    'Sorologia para hepatite B (HbsAg); repita o exame de toxoplasmose se o IgG não for ' +
                    'reagente; Urocultura + urina tipo I (sumário de urina – SU); Bacterioscopia de secreção ' +
                    'vaginal (a partir de 37 semanas de gestação)'
            },

            {
                name: 'Número de consultas de pré-natal',
                description: 'Até 28ª semana – mensalmente;\n\n' +
                    'Da 28ª até a 36ª semana – quinzenalmente;\n\n' +
                    'Da 36ª até a 41ª semana – semanalmente.'
            },

            {
                name: 'Fluxo de atendimento à gestante de alto risco',
                description: 'O estado do Piauí estabeleceu o fluxo de assistência à ' +
                    'mulher grávida, iniciado pela classificação de risco gestacional mediante ' +
                    'utilização de instrumento oficial do Estado destinado a tal finalidade, encaminhamento ' +
                    'daquelas incluídas no grupo de alto risco ao pré-natal de referência, qualificado pelo ' +
                    'uso de parâmetros assistenciais específicos.'
            }
        ];
        this.state = {
            isModalVisible: false,
            selectedItem: null
        };

    }

    _onPressItem = (item) => {
        this._showModal(item);
    };

    _hideMyModal = () => {
        this.setState({isModalVisible: false})
    }

    _showModal = (item) => this.setState({ isModalVisible: true,
        selectedItem: item })

    _keyExtractor = (item) => item.name;

    _renderItem = ({item}) => (
        <MyItem
            style={styles.cardContent}
            item={item}
            onPressItem={() => this._onPressItem(item)}
        />
    );

    render() {

        return (
            <View style={styles.safeView}>
                <View style={styles.containerContent}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                            <ScrollView style={styles.container}>
                                <FlatList
                                    data={this.items}
                                    ItemSeparatorComponent = {this._flatListItemSeparator}
                                    renderItem={this._renderItem}
                                    keyExtractor={this._keyExtractor}
                                />
                            </ScrollView>
                            { this.state.isModalVisible && <ModalForList selectedItem={this.state.selectedItem} modalVisible={this.state.isModalVisible} hideModal={this._hideMyModal} /> }
                        </KeyboardAvoidingView>

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
        backgroundColor: colorFundo,
    },

    containerContent: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16
    },

    cardContent: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        padding: 20,
        textAlign: 'justify',
        backgroundColor: colorButtons,
        borderRadius: 10,
        elevation: 2,
        shadowOpacity: 10
    },

    syndroTitle: {
        fontSize: 22,
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        color: black,
        fontWeight: 'bold',

    },

});
