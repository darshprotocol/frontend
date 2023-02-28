/* eslint-disable no-undef */
import contract from 'truffle-contract'
import LoanToValueABI from '../contracts/LoanToValueRatio.json'
import PriceFeedABI from '../contracts/PriceFeed.json'
import Web3 from 'web3'
import convert from '../utils/BaseConverter'

const LtvAPI = {
    ltv: null,
    priceFeed: null,
    PERCENT: 100,
    getInstance: async function () {
        if (this.ltv != null && this.priceFeed != null) return {
            ltv: this.ltv,
            priceFeed: this.priceFeed
        }

        const LoanToValue = contract(LoanToValueABI)
        const PriceFeed = contract(PriceFeedABI)

        const web3 = new Web3('https://fantom-testnet.public.blastapi.io');

        LoanToValue.setProvider(web3.currentProvider)
        PriceFeed.setProvider(web3.currentProvider)

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
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            let principalPriceInUSD = await instance.priceFeed.amountInUSD(
                principalToken,
                principalAmount
            );
            
            let ltv = await instance.ltv.getRelativeLTV(
                userAddress, 
                convert(principalPriceInUSD, 'wei', 'wei')
            );

            let collateralNormalAmount = await instance.priceFeed.exchangeRate(
                principalToken,
                collateralToken,
                principalAmount
            );

            let base = 10
            return this.percentageOf(collateralNormalAmount, ltv / base);
        } catch (error) {
            console.error(error);
            return '0'
        }
    },
    percentageOf: function (total, percent) {
        if (percent == 0) return total;
        return (total * percent) / this.PERCENT;
    }
}

export default LtvAPI