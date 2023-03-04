<template>
    <main>
        <div class="scroll">
            <div class="scroll_box">
                <div class="box">
                    <div class="title">
                        <h3>Borrow Request</h3>
                        <div class="close" v-on:click="$emit('close')">
                            <IconClose />
                        </div>
                    </div>
                    <div class="option">
                        <p>Principal needed</p>
                        <div>
                            <p>{{ $toMoney($fromWei(getPrincipal())) }}</p>
                            <div class="click_1">
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ $findAsset(offer.principalToken).symbol }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="slider">
                        <Slider v-model="percentage" :step="25" :max="max()" :format="{ suffix: '%' }" />
                    </div>
                    <div class="option">
                        <p>Duration</p>
                        <div>
                            <div class="input">
                                <input type="number" disabled :style="getInputWidth(daysToMaturity)" placeholder="0" min="5"
                                    max="60" v-model="daysToMaturity">
                                <span>days</span>
                            </div>
                            <div class="clicks">
                                <div class="click" v-on:click="decrementDuration()">
                                    <IconMinus />
                                </div>
                                <div class="click" v-on:click="incrementDuration()">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Interest</p>
                        <div>
                            <div class="input">
                                <input type="number" disabled :style="getInputWidth(interest)" placeholder="0" min="1" max="50"
                                    v-model="interest">
                                <span>%</span>
                            </div>
                            <div class="clicks">
                                <div class="click" v-on:click="decrementInterest()">
                                    <IconMinus />
                                </div>
                                <div class="click" v-on:click="incrementInterest()">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Collateral Amount</p>
                        <div>
                            <p>{{ $toMoney($fromWei(collateralAmount)) }}</p>
                            <div class="click_1" v-on:click="dropDown = !dropDown">
                                <img :src="`/images/${$findAsset(collateralToken).image}.png`" alt="">
                                <p>{{ $findAsset(collateralToken).symbol }}</p>
                                <IconArrowDown />
                                <div class="drop_down" v-show="dropDown">
                                    <div class="drop_item" v-for="address in collateralTokens()" :key="address"
                                        v-on:click="collateralToken = address">
                                        <img :src="`/images/${$findAsset(address).image}.png`" alt="">
                                        <p>{{ $findAsset(address).symbol }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Request Expires in</p>
                        <div>
                            <div class="input">
                                <input type="number" disabled :style="getInputWidth(hoursToExpire)" placeholder="0" min="0"
                                    v-model="hoursToExpire">
                                <span>hrs</span>
                            </div>
                            <div class="clicks">
                                <div class="click" v-on:click="decrementExpire()">
                                    <IconMinus />
                                </div>
                                <div class="click" v-on:click="incrementExpire()">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="">
                            <p>Read and Agreed to our <a href="" target="_blank">Terms & Policy?</a></p>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton :progress="fetchingPrice || approving" :state="(fetchingPrice || approving) ? 'disable' : ''"
                            v-on:click="!(fetchingPrice || approving) ? approve() : null" :text="'Approve'"
                            v-if="Number($fromWei(allowance)) < Number($fromWei(collateralAmount))" />

                        <PrimaryButton :progress="fetchingPrice || requesting" :state="(fetchingPrice || requesting) ? 'disable' : ''"
                            v-else v-on:click="!(fetchingPrice || requesting) ? createRequest() : null"
                            :text="'Make Request'" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import Slider from '@vueform/slider'
import IconClose from '../../../icons/IconClose.vue';
import IconMinus from '../../../icons/IconMinus.vue';
import IconPlus from '../../../icons/IconPlus.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
import IconArrowDown from '../../../icons/IconArrowDown.vue';
</script>

<script>
import LtvAPI from '../../../../scripts/LtvAPI';
import Authentication from '../../../../scripts/Authentication'
import LendingPoolAPI from '../../../../scripts/LendingPoolAPI'
import { messages } from '../../../../reactives/messages';
export default {
    props: ['offer'],
    data() {
        return {
            percentage: 25,
            collateralToken: this.offer.collateralTokens[0],
            allowance: '0',
            collateralAmount: '0',
            interest: 0,
            daysToMaturity: this.offer.daysToMaturity,
            hoursToExpire: 24,
            fetchingPrice: false,
            approving: false,
            requesting: false,
            dropDown: false
        }
    },
    watch: {
        hoursToExpire: function (value) {
            if (value > 24) {
                this.hoursToExpire = 24;
            }
        },
        daysToMaturity: function (value) {
            if (value > 60) {
                this.daysToMaturity = 60;
            }
        },
        interest: function (value) {
            if (value > 50) {
                this.interest = 50;
            }
        },
        percentage: function () {
            this.getCollateralAmount()
        },
        collateralToken: function () {
            this.getCollateralAmount()
        }
    },
    methods: {
        collateralTokens: function () {
            let tokens = []
            this.offer.collateralTokens.forEach(token => {
                if (token != this.collateralToken) {
                    tokens.push(token)
                }
            })
            return tokens
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60
            let interest = this.$fromWei(result.toString())
            return this.$toMoney(interest)
        },
        getAllowance: async function () {
            let amount = await this.$allowanceOf(
                await Authentication.userAddress(),
                this.collateralToken,
                LendingPoolAPI.address
            )
            this.allowance = amount.toString()
        },
        getCollateralAmount: async function () {
            this.fetchingPrice = true

            let collateralAmount = await LtvAPI.getCollateralAmount(
                this.offer.principalToken,
                this.collateralToken,
                this.getPrincipal(),
                await Authentication.userAddress()
            )
            this.collateralAmount = collateralAmount.toString()

            this.fetchingPrice = false
            this.getAllowance()
        },
        approve: async function () {
            this.approving = true
            await this.$approve(
                await Authentication.userAddress(),
                this.collateralToken,
                LendingPoolAPI.address
            )
            this.approving = false
            this.getAllowance()
        },
        max: function () {
            return (this.offer.currentPrincipal / this.offer.initialPrincipal) * 100
        },
        getPrincipal: function () {
            let principal = this.offer.initialPrincipal * (this.percentage / 100)
            return principal.toString()
        },
        createRequest: async function () {
            this.requesting = true
            
            let principalAmount = this.$fromWei(this.getPrincipal())
            let targetProfit = (this.interest / 100) * principalAmount
            let targetDurationInSecs = this.daysToMaturity * 24 * 60 * 60;
            let calcInterest = (targetProfit * 100) / (principalAmount * targetDurationInSecs)

            const trx = await LendingPoolAPI.createBorrowingRequest(
                this.offer.offerId,
                this.percentage,
                this.collateralToken,
                this.collateralAmount,
                this.$toWei(calcInterest),
                this.daysToMaturity,
                this.hoursToExpire,
                await Authentication.userAddress()
            )

            if (trx && trx.tx) {
                messages.insertMessage({
                    title: 'Request placed',
                    description: 'Borrow request successfully created.',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.tx}`
                })
            } else {
                messages.insertMessage({
                    title: 'Request failed',
                    description: 'Borrow request failed to create.',
                    type: 'failed'
                })
            }
            
            this.$emit('done')
            this.$emit('close')
            
            this.requesting = false
        },
        incrementDuration: function () {
            if (this.daysToMaturity < 60) {
                this.daysToMaturity += 5;
            }
        },
        decrementDuration: function () {
            if (this.daysToMaturity > 5) {
                this.daysToMaturity -= 5;
            }
        },
        incrementExpire: function () {
            if (this.hoursToExpire < 24) {
                this.hoursToExpire += 1;
            }
        },
        decrementExpire: function () {
            if (this.hoursToExpire > 1) {
                this.hoursToExpire -= 1;
            }
        },
        incrementInterest: function () {
            if (this.interest < 50) {
                this.interest += 0.5;
            }
        },
        decrementInterest: function () {
            if (this.interest > 1) {
                this.interest -= 0.5;
            }
        },
        getInputWidth: function (value) {
            let minWidth = 25;
            let spacePerLength = 20;
            let calWidth = value.toString().length * spacePerLength;
            if (calWidth < minWidth)
                calWidth = minWidth;
            return `width: ${calWidth}px;`;
        }
    },
    mounted() {
        this.getCollateralAmount()
        let interest = this.getInterest(
            this.offer.interest, 
            this.offer.daysToMaturity
        )
        this.interest = Number(interest)
        
        document.body.classList.add('modal')
    },
    unmounted() {
        document.body.classList.remove('modal')
    }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
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
    animation: fade_in .2s ease-in-out;
}


.scroll {
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    animation: slide_in_up .2s ease-in-out;
}

.scroll_box {
    max-height: 80vh;
    overflow-y: scroll;
}

.box {
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    padding-top: 70px;
    padding-bottom: 100px;
}

.title {
    height: 70px;
    width: 100%;
    background: #141416;
    z-index: 10;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
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

.slider {
    padding: 30px;
    padding-top: 40px;
}

.option {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 20px;
}


.input {
    display: flex;
    align-items: center;
}

.option>div:nth-child(2) input {

    background: transparent;
    border: none;
    outline: none;

    font-weight: 500;
    font-size: 25px;
    color: var(--textnormal);
}

.option>div:nth-child(2) .input span {
    color: var(--textdimmed);
    font-size: 25px;
}

.option>p {


    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.option>div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom: 1px solid var(--background);
}

.option>div:nth-child(2) .clicks {
    display: flex;
    align-items: center;
    gap: 10px;
}

.option>div:nth-child(2) .click {
    height: 50px;
    width: 50px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.option>div:nth-child(2) .click_1 {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.option>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.option>div:nth-child(2) p:first-child {


    font-weight: 500;
    font-size: 25px;
    color: var(--textnormal);
}

.option>div:nth-child(2) p:first-child span {
    color: var(--textdimmed);
}

.option>div:nth-child(2)>div>p {


    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.option>div:nth-child(3) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}

.option>div:nth-child(3) p {


    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}


.option>div:nth-child(3) a {
    color: var(--primary);
    border-bottom: 1px var(--primary) solid;
}

.box>div:nth-child(8) {
    width: 100%;
    padding: 30px;
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    left: 0;
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


    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}
</style>