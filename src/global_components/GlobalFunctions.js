import { getNextMid, saveThis, isEmpty } from "../../realm_services/RealmService";

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

export {
    maskForDate,
    saveExames
}