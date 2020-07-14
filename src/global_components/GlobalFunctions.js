import React from 'react'
import { Text } from 'react-native'

import { getNextMid, saveThis, isEmpty } from "../../realm_services/RealmService";
import { ICONLITORAL, ICONCOCAIS, ICONENTRERIOS, ICONCARNAUBAIS, ICONSAMBITO, ICONALTOPARNAIBA, ICONMANGABEIRAS, ICONITAUEIRAS, ICONCANINDE, ICONCAPIVARA, ICONGUARIBAS } from "../../images";
import Notification from "../services/Notification";
import { red } from "../../colors";

function maskForDate(date) {
    let retorno = ""

    if (date.getDate() < 10) {
        retorno += ("0" + date.getDate() + "/")
    } else {
        retorno += (date.getDate() + "/")
    }

    if (date.getMonth() < 9) {
        retorno += ("0" + (date.getMonth() + 1) + "/")
    } else {
        retorno += ((date.getMonth() + 1) + "/")
    }
    retorno += date.getFullYear()

    return retorno

}

function saveExames() {
    if (isEmpty('Exame')) {
        let exames = []
        let trimestre1 = [
            "Hemograma",
            "Tipagem sanguinea e fator rh",
            "Glicemia em jejum",
            "Teste rápido diagnóstico HIV",
            "Toxoplasmos",
            "Sorologia para hepatite B (HbsAg)",
            "Ultrassonografia obstétrica",
            "Citopatológico de colo de útero"
        ]

        let trimestre2 = [
            "Teste de tolerância para glicose com 75g"
        ]

        let trimestre3 = [
            "Hemograma",
            "Glicemia em jejum",
            "Coombs indireto (se for Rh negativo)",
            "VDRL Anti-HIV",
            "Sorologia para hepatite B (HbsAg)",
            "Repetição toxoplasmose ",
            "Urocultura + urina tipo I (sumário de urina – SU)",
            "Bacterioscopia de secreção vaginal"
        ]

        trimestre1.map((it) => {
            exames.push({
                trimestre: 1,
                nome: it,
                feito: false
            })
        })

        trimestre2.map((it) => {
            exames.push({
                trimestre: 2,
                nome: it,
                feito: false
            })
        })

        trimestre3.map((it) => {
            exames.push({
                trimestre: 3,
                nome: it,
                feito: false
            })
        })

        exames.map((it) => {
            it.mid = getNextMid('Exame')
            saveThis('Exame', it)
        })
    }
}

function getIconRegiaoById(value) {
    if (value==1) {
        return ICONLITORAL
    } else if (value==2) {
        return ICONCOCAIS
    } else if (value==3) {
        return ICONENTRERIOS
    } else if (value==4) {
        return ICONCARNAUBAIS
    } else if (value==5) {
        return ICONSAMBITO
    } else if (value==6) {
        return ICONALTOPARNAIBA
    } else if (value==7) {
        return ICONMANGABEIRAS
    } else if (value==8) {
        return ICONITAUEIRAS
    } else if (value==9) {
        return ICONCANINDE
    } else if (value==10) {
        return ICONCAPIVARA
    } else {
        return ICONGUARIBAS
    }
}

