module.exports = {
    dateFormat(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return {
            iso: `${year}-${month}-${day}`,
            day,
            month,
            year,
            birthday : `${day}/${month}`,
            formatCreatedAt : `${day}/${month}/${year}`
        }
    },
    formatPrice(price){
        return new Intl.NumberFormat('pt-BR', {
            style : 'currency',
            currency : 'BRL'
        }).format(price/100)
    }

}