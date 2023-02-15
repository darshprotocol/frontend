const Converter = {
    toMoney: function(amount, mF = 2) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: mF,
            //maximumFractionDigits: 0,
        });
        return formatter.format(amount).replace('$', '')
    }
}

export default Converter