function getRegiaoData(value) {
    let retorno = {}
    let regioes = [
        {
            id: 1,
            name: "Planície Litorânea",
            sede: "Parnaíba",
            estabelecimentos: [
                {nome: "Hospital Estadual Dirceu Arcoverde", cidade: "Parnaíba", endereco: "Rua Rodrigo Coimbra,1650-B.Rodoviária"},
                {nome: "Maternidade Dr. Marques Basto E Hospital Infantil Dr. Mirocles Veras", cidade: "Parnaíba", endereco: "Rua  Riachuelo, 932, B. Centro"},
                {nome: "Hospital Municipal Nossa Senhora de Fátima", cidade: "Parnaíba", endereco: "Rua Teresina,796, B. Nova Parnaíba"},
                {nome: "Hospital Local De Buriti Dos Lopes", cidade: "Buriti dos Lopes", endereco: "R. Joaquim Camilo Freitas, 1019"}
            ]
        },{
            id: 2,
            name: "Cocais",
            sede: "Piripiri",
            estabelecimentos: [
                {nome: "Hospital Regional Chagas Rodrigues", cidade: "Piripiri", endereco: "Av. Dr. Pádua Mendes, 300 - Morro da Saudade"},
                {nome: "Centro De Saúde Da Mulher", cidade: "Piripiri", endereco: "R. São Francisco, 435 - Centro"},
                {nome: "Hospital Estadual Gerson Castelo Branco", cidade: "Luzilândia", endereco: "R. João de Carvalho, S/N"},
                {nome: "UMS Maria Dos Remedios", cidade: "Madeiro", endereco: "-"},
                {nome: "Hospital Local Josefina Getirana Netta", cidade: "Pedro II", endereco: "R. Antônio Benígno da Silva, 400"},
                {nome: "Hospital Santa Cruz", cidade: "Madeiro", endereco: "-"},
                {nome: "Hospital Local De Matias Olimpio", cidade: "Matias Olímpio", endereco: "R. Joao Climaco Dalmeida , 194"},
            ]
        },{
            id: 3,
            name: "Entre Rios",
            sede: "Teresina",
            estabelecimentos: [
                {nome: "Maternidade Dona Evangelina Rosa", cidade: "Teresina", endereco: "Av. Higino Cunha, 1552 - Cristo Rei"},
                {nome: "Maternidade Municipal Prof Wall Ferraz", cidade: "Teresina", endereco: "Praça dos Correios, 3625 - Itararé"},
                {nome: "Maternidade Sigefredo Pacheco", cidade: "Teresina", endereco: "R. José de Almeida Paz, 50 - Praça do Rosário"},
                {nome: "Hospital Rio Poty", cidade: "Teresina", endereco: "R. Coelho de Resende, 1187 - Marquês de Paranaguá"},
                {nome: "Hospital São Carlos Borromeo", cidade: "Teresina", endereco: "Rua Vereador Joel Loureiro, S/N - Pedra Mole"},
                {nome: "Hospital de Terapia Intensiva e Med Int. de Teresina Ltda - HTI", cidade: "Teresina", endereco: "Av. Leônidas Melo, 370 - Piçarra"},
                {nome: "Hospital Getúlio Vargas", cidade: "Teresina", endereco: "Av. Frei Serafim, 2352 - Centro (Sul)"},
                {nome: "Hospital Santa Maria", cidade: "Teresina", endereco: "Rua Governador Raimundo Artur de Vasconcelos, 616 - Centro (Sul)"},
                {nome: "Hospital São Paulo", cidade: "Teresina", endereco: "Av. Lindolfo Monteiro, 1551 - Fátima"},
                {nome: "Hospital Unimed da Primavera", cidade: "Teresina", endereco: "R. Território Fernando de Noronha, 2566 - Primavera"},
                {nome: "Hospital Universitário da Universidade Federal do Piauí", cidade: "Teresina", endereco: "Campus Universitario Petrônio Portela - Hospital Universitário - Bairro Ininga"},
                {nome: "Hospital das Clínicas de Teresina Ltda.", cidade: "Teresina", endereco: "-"},
                {nome: "Hospital São Marcos", cidade: "Teresina", endereco: "Rua Governador Raimundo Artur de Vasconcelos - Sul"},
                {nome: "Hospital Infantil Lucidio Portela", cidade: "Teresina", endereco: "Rua Governador Raimundo Artur de Vasconcelos, 220 - Centro (Sul)"},
                {nome: "Hospital da Polícia Militar Dirceu Arcoverde", cidade: "Teresina", endereco: "Av. Higino Cunha, 1642 - Cristo Rei"},
                {nome: "Hospital Geral do Monte Castelo", cidade: "Teresina", endereco: "R. Antônio Cavour de Miranda, 357 - Monte Castelo"},
                {nome: "Clínica Santa Fé Ltda", cidade: "Teresina", endereco: "R. Primeiro de Maio, 906 - Marquês de Paranaguá"},
                {nome: "Unidade De Saúde Alberto Neto Pronto Socorro Dirceu II", cidade: "Teresina", endereco: "Quadra 250 casa 50 Dirceu II"},
                {nome: "Unidade De Saúde Satélite", cidade: "Teresina", endereco: "R. Plutão, S/N - Satélite"},
                {nome: "Unidade De Saúde Promorar", cidade: "Teresina", endereco: "Praca do Centro de Producao do Promorar, Q. D, 61 - Promorar"},
                {nome: "Unidade de Saúde Primavera", cidade: "Teresina", endereco: "Av. Duque de Caxias, 2661 - Primavera"},
                {nome: "Itacor", cidade: "Teresina", endereco: "R. Coelho de Resende, 831 - Centro (Sul)"},
                {nome: "Prontomed Adulto", cidade: "Teresina", endereco: "R. Paissandu, 1842 - Centro (Sul)"},
                {nome: "Instituto de Doenças Tropicais Natan Portela", cidade: "Teresina", endereco: "Rua Governador Raimundo Artur de Vasconcelos, 151 - Centro (Sul)"},
                {nome: "Unidade de Urgência de Teresina Prof. Zenon Rocha - HUT", cidade: "Teresina", endereco: "R. Dr. Otto Tito, 1820 - Redenção"},
                {nome: "Casamater", cidade: "Teresina", endereco: "-"},
                {nome: "Prontomed Infantil", cidade: "Teresina", endereco: "R. Magalhães Filho, 2016 - Centro (Sul)"},
                {nome: "Hospital Senador Dirceu Mendes Arcoverde", cidade: "Água Branca", endereco: "Av. Jose Miguel, 1375 - Centro"},
                {nome: "Hospital De Amarante", cidade: "Amarante", endereco: "R. Mal. Floriano, 548"},
                {nome: "UMS Jurandi Mendes", cidade: "Angical", endereco: "-"},
                {nome: "Hospital de Altos Instituto De Saúde José Gil Barbosa", cidade: "Altos", endereco: "R. Dom Avelar, 2328 - Batalhão"}
            ]
        },{
            id: 4,
            name: "Carnaubais",
            sede: "Campo Maior",
            estabelecimentos: [
                {nome: "Hospital Regional de Campo Maior", cidade: "Campo Maior", endereco: "Av Do Contorno, S/N, B. São Luiz"},
                {nome: "Maternidade Sigefredo Pacheco", cidade: "Campo Maior", endereco: "R. José de Almeida Paz, 50 - Praça do Rosário"},
                {nome: "Policlinica Santa Maria", cidade: "São Miguel do Tapuio", endereco: "R. Pedro II,  107, B. Centro"},
                {nome: "Hospital Estadual José Furt De Mendonça", cidade: "São Miguel do Tapuio", endereco: "Rua Coletor Jose Araujo,S/N, Centro"},
                {nome: "UMS Fco Alves Do Monte", cidade: "Buriti dos Montes", endereco: "Rua Antonio Francisco, S/N, B. Centro"},
                {nome: "UMS São João Da Serra", cidade: "São João da Serra", endereco: "Av Pedro Benicio, 195, B. Itararé"},
            ]

        },{
            id: 5,
            name: "Vale do Sambito",
            sede: "Valença",
            estabelecimentos: [
                {nome: "Hospital Reg Eustaquio Portela", cidade: "Valença", endereco: "Av. Santos Dumont, S/N, B. Centro"},
                {nome: "UMS de Aroazes", cidade: "Aroazes", endereco: "Av. 27 de fevereiro 905, B. Centro"},
                {nome: "UMS Pedro Lopes", cidade: "Francinópolis", endereco: "Rua Abdon Portela, 57, B. Centro"},
                {nome: "UMS Inhazinha Nunes", cidade: "Inhuma", endereco: "Rua Cel. Cícero Portela, 463, B. Centro"},
                {nome: "UMS Mônica R Dantas", cidade: "Pimenteira", endereco: "Rua Landri Sales, 486, B. Centro"},
                {nome: "UMS Dr Elon C De Aguiar", cidade: "Prata", endereco: "Av. Augustinho Pessoa, 355, B. Centro"},
                {nome: "UMS Antonio Batista", cidade: "São Felix", endereco: "Rua 20 de Novembro, 555, B. Centro"},
                {nome: "Unidade Mista Cicero R Almeida", cidade: "Várzea Grande", endereco: "Pça. Mal.Deodoro da Fonseca, 383, B. Centro"},
            ]
        },{
            id: 6,
            name: "Tabuleiros do Alto Parnaíba",
            sede: "Uruçuí",
            estabelecimentos: [
                {
                    nome: "De acordo com o CNES nenhum município realiza serviços obstétricos nesse território de Desenvolvimento.",
                    cidade: ""
                }
            ]
        },{
            id: 7,
            name: "Chapada das Mangabeiras",
            sede: "Bom Jesus",
            estabelecimentos: [
                {nome: "Hospital Regional Dr. João Pacheco Cavalcante", cidade: "Corrente", endereco: "Rua Antonio Nogueira De Carvalho, S/N, B. Centro"},
                {nome: "UMS Redenção Do Gurguéia", cidade: "Redenção do Gurguéia", endereco: "Rua Sao Jose, 399, B. Centro"},
                {nome: "UMS Anfrisio Neto Lobão Castelo Branco", cidade: "Monte Alegre", endereco: "Av Jose Luis Martins Maia, S/N, Centro"},
                {nome: "Hospital Local Julio B De Macedo", cidade: "Curimatá", endereco: "Rua Princesa Isabel, 650, B. Centro"},
            ]
        },{
            id: 8,
            name: "Tabuleiros dos Rios Piauí e Itaueiras",
            sede: "Floriano",
            estabelecimentos: [
                {nome: "Hospital Regional Tibério Nunes", cidade: "Floriano", endereco: "Rua Antonio Freire, S/N, B. Manguinha "},
                {nome: "UMS De Paes Landim", cidade: "Paes Landim", endereco: "Rua Piaui,245, B. Centro"},
                {nome: "Unidade Mista De Arraial", cidade: "Arraial", endereco: "Rua Padre Virgilio, 213, B. Centro"},
                {nome: "Hospital Estadual De Canto Do Buriti", cidade: "Canto do Buriti", endereco: "Rua Marechal Dutra,1266"},
                {nome: "Hospital Municipal Daniel Carlos De Andrade", cidade: "Itaueira", endereco: "Avenida Getulio Vargas, 785, B. Centro"},
                {nome: "UMS De Rio Grande Do Piaui", cidade: "Rio Grande do Piauí", endereco: "-"},
                {nome: "Hospital Municipal Sagrado Coração De Jesus", cidade: "Landri Sales", endereco: "Rua Santo Antonio"},
            ]
        },{
            id: 9,
            name: "Vale do Canindé",
            sede: "Oeiras",
            estabelecimentos: [
                {nome: "Hospital Estadual Jose de Moura Fé", cidade: "Simplício Mendes", endereco: "Rua José de Moura Fé, 604, B.Nova Cidade"},
                {nome: "Hopital Regional Deolindo Couto", cidade: "Oeiras", endereco: "Av. Rui Barbosa, 586, B. Centro"},
            ]
        },{
            id: 10,
            name: "Serra da Capivara",
            sede: "São Raimundo Nonato",
            estabelecimentos: [
                {nome: "Maternidade Municipal Mãe Elisa", cidade: "São Raimundo Nonato", endereco: "Av. Ernesto Carvalho, 500, B. Centro"},
                {nome: "CLISA", cidade: "São Raimundo Nonato", endereco: "Rua Ângelo Acelino, 841, B. Centro"},
                {nome: "Hospital Senador Cândido Ferraz", cidade: "São Raimundo Nonato", endereco: "Praça Capitão Neuton Rubem. 1351, B. Aldeia"},

            ]
        },{
            id: 11,
            name: "Vale do Guaribas",
            sede: "Picos",
            estabelecimentos: [
                {nome: "Hospital Geral De Picos", cidade: "Picos", endereco: "Av Severo Eulalio,55, B. Ingazeira"},
                {nome: "Hospital Regional Justino Luz", cidade: "Picos", endereco: "Rua Luis Nunes, 184, B.Bomba"},
                {nome: "Clínica De Urgência De Picos", cidade: "Picos", endereco: "Av. Senador Heivídio Nunes,994, B. Catavento"},
                {nome: "Casa De Saúde e Maternidade Nossa Senhora Dos Remédios", cidade: "Picos", endereco: "Avenidade Nossa Senhora De Fatima, 670, B. Centro"},
                {nome: "HGPAJO Hospital", cidade: "Picos", endereco: "Av. Severo Eulálio, 55, B.Canto Da Várzea"},
                {nome: "Hospital Local Dona Lourdes Mota", cidade: "Picos", endereco: "Av Francisco Das Chagas Fortaleza,255, B. Centro"},
                {nome: "Hospital Memorial Do Carmo", cidade: "Picos", endereco: "Rua São Francisco,328, B. Centro"},
                {nome: "Unidade Mista De Saude Luiz Josino De Barros", cidade: "Bocaina", endereco: "Rua São Pedro, 541, B. Centro"},
                {nome: "UMS de Ipiranga", cidade: "Ipiranga", endereco: "Praca Coronel Joaquim Rufino, S/N, B. Centro"},
                {nome: "Unidade Mista de Itainópolis", cidade: "Itainópolis", endereco: "Rua José Rodrigues, 119, B. Centro"},
                {nome: "UMS de Padre Marcos", cidade: "Padre Marcos", endereco: "Av Jose De Moura Leal,S/N, B. Centro"},
                {nome: "Hospital Regional Mariana Pires Ferreira", cidade: "Paulistana", endereco: "Mal. Deodoro, 285, B. Centro"},
                {nome: "Hospital Estadual Maternidade Petronila Cavalcanti", cidade: "Paulistana", endereco: "Rua Petrônio Cavalcante,423, B. Centro"},
                {nome: "Hospital Municipal Zuca Batista", cidade: "Simões", endereco: "R. Jose Dias, 325"},
            ]
        }
    ]

    regioes.map((it) => {
        if (it.id==value) {
            retorno = it
        }
    })

    return retorno
}

