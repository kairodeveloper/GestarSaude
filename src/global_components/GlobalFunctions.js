import { getNextMid, saveThis, isEmpty } from "../../realm_services/RealmService";
import { func } from "prop-types";
import { ICONLITORAL, ICONCOCAIS, ICONENTRERIOS, ICONCARNAUBAIS, ICONSAMBITO, ICONALTOPARNAIBA, ICONMANGABEIRAS, ICONITAUEIRAS, ICONCANINDE, ICONCAPIVARA, ICONGUARIBAS } from "../../images";

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
                {nome: "Hospital Estadual Dirceu Arcoverde", cidade: "Parnaíba"},
                {nome: "Maternidade Dr. Marques Basto E Hospital Infantil Dr. Mirocles Veras", cidade: "Parnaíba"},
                {nome: "Hospital Municipal Nossa Senhora de Fátima", cidade: "Parnaíba"},
                {nome: "Dolce Vita", cidade: "Parnaíba"},
                {nome: "Hospital Local De Buriti Dos Lopes", cidade: "Buriti dos Lopes"}
            ]
        },{
            id: 2,
            name: "Cocais",
            sede: "Piripiri",
            estabelecimentos: [
                {nome: "Hospital Regional Chagas Rodrigues", cidade: "Piripiri"},
                {nome: "Centro De Saúde Da Mulher", cidade: "Piripiri"},
                {nome: "Hospital Estadual Gerson Castelo Branco", cidade: "Luzilândia"},
                {nome: "UMS Maria Dos Remedios", cidade: "Madeiro"},
                {nome: "Hospital Local Josefina Getirana Netta", cidade: "Pedro II"},
                {nome: "Hospital Santa Cruz", cidade: "Madeiro"},
                {nome: "Hospital Local De Matias Olimpio", cidade: "Madeiro"},
            ]
        },{
            id: 3,
            name: "Entre Rios",
            sede: "Teresina",
            estabelecimentos: [
                {nome: "Maternidade Dona Evangelina Rosa", cidade: "Teresina"},
                {nome: "Maternidade Municipal Prof Wall Ferraz", cidade: "Teresina"},
                {nome: "Maternidade Sigefredo Pacheco", cidade: "Teresina"},
                {nome: "Hospital Rio Poty", cidade: "Teresina"},
                {nome: "Hospital Sao Carlos Borromeo", cidade: "Teresina"},
                {nome: "Hospital de Terapia Intensiva e Med Int. de Teresina Ltda - HTI", cidade: "Teresina"},
                {nome: "Hospital Getúlio Vargas", cidade: "Teresina"},
                {nome: "Hospital Santa Maria", cidade: "Teresina"},
                {nome: "Hospital São Paulo", cidade: "Teresina"},
                {nome: "Hospital Unimed da Primavera", cidade: "Teresina"},
                {nome: "Hospital Universitário da Universidade Federal do Piauí", cidade: "Teresina"},
                {nome: "Hospital das Clínicas de Teresina Ltda.", cidade: "Teresina"},
                {nome: "Hospital São Marcos", cidade: "Teresina"},
                {nome: "Hospital Infantil Lucidio Portela", cidade: "Teresina"},
                {nome: "Hospital da Polícia Militar Dirceu Arcoverde", cidade: "Teresina"},
                {nome: "Hospital Geral do Monte Castelo", cidade: "Teresina"},
                {nome: "Unidade De Saúde Alberto Neto Pronto Socorro Dirceu II", cidade: "Teresina"},
                {nome: "Clínica Santa Fé Ltda", cidade: "Teresina"},
                {nome: "Unidade De Saúde Satélite", cidade: "Teresina"},
                {nome: "Unidade De Saude Promorar", cidade: "Teresina"},
                {nome: "Unidade de Saúde Primavera", cidade: "Teresina"},
                {nome: "Itacor", cidade: "Teresina"},
                {nome: "Prontomed Adulto", cidade: "Teresina"},
                {nome: "Instituto de Doenças Tropicais Natan Portela", cidade: "Teresina"},
                {nome: "Unidade de Urgência de Teresina Prof. Zenon Rocha - HUT", cidade: "Teresina"},
                {nome: "Casamater", cidade: "Teresina"},
                {nome: "Prontomed Infantil", cidade: "Teresina"},
                {nome: "Unidade de Urgência de Teresina Prof. Zenon Rocha - HUT", cidade: "Teresina"},   
                {nome: "Hospital Senador Dirceu Mendes Arcoverde", cidade: "Água Branca"},
                {nome: "Hospital De Amarante", cidade: "Amarante"},
                {nome: "UMS Jurandi Mendes", cidade: "Angical"},
                {nome: "Hospital de Altos Instituto De Saúde José Gil Barbosa", cidade: "Altos"}
            ]
        },{
            id: 4,
            name: "Carnaubais",
            sede: "Campo Maior",
            estabelecimentos: [
                {nome: "Hospital Regional de Campo Maior", cidade: "Campo Maior"},
                {nome: "Maternidade Sigefredo Pacheco", cidade: "Campo Maior"},
                {nome: "Policlinica Santa Maria", cidade: "São Miguel do Tapuio"},
                {nome: "Hospital Estadual José Furt De Mendonça", cidade: "São Miguel do Tapuio"},
                {nome: "UMS Fco Alves Do Monte", cidade: "Buriti dos Montes"},
                {nome: "UMS São Joaã Da Serra", cidade: "São João da Serra"},
                {nome: "Hosp Local De Matias Olimpio", cidade: "Madeiro"},
            ]
            
        },{
            id: 5,
            name: "Vale do Sambito",
            sede: "Valença",
            estabelecimentos: []
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
            estabelecimentos: []
        },{
            id: 8,
            name: "Tabuleiros dos Rios Piauí e Itaueiras",
            sede: "Floriano",
            estabelecimentos: []
        },{
            id: 9,
            name: "Vale do Canindé",
            sede: "Oeiras",
            estabelecimentos: []
        },{
            id: 10,
            name: "Serra da Capivara",
            sede: "São Raimundo Nonato",
            estabelecimentos: []
        },{
            id: 11,
            name: "Vale do Guaribas",
            sede: "Picos",
            estabelecimentos: []
        }
    ]

    regioes.map((it) => {
        if (it.id==value) {
            retorno = it
        }
    })

    return retorno
}

export {
    maskForDate,
    saveExames,
    getRegiaoData,
    getIconRegiaoById
}