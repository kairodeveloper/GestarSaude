function maskForDate(date) {
    let retorno = ""

    if (date.getDate()<10) {
        retorno += ("0"+date.getDate()+"/")
    } else {
        retorno += (date.getDate()+"/")
    }

    if (date.getMonth()<9) {
        retorno += ("0"+(date.getMonth()+1)+"/")
    } else {
        retorno += ((date.getMonth()+1)+"/")
    }
    retorno += date.getFullYear()   

    return retorno

}

export {
    maskForDate
}