function getDefinicoes(quadro) {
    let retorno = []
    let data = [
        {
            name: 'Hipertensão Gestacional (HG)',
            quadro: 1,
            description: 'refere-se à identificação de hipertensão arterial, em ' +
                'gestante previamente normotensa, porém sem proteinúria ou manifestação de outros sinais/sintomas' +
                ' relacionados a pré-eclâmpsia. Essa forma de hipertensão deve desaparecer até 12 semanas após o ' +
                'parto. Assim, diante da persistência dos níveis pressóricos elevados, deve ser reclassificada como' +
                ' hipertensão arterial crônica, que foi mascarada pelas alterações fisiológicas da primeira metade ' +
                'da gestação. Diante dos conceitos atuais sobre o diagnóstico de pré-eclâmpsia, mesmo na ausência' +
                ' de proteinúria, é preciso estar sempre atento à possibilidade de evolução desfavorável de casos ' +
                'inicialmente diagnosticados como hipertensão gestacional, pois até 25% dessas pacientes ' +
                'apresentarão sinais e/ou sintomas relacionados a pré-eclâmpsia, alterando-se, portanto, o seu ' +
                'diagnóstico.',
            link: ''
        },
        {
            name: 'Hipertensão Arterial Crônica (HAC)', 
            quadro: 1,
            description: 'Presença de hipertensão reportada pela ' +
                'gestante ou identificada antes de 20 semanas de gestação.',
            link: ''
        },
        {
            name: 'Pré-eclâmpsia (PE)',
            quadro: 1,
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
                'de pré-eclâmpsia, mesmo na ausência de proteinúria',
            link: ''
        },
        {
            name: 'Pré-eclâmpsia sobreposta à hipertensão arterial crônica',
            quadro: 1,
            description: 'esse diagnóstico deve ser ' +
                'estabelecido em algumas situações específicas: 1) quando, após 20 semanas de gestação, ' +
                'ocorre o aparecimento ou piora da proteinúria já detectada na primeira metade da ' +
                'gravidez (sugere-se atenção se o aumento for superior a três vezes o valor inicial); 2) ' +
                'quando gestantes portadoras de hipertensão arterial crônica necessitam de associação de ' +
                'anti-hipertensivos ou incremento das doses terapêuticas iniciais; 3) na ocorrência de ' +
                'disfunção de órgãos-alvo. ' +
                'A PE pode ser classificada ainda em:\n ' +
                '\n1. PE de início precoce (com entrega < 34 semanas de gestação);\n' +
                '2. PE prematuro (com parto < 37 semanas de gestação);\n' +
                '3. PE de início tardio (com entrega em ≥34 semanas de gestação);\n' +
                '4. PE a termo (com parto em ≥ 37 semanas de gestação).',
            link: ''
        },
        {
            name: '11 a 13 semanas', 
            quadro: 4,
            description: 'Em um estudo do tipo secundário, derivado de três estudos prospectivos com objetivo de analisar o desempenho da triagem para pré-eclâmpsia (EP) precoce, pré-termo e a termo na gestação de 11 a 13 semanas por fatores maternos e combinações de pressão arterial média (PAM), índice de pulsatilidade da artéria uterina (UtA), soro fator de crescimento placentário (PlGF) e proteína plasmática associada à gravidez sérica (PAPP-A). De um total de 61.174 gestações únicas, incluindo 1770 (2,9%) que desenvolveram EP. Nas gestações que desenvolveram EP, em comparação com aquelas sem EP, os valores de MoM de UtA ‐ PI e MAP foram aumentados e os de PAPP ‐ A e PlGF diminuíram, e o desvio do normal foi maior para o PE precoce do que tardio para todos os quatro biomarcadores . A triagem combinada por fatores maternos, UtA ‐ PI, MAP e PlGF previu 90% de PE precoce, 75% de PE prematuro e 41% de PE a termo, a uma taxa de tela positiva de 10%; a inclusão de PAPP ‐ A não melhorou o desempenho da triagem. Concluíram que a triagem por fatores maternos e biomarcadores entre 11 e 13 semanas de gestação pode identificar uma alta proporção de gestações que desenvolvem PE precoce e prematuro.',
            link: 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.19112'
        },
        {
            name: '19 a 24 semanas', 
            quadro: 4,
            description: 'Um estudo observacional prospectivo, com objetivo de estimar o risco específico do paciente EP nas 19-24 semanas de gestação por fatores maternos e combinações de PAM, UtA-PI, fator PLGF e tirosina quinase-1 solúvel em soro do tipo sérica (sFlt-1). Com base no risco de EP, as mulheres seriam estratificadas em mid: ,grupos de gerenciamento de alto, intermediário e baixo risco. O mid: ,grupo de alto risco exigiria um monitoramento cuidadoso da pressão alta e da proteinúria entre 24 e 31 semanas. O mid: ,grupo de risco intermediário, juntamente com as gestações não entregues do mid: ,grupo de alto risco, teria uma reavaliação do risco de EP em 32 semanas para identificar aqueles que precisariam de monitoramento próximo da pressão arterial alta e proteinúria em 32-35 semanas. Os riscos específicos do paciente ao parto com EP com <32 e <36 semanas de gestação foram calculados usando o modelo de riscos concorrentes para combinar a distribuição anterior da idade gestacional no parto com PE, obtida a partir das características maternas e do histórico médico, com múltiplos de os valores medianos (MoM) de MAP, UtA-PI, PlGF e sFlt-1. A população estudada de 16 254 gestações únicas incluiu 467 (2,9%) que desenvolveram EP subsequentemente (23 entregues em <32 semanas, 58 entregues em 32 + 0 a 35 + 6 semanas e 386 entregues em ≥ 36 semanas). Usando um risco de> 1 em 25 para EP com <32 semanas de gestação e risco de> 1 em 150 para EP com <36 semanas, a proporção da população estratificada no mid: ,grupo de alto risco foi de cerca de 1% do total, e a proporção de casos de EP com <32 semanas de gestação contidos nesse mid: ,grupo de alto risco variou de cerca de 35% com triagem por fatores maternos e PAM, a 78% com fatores maternos, PAM e UtA-PI e até 100 % com fatores maternos, PAM, UtA-PI e PlGF, com ou sem sFlt-1. Da mesma forma, a proporção da população que requer reavaliação de risco em 32 semanas. Concluíram que na nova pirâmide de cuidados com a gravidez, a avaliação do risco de EP nas 19-24 semanas de gestação pode estratificar a população naqueles que necessitam de monitoramento intensivo nas 24-31 semanas e naqueles que necessitam de reavaliação às 32 semanas.',
            link: 'https://pubmed.ncbi.nlm.nih.gov/29943498/'
        },
        {
            name: '30 a 34 semanas', 
            quadro: 4,
            description: 'Um estudo observacional prospectivo, com objetivo de estimar o risco específico da paciente com EP entre 30 e 34 semanas de gestação por uma combinação de características maternas e histórico médico com múltiplos dos valores medianos (MoM) da PAM, UtA-PI, PLGF e sFlt-1 e estratificam as mulheres em mid: ,grupos de manejo de alto, intermediário e baixo risco. Os riscos específicos da paciente ao parto com EP com menos de 4 semanas da avaliação e com menos de 40 semanas de gestação foram calculados usando o modelo de riscos competitivos para combinar o risco anterior de características maternas e histórico médico com os valores MoM de MAP, UtA-PI, PlGF e sFlt-1. Com base nesses riscos, a população foi estratificada em mid: ,grupos de alto, intermediário e baixo risco. A população estudada de 8128 gestações únicas incluiu 234 (2,9%) que subsequentemente desenvolveram EP. Usando um ponto de corte de risco de 1 em 50 para PE com menos de 4 semanas e um ponto de corte de 1 em 150 para PE com <40 semanas de gestação, a proporção da população estratificada em risco alto, intermediário e baixo foi de cerca de 3%, 26% e 71%, respectivamente. O mid: ,grupo de alto risco continha 90% das gestações com PE em <4 semanas e 40% daquelas com PE em 4 semanas, desde a avaliação até a gestação de 40 semanas. O mid: ,grupo de risco intermediário continha mais 49% de mulheres com PE às 4 semanas da avaliação às 40 semanas gestacionais. No mid: ,grupo de baixo risco, nenhuma das mulheres desenvolveu EP em <4 semanas e apenas 0,3% desenvolveu EP em 4 semanas a 40 semanas gestacionais. Concluem que ao identificar o mid: ,grupo de alto risco deve-se ter um monitoramento intensivo desde o momento da avaliação inicial e até 40 semanas de gestação e que todas as gestações precisariam ser reavaliadas com 40 semanas.',
            link: 'https://www.nejm.org/doi/full/10.1056/nejmoa1704559'
        },
        {
            name: '35 a 37 semanas', 
            quadro: 4,
            description: 'Em um estudo observacional, com objetivo de estimar o risco específico do paciente de pré-eclâmpsia (EP) nas 35-37 semanas de gestação por uma combinação de características maternas e histórico médico com múltiplos dos valores medianos (MoM) de PAM, UtA ‐ PI, PLGF e sFlt ‐ 1 e estratificam as mulheres em mid: ,grupos de manejo de alto, intermediário e baixo risco.   O mid: ,grupo de alto risco exigiria monitoramento intensivo desde o momento da avaliação inicial e até 40 semanas de gestação, o mid: ,grupo de risco intermediário exigiria uma reavaliação com 40 semanas de gestação e o mid: ,grupo de baixo risco seria gerenciado com expectativa. A população estudada de 3703 gestações únicas incluiu 38 (1,0%) com PE <40 semanas de gestação e 22 (0,6%) com PE ≥ 40 semanas. O mid: ,grupo de alto risco continha 92% das gestações com PE com menos de 40 semanas de gestação e 73% daquelas com PE com ≥ 40 semanas. O mid: ,grupo de risco intermediário continha mais 27% de mulheres com PE com ≥ 40 semanas. No mid: ,grupo de baixo risco, nenhuma das mulheres desenvolveu EP com <40 ou ≥ 40 semanas de gestação. O mid: ,grupo classificado como de alto risco para EP pode ser monitorado por medição da pressão arterial e exame de urina pelo menos semanalmente e as mulheres podem ser aconselhadas a relatar quaisquer sintomas associados à EP grave, como distúrbios visuais e dor epigástrica. O mid: ,grupo de risco intermediário exige reavaliação com 40 semanas de gestação, mas essas mulheres também seriam aconselhadas a relatar quaisquer sintomas associados à EP grave. O mid: ,grupo de baixo risco pode ter certeza de que o desenvolvimento de EP é muito improvável e, na ausência de achados anormais de ultrassom ou outras indicações obstétricas, as gestações podem ser gerenciadas com expectativa, aguardando o início espontâneo do trabalho de parto. Os limites de risco para definir a proporção da população estratificada em cada um dos três mid: ,grupos de manejo e os protocolos para esse manejo variarão inevitavelmente de acordo com as preferências locais e as considerações econômicas da saúde.',
            link: 'https://pubmed.ncbi.nlm.nih.gov/28133834/'
        },
        {
            name: 'Uso da aspirina 1', 
            quadro: 4,
            description: 'Uma meta-análise, incluindo 31 estudos randomizados de prevenção de EP, incluindo 32.217 gestações, mostrou que pacientes que receberam agentes antiplaquetários, especialmente aspirina para prevenção de PE, tiveram uma redução de 10% da PE (RR 0,90; IC95%, 0,84 –0,97), parto prematuro antes das 34 semanas de gestação e resultados adversos graves da gravidez (EP, parto <34 semanas de gestação, bebês com ASG, morte fetal ou materna).',
            link: 'https://www.nejm.org/doi/full/10.1056/nejmoa1704559'
        },
        {
            name: 'Uso da aspirina 2', 
            quadro: 4,
            description: 'Um outro estudo, mostrou que a dose baixa de aspirina iniciada com menos de ou igual a 16 semanas de gestação em mulheres com risco de EP teve uma redução substancial na taxa de PE. No entanto, a aspirina iniciada após 16 semanas de gestação não diminuiu a taxa de EP. A administração de aspirina em baixa dose (50–150 mg / d) com menor ou igual a 16 semanas de gestação em mulheres com risco de EP teve uma redução significativa na EP, em particular EP prematuro. Além disso, destacaram que os benefícios adicionais da profilaxia precoce com aspirina incluem uma redução de 60% no risco de morte perinatal. Esses resultados estimularam a necessidade de um estudo randomizado prospectivo para avaliar o potencial benefício da aspirina na prevenção da EP.',
            link: 'https://www.ajog.org/article/S0002-9378(17)32326-8/abstract'
        }
    ];
    
    data.map((it) => {
        if (it.quadro==quadro) {
            retorno.push(it)
        }
    })

    return retorno
}

