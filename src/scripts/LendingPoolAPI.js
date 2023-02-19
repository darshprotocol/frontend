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

        let isNative = principalToken == nativeAddress
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

        let isNative = principalToken == nativeAddress

        try {
            await instance.acceptBorrowingOffer(
                offerId,
                percentage,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @lenders
    acceptBorrowingRequest: async function (
        requestId,
        isNative,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        let amount = isNative ? 1 : 0

        try {
            await instance.acceptBorrowingRequest(
                requestId,
                {
                    from: userAddress,
                    value: amount
                }
            )
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

        let isNative = principalToken == nativeAddress

        try {
            await instance.createLendingRequest(
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

        let isNative = collateralToken == nativeAddress

        try {
            await instance.createBorrowingOffer(
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

        let isNative = collateralToken == nativeAddress

        try {
            await instance.acceptLendingOffer(
                offerId,
                percentage,
                collateralToken,
                {
                    from: userAddress,
                    value: isNative ? collateralAmount : 0
                }
            )
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @borrower
    acceptLendingRequest: async function (
        requestId,
        isNative,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            await instance.acceptLendingRequest(
                requestId,
                {
                    from: userAddress,
                    value: isNative ? 1 : 0
                }
            )
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

        let isNative = collateralToken == nativeAddress

        try {
            await instance.createBorrowingRequest(
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
        } catch (error) {
            console.error(error);
            return null
        }
    },

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

        let isNative = principalToken == nativeAddress

        try {
            await instance.repayLoan(
                loanId,
                percentage,
                {
                    from: userAddress,
                    value: isNative ? principalAmount : 0
                }
            )
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // @claim
    claimPrincipal: async function (
        loanId,
        userAddress
    ) {
        const instance = await this.getInstance()
        if (instance == null) return null

        try {
            await instance.claimPrincipal(
                loanId,
                {
                    from: userAddress
                }
            )
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default LendingPoolAPI