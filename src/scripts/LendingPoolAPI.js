/* eslint-disable no-undef */
import contract from 'truffle-contract'
import LendingPoolABI from '../contracts/LendingPool.json'

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const LendingPoolAPI = {
    instance: null,
    address: LendingPoolABI.networks[4002].address,
    getInstance: async function () {
        if (this.instance != null) return this.instance
        if (typeof ethereum === 'undefined') return null

        const LendingContract = contract(LendingPoolABI)
        LendingContract.setProvider(ethereum)

        try {
            this.instance = await LendingContract.deployed()
            return this.instance
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @lenders
    createLendingOffer: async function (
        principalToken,
        principalAmount,
        interest,
        daysToMaturity,
        daysToExpire,
        collateralTokens,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = principalToken.toLowerCase() == nativeAddress
        if (collateralTokens.length == 0) return null

        try {
            const trx = await instance.createLendingOffer(
                isNative ? 0 : principalAmount, // only for ERC20 assets
                principalToken,
                collateralTokens,
                daysToMaturity,
                interest,
                daysToExpire,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @lenders
    acceptBorrowingOffer: async function (
        offerId,
        percentage,
        principalAmount,
        principalToken,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = principalToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.acceptBorrowingOffer(
                offerId,
                percentage,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @lenders
    acceptBorrowingRequest: async function (
        requestId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.acceptBorrowingRequest(
                requestId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @lenders
    createLendingRequest: async function (
        offerId,
        percentage,
        principalAmount,
        principalToken,
        interest,
        daysToMaturity,
        hoursToExpire,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = principalToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.createLendingRequest(
                offerId,
                percentage,
                daysToMaturity,
                interest,
                hoursToExpire,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },















    // @borrower
    createBorrowingOffer: async function (
        principalToken,
        principalAmount,
        collateralToken,
        interest,
        daysToMaturity,
        hoursToExpire,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = collateralToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.createBorrowingOffer(
                principalToken,
                principalAmount,
                collateralToken,
                interest,
                daysToMaturity,
                hoursToExpire,
                {
                    from: userAddress,
                    value: isNative ? collateralAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @borrower
    acceptLendingOffer: async function (
        offerId,
        percentage,
        collateralToken,
        collateralAmount,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = collateralToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.acceptLendingOffer(
                offerId,
                percentage,
                collateralToken,
                {
                    from: userAddress,
                    value: isNative ? collateralAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @borrower
    acceptLendingRequest: async function (
        requestId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.acceptLendingRequest(
                requestId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @borrower
    createBorrowingRequest: async function (
        offerId,
        percentage,
        collateralToken,
        collateralAmount,
        interest,
        daysToMaturity,
        hoursToExpire,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = collateralToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.createBorrowingRequest(
                offerId,
                percentage,
                collateralToken,
                interest,
                daysToMaturity,
                hoursToExpire,
                {
                    from: userAddress,
                    value: isNative ? collateralAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    //////////////////// CANCEL / ACCEPT REQUESTS

    // @rejectRequest
    rejectRequest: async function (
        requestId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.rejectRequest(
                requestId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    cancelRequest: async function (
        requestId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.cancelRequest(
                requestId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    /////////////////////// REPAYMENT

    // @repayment
    repayLoan: async function (
        loanId,
        percentage,
        principalAmount,
        principalToken,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let isNative = principalToken.toLowerCase() == nativeAddress

        try {
            const trx = await instance.repayLoan(
                loanId,
                percentage,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    /////////////////// CLAIM

    // @claim
    claimPrincipal: async function (
        loanId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.claimPrincipal(
                loanId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    claimCollateral: async function (
        loanId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.claimCollateral(
                loanId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    claimDefaultCollateral: async function (
        loanId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.claimDefaultCollateral(
                loanId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    claimBorrowedPrincipal: async function (
        loanId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.claimBorrowedPrincipal(
                loanId,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    ////////////////// Remove Offer
    removePrincipal: async function (
        offerId, percentage, userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.removePrincipal(
                offerId,
                percentage,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },

    removeCollateral: async function (
        offerId, percentage, userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            const trx = await instance.removeCollateral(
                offerId,
                percentage,
                {
                    from: userAddress
                }
            )
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default LendingPoolAPI