function getSintomas(type) {
    let data = type==1 ? [
        {
            name: "Síndromes hemorrágicas (sangramento):",
            content: "independentemente da idade gestacional.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Cefaleia (dor de cabeça):",
            content: "crises convulsivas",
            valueOnly: "",
            content2: ""
        }, {
            name: "Pressão arterial:",
            content: "acima do seu padrão normal.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Amniorrexe prematura:",
            content: "perda de líquido vaginal (consistência líquida, em pequena ou grande quantidade, mas de forma persistente).",
            valueOnly: "",
            content2: ""
        }, {
            name: "Anemia grave:",
            content: "hemoglobina < 8.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Trabalho de parto prematuro:",
            content: "contrações e modificação de colo uterino em gestantes com menos de 36 semanas.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Hipertermia:",
            content: "(Temperatura corporal >= 37,8Cº), na ausência de sinais ou sintomas clínicos.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Suspeita de trombose venosa profunda em gestantes:",
            content: "dor no membro inferior, edema localizado e/ou varicosidade aparente.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Vômitos incoercíveis:",
            content: "não responsivos ao tratamento, com comprometimento sistêmico com menos de 20 semanas.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Vômitos inexplicáveis no 3º trimestre",
            content: "-",
            valueOnly: "",
            content2: ""
        }, {
            name: "Crise aguda de asma",
            content: "-",
            valueOnly: "",
            content2: ""
        }
    ] : [
        {
            name: "Edema (inchaço):",
            content: "apenas edema de tornozelo, sem hipertensão (pressão alta) ou aumento súbito de peso: Verifique se o edema está relacionado à postura, ao fim do dia, ao aumento da temperatura ou ao tipo de calçado.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Edema limitado aos membros inferiores:",
            content: "porém na presença de hipertensão ou ganho de peso: repouso em decúbito lateral esquerdo. Necessária avaliação clínica. Marque retorno em sete dias, na ausência de sintomas. A gestante deve ser avaliada e acompanhada pelo médico da unidade, de acordo com o calendário de rotina. Caso haja hipertensão, a gestante deve ser encaminhada para um serviço de alto risco.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Edema generalizado (face, tronco e membros):",
            content: "ou que já se mostra presente quando a gestante acorda, acompanhado ou não de hipertensão ou aumento súbito de peso.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Gestante de risco em virtude de suspeita de pré-eclâmpsia ou outras intercorrências:",
            content: "A gestante deve ser avaliada pelo médico da unidade e encaminhada para serviço de alto risco.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Edema unilateral de membros inferiores, com dor e/ou sinais flogísticos (dor, calor, vermelhidão):",
            content: "Suspeita de processos trombóticos. A gestante deve ser avaliada pelo médico da unidade e encaminhada para o serviço de alto risco.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Pressão arterial (PA):",
            content: "Níveis de PA conhecidos e normais antes da gestação: Manutenção dos mesmos níveis de PA;",
            valueOnly: "",
            content2: ""
        }, {
            name: "Níveis tensionais normais:",
            content: "Mantenha o calendário habitual;\nCuide da alimentação;\nPratique atividade física regularmente.",
            valueOnly: "",
            content2: ""
        }, {
            name: "Níveis de PA desconhecidos antes da gestação:",
            content: "Valores da pressão ",
            valueOnly: "140/90mmHg",
            content2: ": Considere o aumento dos níveis tensionais em relação aos níveis anteriores à gestação: Diminua a ingestão de sal; aumente a ingestão hídrica; pratique atividade física regularmente. "
        }, {
            name: "Níveis de PA conhecidos e normais antes da gestação:",
            content: "Aumento da PA, mantendo nível ",
            valueOnly: "< 140/90mmHg: Sinal de alerta",
            content2: " - Diminua a ingestão de sal; aumente a ingestão hídrica; pratique atividade física regularmente; agende controles mais próximos."
        }, {
            name: "Níveis de PA conhecidos ou desconhecidos antes da gestação: ",
            content: "Valores da PA ",
            valueOnly: "> 140/90mmHg e < 160/110",
            content2: ", sem sintomas e sem ganho ponderal maior do que 500g semanais: Considere HAS na gestação - Atente para a possibilidade de erro de cálculo da idade gestacional (IG); Realize proteinúria (teste rápido); A gestante deve ser avaliada pelo médico da unidade, realizar ultrassonografia, se possível; Caso permaneça dúvida, retorno em 15 dias para reavaliação ou, se possível, a gestante será encaminhada para o serviço de alto risco."
        }, {
            name: "Níveis de PA conhecidos ou desconhecidos antes da gestação: ",
            content: "Valores de ",
            valueOnly: "PA > 140/90mmHg",
            content2: ", proteinúria (teste rápido) positiva e/ou com sintomas clínicos (dor de cabeça, dor no estômago, escotomas (diminuição parcial ou total da capacidade de enxergar), reflexos tendíneos aumentados) ou paciente assintomática, porém com níveis de PA > 160/110mmHg - Paciente com suspeita de pré-eclâmpsia grave. Deve-se referir imediatamente a gestante ao pré-natal de alto risco e/ou à unidade de referência hospitalar."
        }, {
            name: "Paciente com hipertensão arterial crônica, moderada ou grave, ou em uso de medicação anti-hipertensiva:",
            content: "Paciente de risco - Deve-se referir a gestante ao pré-natal de alto risco.",
            valueOnly: "",
            content2: ""
        }
    ]

    return data
}

