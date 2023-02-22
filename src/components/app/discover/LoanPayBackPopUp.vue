<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Loan Payback</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div>
                <p>Payback Amount</p>
                <div>
                    <p>{{ $toMoney($fromWei(getPaybackAmount()), $findAsset(loan.principalToken).maxDecimal) }}</p>
                    <div>
                        <img :src="`/images/${$findAsset(loan.principalToken).image}.png`" alt="">
                        <p>{{ $findAsset(loan.principalToken).symbol }}</p>
                    </div>
                </div>
            </div>
            <div class="slider">
                <Slider v-model="percentage" :step="25" :max="max()" :format="{ suffix: '%' }" />
            </div>
            <div>
                <PrimaryButton v-if="$fromWei(allowance) >= $fromWei(getPaybackAmount())" v-on:click="repayLoan()"
                    :text="'Payback'" />
                <PrimaryButton v-else v-on:click="approve()" :text="'Approve'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import Slider from '@vueform/slider'
import IconClose from '../../icons/IconClose.vue';
import PrimaryButton from '../../PrimaryButton.vue';
</script>

<script>
import Authentication from '../../../scripts/Authentication';
import LendingPoolAPI from '../../../scripts/LendingPoolAPI';
export default {
    props: ['loan'],
    data() {
        return {
            percentage: 25,
            allowance: '0',
        }
    },
    methods: {
        max: function () {
            return (this.loan.currentPrincipal / this.loan.initialPrincipal) * 100
        },
        getPaybackAmount: function() {
            return ((this.loan.initialPrincipal * this.percentage) / 100) + this.getAccrued()
        },
        getAccrued: function() {
            let now = Date.now() + (2 * 60 * 1000)
            let duration = (now / 1000) - (this.loan.startDate)
            let interest = this.$fromWei(this.loan.interest)
            let principalAmount = (this.loan.initialPrincipal * this.percentage) / 100
            let accrued = (principalAmount * interest * duration) / 100
            return accrued
        },
        repayLoan: async function () {
            await LendingPoolAPI.repayLoan(
                this.loan.loanId,
                this.percentage,
                this.getPaybackAmount(),
                this.loan.principalToken,
                await Authentication.userAddress()
            )
        },
        getAllowance: async function () {
            let amount = await this.$allowanceOf(
                await Authentication.userAddress(),
                this.loan.principalToken,
                LendingPoolAPI.address
            )
            console.log(amount);
            this.allowance = amount
        },
        approve: async function () {
            await this.$approve(
                await Authentication.userAddress(),
                this.loan.principalToken,
                LendingPoolAPI.address
            )
            this.getAllowance()
        },
    },
    mounted() {
        this.getAllowance()
        document.body.classList.add('modal')
    },
    unmounted() {
        document.body.classList.remove('modal')
    }
}
</script>

<style src="@vueform/slider/themes/default.css">

</style>
<style scoped>
main {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(20, 20, 22, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
}

.title {
    height: 70px;
    width: 100%;
    background: #141416;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title h3 {
    
    
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.title div {
    width: 30px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box>div:nth-child(2) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(2)>p {
    
    
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(2)>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.box>div:nth-child(2)>div>div {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.box>div:nth-child(2)>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.box>div:nth-child(2)>div p:first-child {
    
    
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(2)>div>div>p {
    
    
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.slider {
    padding: 30px;
    padding-top: 40px;
}

.box>div:nth-child(4) {
    width: 100%;
    padding: 30px;
    margin-top: 30px;
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>