<template>
    <main>
        <div class="header">
            <div class="toolbar">
                <div class="path">
                    <RouterLink to="/portfolio/borrows">
                        <p>My Borrows</p>
                    </RouterLink>
                    <span>/</span>
                    <p class="cr">Create Borrow Offer</p>
                </div>
                <PrimaryButton :progress="(approving || fetchingPrice)" v-if="(collateralAmount <= 0 || !checkbox)"
                    :width="'160px'" :text="'Create'" :state="'disable'" />

                <PrimaryButton v-else-if="Number($fromWei(allowance)) >= Number($fromWei(collateralAmount))"
                    :progress="(creating || fetchingPrice)" :state="(creating || fetchingPrice) ? 'disable' : ''"
                    v-on:click="createPopUp = true" :text="'Create'" :width="'160px'" />

                <PrimaryButton v-else :progress="(approving || fetchingPrice)" v-on:click="approve()"
                    :state="(approving || fetchingPrice) ? 'disable' : ''"
                    :text="`Approve ${$findAsset(collateralToken).symbol}`" :width="'200px'" />
            </div>
            <div class="create_form">
                <h3>Create Offer</h3>
                <div class="form">
                    <div class="option">
                        <div>
                            <p>Principal needed</p>
                            <p></p>
                        </div>
                        <div>
                            <input type="number" placeholder="0.00" min="0" v-model="principalAmount">
                            <div class="click_1" v-on:click="dropDown1 = !dropDown1">
                                <img :src="`/images/${$findAsset(principalToken).image}.png`" alt="">
                                <p>{{ $findAsset(principalToken).symbol }}</p>
                                <IconArrowDown />
                                <div class="drop_down" v-show="dropDown1">
                                    <div class="drop_item" v-for="asset in $otherAssets(principalToken)" :key="asset.id"
                                        v-on:click="selectedPrincipal(asset.address)">
                                        <img :src="`/images/${asset.image}.png`" alt="">
                                        <p>{{ asset.symbol }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <div>
                            <p>Collateral required</p>
                            <p>Bal : <span>{{ findTokenBalance() }}</span></p>
                        </div>
                        <div>
                            <input placeholder="0.00" disabled min="0" :value="$toMoney($fromWei(collateralAmount))">
                            <div class="click_1" v-on:click="dropDown2 = !dropDown2">
                                <img :src="`/images/${$findAsset(collateralToken).image}.png`" alt="">
                                <p>{{ $findAsset(collateralToken).symbol }}</p>
                                <IconArrowDown />
                                <div class="drop_down" v-show="dropDown2">
                                    <div class="drop_item" v-for="asset in $findConjugates(principalToken, collateralToken)"
                                        :key="asset.id" v-on:click="selectedCollateral(asset.address)">
                                        <img :src="`/images/${asset.image}.png`" alt="">
                                        <p>{{ asset.symbol }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <input type="number" :style="getInputWidth(interest)" placeholder="0" min="0"
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
                        <p>Offer expires in</p>
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
                            <input type="checkbox" v-model="checkbox">
                            <p>Read and Agreed to our <a href="/terms" target="_blank">Terms & Policy?</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CreateBorrowOfferPopUp :interest="interest" :collateral="collateralAmount" :principal="principalAmount"
            :collateralToken="collateralToken" :daysToMaturity="daysToMaturity" :principalToken="principalToken"
            :hoursToExpire="hoursToExpire" v-on:close="createPopUp = false" v-if="createPopUp"
            v-on:create="createOffer()" />
    </main>
</template>

<script setup>
import IconArrowDown from '../../../icons/IconArrowDown.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
import IconMinus from '../../../icons/IconMinus.vue';
import IconPlus from '../../../icons/IconPlus.vue';
</script>

<script>
import LtvAPI from '../../../../scripts/LtvAPI';
import LendingPoolAPI from '../../../../scripts/LendingPoolAPI'
import Authentication from '../../../../scripts/Authentication';
import CovalentAPI from '../../../../utils/CovalentAPI'
import { messages } from '../../../../reactives/messages';
import CreateBorrowOfferPopUp from './CreateBorrowOfferPopUp.vue';
export default {
    data() {
        return {
            principalAmount: 0,
            collateralAmount: "0",
            principalToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            collateralToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            tokenBalances: [],
            interest: 2,
            daysToMaturity: 15,
            hoursToExpire: 24,
            allowance: "0",
            checkbox: false,
            creating: false,
            approving: false,
            fetchingPrice: false,
            dropDown1: false,
            dropDown2: false,
            createPopUp: false
        };
    },
    watch: {
        dropDown1: function (value) {
            if (value) {
                this.dropDown2 = false;
            }
        },
        dropDown2: function (value) {
            if (value) {
                this.dropDown1 = false;
            }
        },
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
        principalAmount: function () {
            this.getCollateralAmount();
        },
        principalToken: function () {
            this.getCollateralAmount();
        },
        collateralToken: function () {
            this.getCollateralAmount();
        }
    },
    mounted() {
        this.collateralToken = this.$findConjugates(this.principalToken, this.collateralToken)[0].address;
        this.getTokenBalances();
    },
    methods: {
        toggleToken: function (address) {
            if (this.collateralTokens.includes(address)) {
                const index = this.collateralTokens.indexOf(address);
                if (index > -1)
                    this.collateralTokens.splice(index, 1);
                return;
            }
            this.collateralTokens.push(address);
        },
        findTokenBalance: function () {
            let address = this.collateralToken;
            if (this.tokenBalances.length == 0) return

            if (address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                address = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
            }
            let token = this.tokenBalances.find(token => token.contract_address.toLowerCase() == address.toLowerCase());
            if (!token)
                return "0.00";
                
            return this.$toMoney(this.$fromWei(token.balance));
        },
        selectedPrincipal: function (address) {
            this.principalToken = address;
            this.collateralToken = this.$findConjugates(this.principalToken, this.collateralToken)[0].address;
        },
        selectedCollateral: function (address) {
            this.collateralToken = address;
        },
        getTokenBalances: async function () {
            let response = await CovalentAPI.getTokenBalances(await Authentication.userAddress());
            if (!response)
                return;
            this.tokenBalances = response.data.items;
        },
        getAllowance: async function () {
            let amount = await this.$allowanceOf(
                await Authentication.userAddress(),
                this.collateralToken, LendingPoolAPI.address
            );

            this.allowance = amount.toString();
        },
        approve: async function () {
            if (this.approving)
                return;
            this.approving = true;
            await this.$approve(await Authentication.userAddress(), this.collateralToken, LendingPoolAPI.address);
            this.approving = false;
            this.getAllowance();
        },
        getCollateralAmount: async function () {
            this.fetchingPrice = true;
            let collateralAmount = await LtvAPI.getCollateralAmount(
                this.principalToken,
                this.collateralToken,
                this.$toWei(this.principalAmount.toString()),
                await Authentication.userAddress()
            );
            this.fetchingPrice = false;

            this.collateralAmount = collateralAmount.toString();
            this.getAllowance();
        },
        createOffer: async function () {
            if (this.creating || this.fetchingPrice)
                return;

            this.creating = true;

            let targetProfit = (this.interest / 100) * this.principalAmount;
            let targetDurationInSecs = this.daysToMaturity * 24 * 60 * 60;
            let calcInterest = (targetProfit * 100) / (this.principalAmount * targetDurationInSecs);

            const trx = await LendingPoolAPI.createBorrowingOffer(
                this.principalToken,
                this.$toWei(this.principalAmount),
                this.collateralToken,
                this.$toWei(calcInterest),
                this.daysToMaturity,
                this.hoursToExpire,
                await Authentication.userAddress()
            );

            if (trx && trx.tx) {
                messages.insertMessage({
                    title: "Offer created",
                    description: "Borrowing offer successfully created.",
                    type: "success",
                    linkTitle: "View Trx",
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.tx}`
                });
                this.principalAmount = "0";
                this.collateralTokens = [];
                this.interest = 2;
                this.daysToMaturity = 15;
                this.daysToExpire = 7;
            }
            else {
                messages.insertMessage({
                    title: "Offer not created",
                    description: "Borrowing offer was not successfully created.",
                    type: "failed"
                });
            }

            this.creating = false;
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
            if (this.interest < 24) {
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
    }
}
</script>

<style scoped>
.header {
    margin-top: 50px;
}

.toolbar {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    backdrop-filter: blur(8px);
    padding: 0 60px;
    top: 90px;
}

.toolbar .path {
    display: flex;
    align-items: center;
    gap: 10px;
}

.toolbar p,
.toolbar span {

    font-weight: 500;
    font-size: 14px;
}

.path a,
.path span {
    color: var(--textdimmed);
}

.path .cr {
    color: var(--textnormal);
}

.create_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 60px;
    margin-top: 10px;
}

.create_form>h3 {

    font-weight: 500;
    font-size: 25px;
    color: var(--textnormal);
    width: 100%;
}

.form {
    width: 500px;
}

.option {
    padding-top: 30px;
    margin-bottom: 20px;
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
    margin-top: 20px;
    border-bottom: 1px solid var(--bglightest);
}

.option>div:nth-child(2) .clicks {
    display: flex;
    align-items: center;
    gap: 10px;
}

.option>div:nth-child(2) .click {
    height: 50px;
    width: 50px;
    background: var(--bglight);
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
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.drop_down {
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 4;
    background: var(--bglight);
    border-radius: 4px;
}

.drop_item {
    height: 50px;
    padding: 0 20px;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid var(--bglighter);
}

.drop_item:first-child {
    border-top: 1px solid var(--bglightest);
}

.drop_item:last-child {
    border: none;
}

.drop_down img,
.option>div:nth-child(2) img {
    width: 24px;
    height: 24px;
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
}

.option>div:nth-child(2)>div>p,
.drop_item p {


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

.choose_col>div:first-child,
.option>div:first-child {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.choose_col {
    margin-top: 50px;
}

.choose_col>div>p,
.option>div:first-child p {

    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}

.choose_col>div>p span,
.option>div:first-child span {
    color: var(--textnormal);
}

.choose_col .tokens {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
}

.border {
    width: 146px;
    background: var(--bglighter);
    border-radius: 4px;
    position: relative;
    padding: 4px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

.token {
    width: 100%;
    background: var(--bglight);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.token img {
    width: 24px;
    height: 24px;
    margin-bottom: 16px;
}

.token .symbol {

    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.token .name {

    font-weight: 400;
    font-size: 12px;
    color: var(--textdimmed);
}

.selected {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: 0;
    background: var(--bglighter);
    border-radius: 0px 0px 0px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.icon_add {
    background: var(--bglight);
    border-radius: 50%;
}

.icon_checked {
    display: none;
}

.active {
    background: rgba(105, 54, 245, 0.1);
}

.active .selected {
    background: var(--primary);
}

.active .icon_add {
    display: none;
}

.active .icon_checked {
    display: block;
}
</style>