function getOpcoesRiscoGestacional() {
    //≥ ≤
    let data = [
        {mid: 1, grupo: 1, nome: "< 15 anos", selecionado: false, pontuacao: 2},
        {mid: 2, grupo: 1, nome: "de 15 a 19 anos", selecionado: false, pontuacao: 1},
        {mid: 3, grupo: 1, nome: "de 20 a 34 anos", selecionado: false, pontuacao: 0},
        {mid: 4, grupo: 1, nome: "≥ 35 anos", selecionado: false, pontuacao: 1},
        
        {mid: 5, grupo: 2, nome: "até % salário", selecionado: false, pontuacao: 1},
        {mid: 6, grupo: 2, nome: "≥ % salário", selecionado: false, pontuacao: 0},
        
        {mid: 7, grupo: 3, nome: "Aceita", selecionado: false, pontuacao: 0},
        {mid: 8, grupo: 3, nome: "Não aceita", selecionado: false, pontuacao: 1},
        
        {mid: 9, grupo: 4, nome: "Sim", selecionado: false, pontuacao: 0},
        {mid: 10, grupo: 4, nome: "Não", selecionado: false, pontuacao: 1},
        
        {mid: 11, grupo: 5, nome: "Tabagista", selecionado: false, pontuacao: 2},
        {mid: 12, grupo: 5, nome: "Etilismo", selecionado: false, pontuacao: 5},
        {mid: 13, grupo: 5, nome: "Drogas (cocaina, crack, outras)", selecionado: false, pontuacao: 10},
        
        {mid: 14, grupo: 6, nome: "Negativo", selecionado: false, pontuacao: 4},
        {mid: 15, grupo: 6, nome: "Positivo", selecionado: false, pontuacao: 0},

        {mid: 16, grupo: 7, nome: "Baixo peso (IMC < 18,5 kg/m²) e /ou ganho de peso inadequado e/ou anemia", selecionado: false, pontuacao: 2},
        {mid: 17, grupo: 7, nome: "Peso adequado (IMC 18,5 - 24,9 kg/m²)", selecionado: false, pontuacao: 0},
        {mid: 18, grupo: 7, nome: "Sobrepeso (IMC 25 - 29,9 kg/m2)", selecionado: false, pontuacao: 2},
        {mid: 19, grupo: 7, nome: "Obesidade (IMC >30kg/m²)", selecionado: false, pontuacao: 5},

        {mid: 20, grupo: 8, nome: "Abortos espontâneos < 3", selecionado: false, pontuacao: 5},
        {mid: 21, grupo: 8, nome: "Abortos espontâneos 3 ou mais", selecionado: false, pontuacao: 10},
        {mid: 22, grupo: 8, nome: "1 Natimorto/prematuro/óbito perinatal", selecionado: false, pontuacao: 5},
        {mid: 23, grupo: 8, nome: "Mais de 1 filho prematuro/natimorto", selecionado: false, pontuacao: 10},
        {mid: 24, grupo: 8, nome: "Cesárea 3 ou mais", selecionado: false, pontuacao: 5},
        {mid: 25, grupo: 8, nome: "Pré-eclâmpsia leve", selecionado: false, pontuacao: 5},
        {mid: 26, grupo: 8, nome: "Pré-eclâmpsia grave", selecionado: false, pontuacao: 10},
        {mid: 27, grupo: 8, nome: "Eclâmpsia", selecionado: false, pontuacao: 10},
        {mid: 28, grupo: 8, nome: "Placenta prévia", selecionado: false, pontuacao: 10},
        {mid: 29, grupo: 8, nome: "Deslocamento prematuro da Placenta", selecionado: false, pontuacao: 5},
        {mid: 30, grupo: 8, nome: "Incopetência istmo cervical", selecionado: false, pontuacao: 5},
        {mid: 31, grupo: 8, nome: "Restrição de crescimento intrauterino", selecionado: false, pontuacao: 10},
        {mid: 32, grupo: 8, nome: "Malformação fetal", selecionado: false, pontuacao: 5},
        {mid: 33, grupo: 8, nome: "Último parto < 12 meses", selecionado: false, pontuacao: 5},
        {mid: 34, grupo: 8, nome: "Intervalo interpartal ≥ 5 anos", selecionado: false, pontuacao: 2},
        {mid: 35, grupo: 8, nome: "Trombose Venosa Profunda/Embolia", selecionado: false, pontuacao: 10},
        {mid: 36, grupo: 8, nome: "Esterilidade/infertilidade", selecionado: false, pontuacao: 5},

        {mid: 37, grupo: 9, nome: "Doença Hipertensiva da Gestação", selecionado: false, pontuacao: 10},
        {mid: 38, grupo: 9, nome: "Diabetes gestacional", selecionado: false, pontuacao: 10},
        {mid: 39, grupo: 9, nome: "Câncer materno", selecionado: false, pontuacao: 10},
        {mid: 40, grupo: 9, nome: "Citologia Cervical Anormal (NIC II-III)", selecionado: false, pontuacao: 10},
        {mid: 41, grupo: 9, nome: "Presença de nódulos à palpação mamária", selecionado: false, pontuacao: 10},
        {mid: 42, grupo: 9, nome: "Placenta prévia", selecionado: false, pontuacao: 10},
        {mid: 43, grupo: 9, nome: "Isoimunização", selecionado: false, pontuacao: 10},
        {mid: 44, grupo: 9, nome: "Malformações fetais/ Arritmia fetal", selecionado: false, pontuacao: 10},
        {mid: 45, grupo: 9, nome: "Restrição de Crescimento intrauterino", selecionado: false, pontuacao: 10},
        {mid: 46, grupo: 9, nome: "Polihidramnio/Oligodrâmnio", selecionado: false, pontuacao: 10},
        {mid: 47, grupo: 9, nome: "Gravidez múltipla", selecionado: false, pontuacao: 10},
        {mid: 48, grupo: 9, nome: "Incompetência istmo Cervical", selecionado: false, pontuacao: 10},
        {mid: 49, grupo: 9, nome: "Ameaça de aborto", selecionado: false, pontuacao: 5},
        {mid: 50, grupo: 9, nome: "Anomalia do trato Geniturinário", selecionado: false, pontuacao: 5}, 

        {mid: 51, grupo: 10, nome: "Hipertensão arterial crônica", selecionado: false, pontuacao: 10},
        {mid: 52, grupo: 10, nome: "Diabetes Mellitus/Endocrinopatias", selecionado: false, pontuacao: 10},
        {mid: 53, grupo: 10, nome: "Cardiopatias", selecionado: false, pontuacao: 10},
        {mid: 54, grupo: 10, nome: "Pneumonia Grave", selecionado: false, pontuacao: 10},
        {mid: 55, grupo: 10, nome: "Doenças Autoimunes (Coladenose, lúpus)", selecionado: false, pontuacao: 10},
        {mid: 56, grupo: 10, nome: "Doença Renal Grave", selecionado: false, pontuacao: 10},
        {mid: 57, grupo: 10, nome: "Epilepsia/Doença neurológica", selecionado: false, pontuacao: 10} ,
        {mid: 58, grupo: 10, nome: "Doenças hematológicas", selecionado: false, pontuacao: 10},
        {mid: 59, grupo: 10, nome: "Infecção urinária de repetição", selecionado: false, pontuacao: 10},
        {mid: 60, grupo: 10, nome: "Infecções graves", selecionado: false, pontuacao: 10},
        {mid: 61, grupo: 10, nome: "AIDS/HIV", selecionado: false, pontuacao: 10},
        {mid: 62, grupo: 10, nome: "Hepatite B", selecionado: false, pontuacao: 10},
        {mid: 63, grupo: 10, nome: "Tuberculose/Hanseníase", selecionado: false, pontuacao: 10},
        {mid: 64, grupo: 10, nome: "Toxoplasmose", selecionado: false, pontuacao: 10},
        {mid: 65, grupo: 10, nome: "Alterações genéticas maternas", selecionado: false, pontuacao: 10},
        {mid: 66, grupo: 10, nome: "Doenças psiquiátricas", selecionado: false, pontuacao: 5}
     ]

    return data
}

