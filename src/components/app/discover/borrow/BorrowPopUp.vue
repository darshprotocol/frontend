<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Borrow</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div>
                <p>Borrow Amount</p>
                <div>
                    <p>{{ toMoney(fromWei(getPrincipal())) }}</p>
                    <div>
                        <img :src="`/images/${findAsset(offer.principalToken).image}.png`" alt="">
                        <p>{{ findAsset(offer.principalToken).symbol }}</p>
                    </div>
                </div>
            </div>
            <div class="slider">
                <Slider v-model="percentage" :step="25" :max="max()" :format="{ suffix: '%' }" />
            </div>
            <div>
                <p>Collateral Amount</p>
                <div>
                    <p>{{ toMoney(fromWei(collateralAmount)) }}</p>
                    <div class="click_1" v-on:click="dropDown = !dropDown">
                        <img :src="`/images/${findAsset(collateralToken).image}.png`" alt="">
                        <p>{{ findAsset(collateralToken).symbol }}</p>
                        <IconArrowDown />
                        <div class="drop_down" v-show="dropDown">
                            <div class="drop_item" v-for="address in collateralTokens()" :key="address"
                                v-on:click="collateralToken = address">
                                <img :src="`/images/${findAsset(address).image}.png`" alt="">
                                <p>{{ findAsset(address).symbol }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="checkbox" name="" id="">
                    <p>Read and Agreed to our <a href="" target="_blank">Terms & Policy?</a></p>
                </div>
            </div>
            <div>
                <PrimaryButton v-if="fromWei(allowance) >= fromWei(collateralAmount)" v-on:click="borrowLoan()" :text="'Borrow'" />
                <PrimaryButton v-else v-on:click="approve()" :text="'Approve & Borrow'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { fromWei } from 'web3-utils';
import Slider from '@vueform/slider'
import IconClose from '../../../icons/IconClose.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
import IconArrowDown from '../../../icons/IconArrowDown.vue';
</script>

<script>
import Converter from '../../../../utils/Converter';
import AssetLibrary from '../../../../utils/AssetLibrary';
import LtvAPI from '../../../../scripts/LtvAPI';
import Authentication from '../../../../scripts/Authentication'
import LendingPoolAPI from '../../../../scripts/LendingPoolAPI'
import Approval from '../../../../scripts/Approval'
export default {
    props: ['offer'],
    data() {
        return {
            percentage: 25,
            collateralToken: this.offer.collateralTokens[0],
            collateralAmount: '0',
            allowance: '0',
            dropDown: false
        }
    },
    watch: {
        percentage: function () {
            this.getCollateralAmount()
        },
        collateralToken: function () {
            this.getCollateralAmount()
        }
    },
    methods: {
        findAsset: function (id) {
            return AssetLibrary.findAsset(id);
        },
        toMoney: function (value, mF = 2) {
            return Converter.toMoney(value, mF)
        },
        max: function () {
            return (this.offer.currentPrincipal / this.offer.initialPrincipal) * 100
        },
        getPrincipal: function () {
            let principal = this.offer.initialPrincipal * (this.percentage / 100)
            return principal.toString()
        },
        collateralTokens: function () {
            let tokens = []
            this.offer.collateralTokens.forEach(token => {
                if (token != this.collateralToken) {
                    tokens.push(token)
                }
            })
            return tokens
        },
        getAllowance: async function() {
            let amount = await Approval.getAllocationOf(
                await Authentication.userAddress(),
                this.collateralToken,
                '0xb880ac301219328589f36dce275ba091d7c2cd61'
            )
            this.allowance = amount
        },
        getCollateralAmount: async function () {
            let collateralAmount = await LtvAPI.getCollateralAmount(
                this.offer.principalToken,
                this.collateralToken,
                this.getPrincipal(),
                await Authentication.userAddress()
            )
            this.collateralAmount = collateralAmount.toString()

            this.getAllowance()
        },
        approve: async function() {
            await Approval.approve(
                await Authentication.userAddress(),
                this.collateralAmount,
                this.collateralToken,
                '0xb880ac301219328589f36dce275ba091d7c2cd61',
            )
            this.getAllowance()
        },
        borrowLoan: async function() {
            await LendingPoolAPI.acceptLendingOffer(
                this.offer.offerId,
                this.percentage,
                this.collateralToken,
                this.collateralAmount,
                await Authentication.userAddress()
            )
        }     
    },
    mounted() {
        this.getCollateralAmount()
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
    font-family: 'Axiforma';
    font-style: normal;
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
    font-family: 'Axiforma';
    font-style: normal;
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
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(2)>div>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.slider {
    padding: 30px;
    padding-top: 40px;
}

.box>div:nth-child(4) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 20px;
}

.box>div:nth-child(4)>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(4)>div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(4)>div:nth-child(2)>div {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.box>div:nth-child(4)>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.box>div:nth-child(4)>div:nth-child(2) p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(4)>div:nth-child(2)>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.box>div:nth-child(4)>div:nth-child(3) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}

.box>div:nth-child(4)>div:nth-child(3) p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}


.box>div:nth-child(4)>div:nth-child(3) a {
    color: var(--primary);
    border-bottom: 1px var(--primary) solid;
}

.box>div:nth-child(5) {
    width: 100%;
    padding: 30px;
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.click_1 {
    position: relative;
    cursor: pointer;
    user-select: none;
}

.drop_down {
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 4;
    background: var(--bglighter);
    border-radius: 4px;
}

.drop_item {
    height: 50px;
    padding: 0 20px;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid var(--bglightest);
}

.drop_item:first-child {
    border-top: 1px solid var(--bglightest);
}

.drop_item:last-child {
    border: none;
}

.drop_down img {
    width: 24px;
    height: 24px;
}

.drop_item p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}
</style>