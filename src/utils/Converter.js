const Converter = {
    fromWei: function (wei) {
        let ether = (wei / 1e18)
        return ether
    },
    toWei: function (ether) {
        let wei = (ether * 1e18)
        return wei.toFixed(0)
    },
    toMoney: function (amount, max = null) {
        let maxF = max ? max : 6
        if (amount > 1) {
            maxF = 3
        }
        if (amount > 10) {
            maxF = 2
        }
        if (amount > 200) {
            maxF = 0
        }
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: maxF
        });
        return formatter.format(amount).replace('$', '')
    },
    nFormatter: function (num, digits) {
        if (num < 1000) return this.toMoney(num)
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        const result = item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        return result.replace('$', '')
    }
}

export default Converter