function countDays(dateBegin, dateEnd) {
    return(Math.round((dateEnd.getTime() - dateBegin.getTime())/(1000*60*60*24)+1))
}

function getScheduleConsultationAlert(schedule) {

    const date = new Date();
    const data = maskForDate(schedule['data']);
    const dateSplited = data.split('/');
    const hourSplited = schedule['hora'].split(':');

    date.setDate(parseInt(dateSplited[0]));
    date.setMonth(parseInt(dateSplited[1])-1);
    date.setFullYear(parseInt(dateSplited[2]));
    date.setHours(parseInt(hourSplited[0]));
    date.setMinutes(parseInt(hourSplited[1]));
    date.setSeconds(0);

    console.log("Passou mesmo!")

    Notification
        .configure()
        .localNotificationSchedule({ // notificação agendada
            message: `Lembrete de consulta: ${schedule['nome']}`,
            date: date
        });

}

function FormatDateToString(data) {

    var date = data.toISOString().substr(0, 10).split('-');

    return `${date[2]}/${date[1]}/${date[0]}`;
}

export {
    maskForDate,
    saveExames,
    getRegiaoData,
    getDefinicoes,
    getIconRegiaoById,
    countDays,
    getSintomas,
    getScheduleConsultationAlert,
    FormatDateToString,
    getOpcoesRiscoGestacional
}
