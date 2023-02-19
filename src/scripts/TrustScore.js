/* eslint-disable no-undef */
import contract from 'truffle-contract'
import TrustScoreABI from '../contracts/TrustScore.json'
import Web3 from 'web3'

const LtvAPI = {
    instance: null,
    getInstance: async function () {
        if (this.instance != null) return this.instance

        const TrustScore = contract(TrustScoreABI)
        const web3 = new Web3('https://fantom-testnet.public.blastapi.io');
        TrustScore.setProvider(web3.currentProvider)

        try {
            this.instance = await TrustScore.deployed()
            console.log(this.instance);
            return this.instance
        } catch (error) {
            console.error(error);
            return null
        }
    },
    getTrustScore: async function (userAddress) {
        const instance = await this.getInstance()
        if (instance == null) return null
        let score = await instance.getScore(userAddress)
        if (score >= 100) {
            score = 99
        }

        let nScore = (100 - score)
        let label = ''
        let tag = ''

        if (nScore <= 40) {
            label = 'Poor'
            tag = 'bad'
        } else if (nScore <= 80) {
            label = 'Good'
            tag = 'good'
        } else {
            label = 'Excellent'
            tag = 'excellent'
        }

        return {
            score: nScore,
            label: label,
            tag: tag
        }
    }
}

export default LtvAPI