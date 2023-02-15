/* eslint-disable no-undef */
import contract from 'truffle-contract'
import LoanToValueABI from '../contracts/LoanToValueRatio.json'
import PriceFeedABI from '../contracts/PriceFeed.json'

const LtvAPI = {
    ltv: null,
    priceFeed: null,
    PERCENT: 100,
    getInstance: async function () {
        if (this.ltv != null && this.priceFeed != null) return {
            ltv: this.ltv,
            priceFeed: this.priceFeed
        }

        if (typeof ethereum === 'undefined') return null

        const LoanToValue = contract(LoanToValueABI)
        const PriceFeed = contract(PriceFeedABI)

        LoanToValue.setProvider(ethereum)
        PriceFeed.setProvider(ethereum)

        try {
            this.ltv = await LoanToValue.deployed()
            this.priceFeed = await PriceFeed.deployed()
            return {
                ltv: this.ltv,
                priceFeed: this.priceFeed
            }
        } catch (error) {
            console.error(error);
            return null
        }
    },
    getCollateralAmount: async function (
        principalToken,
        collateralToken,
        principalAmount,
        userAddress
    ) {
        const ins = await this.getInstance()
        console.log(ins);
        if (ins == null) return null
        let principalPriceInUSD = await ins.priceFeed.amountInUSD(
            principalToken,
            principalAmount
        );
        let ltv = await ins.ltv.getRelativeLTV(userAddress, principalPriceInUSD);
        let collateralNormalAmount = await ins.priceFeed.exchangeRate(
            principalToken,
            collateralToken,
            principalAmount
        );
        
        let base = await ins.ltv.getBase()
        return this.percentageOf(collateralNormalAmount, ltv) / base;
    },
    percentageOf: function(total, percent) {
        if (percent == 0) return total;
        return (total * percent) / this.PERCENT;
    }
}

export default LtvAPI