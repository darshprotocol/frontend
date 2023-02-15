<template>
    <main>
        <div class="progress_box" v-if="fetching">
            <ProgressBox />
        </div>

        <div class="detail" v-else>
            <div>
                <div class="asset">
                    <div class="label">
                        <p>Principal</p>
                        <p>Collateral Types</p>
                    </div>
                    <div class="tokens">
                        <div>
                            <img :src="`/images/${findAsset(offer.principalToken).image}.png`" alt="">
                            <p>{{ toMoney(fromWei(offer.currentPrincipal)) }} {{
                                findAsset(offer.principalToken).symbol
                            }}</p>
                        </div>
                        <div>
                            <img v-for="asset in findConjugates(offer.principalToken)"
                                :src="`/images/${asset.image}.png`" :key="asset.id" alt="">
                        </div>
                    </div>
                </div>
                <div class="info">
                    <div>
                        <div class="duration">
                            <div>
                                <IconClock class="icon" />
                                <p>{{ offer.daysToMaturity }} Days</p>
                            </div>
                            <p>Duration</p>
                        </div>
                        <div class="interest">
                            <div>
                                <IconInterest class="icon" />
                                <p>{{ getInterest(offer.interest) }} %</p>
                            </div>
                            <p>Interest</p>
                        </div>
                        <div class="borrowed">
                            <div>
                                <IconChart class="icon" />
                                <p><span>{{ toMoney(fromWei(remainPrincipal())) }}</span>/
                                    {{
                                    toMoney(fromWei(offer.initialPrincipal)) }} {{
        findAsset(offer.principalToken).symbol
    }}</p>
                            </div>
                            <p>Borrowed</p>
                        </div>
                    </div>
                    <div class="expire">
                        <div>
                            <div class="progress">
                                <div class="users">
                                    <img src="/images/user1.png" alt="">
                                    <img src="/images/user2.png" alt="">
                                    <img src="/images/user3.png" alt="">
                                    <div class="extra_user">3</div>
                                </div>
                                <div class="date">
                                    <p>Offer expires in</p>
                                    <p>{{ countdown }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="borrow">
                            <PrimaryButton v-on:click="borrow = true" :text="'Borrow'" :state="''" />
                        </div>
                    </div>
                </div>
                <div class="request_section">
                    <div class="request_toolbar">
                        <h3>Borrow Requests</h3>
                        <div>
                            <div class="sort">
                                <IconSort />
                                <p>Sort By</p>
                            </div>
                            <div class="request_button" v-on:click="borrowRequest = true">
                                <IconAdd />
                                <p>Request</p>
                            </div>
                        </div>
                    </div>
                    <table class="request_table">
                        <thead>
                            <tr>
                                <td>Principal</td>
                                <td>Duration</td>
                                <td>Payback</td>
                                <td>Interest</td>
                                <td>Collateral %</td>
                                <td>Expires in</td>
                                <td>
                                    <div class="menu"></div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="index in 5" :key="index">
                                <td>
                                    <div>
                                        <img src="/images/usdc.png" alt="">
                                        <p>60,000</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <IconClock />
                                        <p>30 days</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <img src="/images/usdc.png" alt="">
                                        <p>60,000</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <IconInterest />
                                        <p>8.50 %</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p><span>110%</span> in</p>
                                        <img src="/images/usdc.png" alt="">
                                    </div>
                                </td>
                                <td>
                                    <p>2 days</p>
                                </td>
                                <td>
                                    <div class="menu">
                                        <IconMenu />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div class="sticky">
                    <div class="created" v-if="userType == 'borrower'">
                        <p>Created by</p>
                        <div>
                            <div>
                                <p>Elon Musk</p>
                                <p>20,250 Total Loans</p>
                            </div>
                            <img src="/images/user1.png" alt="">
                        </div>
                    </div>
                    <div class="manage_offer" v-if="userType == 'lender'">
                        <PrimaryButton class="manage_offer_button" :text="'Manage Offer'" />
                    </div>
                    <div class="active_loans" v-if="userType == 'borrower' && borrowerLoan">
                        <h3>Open Loans</h3>
                        <div>
                            <div class="amount_borrowed">
                                <p>Amount Borrowed</p>
                                <div>
                                    <img :src="`/images/${findAsset(borrowerLoan.principalToken).image}.png`" alt="">
                                    <h3>{{ toMoney(fromWei(borrowerLoan.currentPrincipal)) }} {{ findAsset(borrowerLoan.principalToken).symbol }}</h3>
                                </div>
                            </div>
                            <div class="loan_info" v-on:click="loanInfo = true">
                                <IconInformation />
                                <p>Info</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>My Collateral</p>
                                <div>
                                    <img :src="`/images/${findAsset(borrowerLoan.collateralToken).image}.png`" alt="">
                                    <p>{{ toMoney(fromWei(borrowerLoan.currentCollateral)) }} {{ findAsset(borrowerLoan.collateralToken).symbol }}</p>
                                    <IconOut />
                                </div>
                            </div>
                            <div>
                                <p>Due in</p>
                                <div>
                                    <IconClock />
                                    <p>30 days</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton v-on:click="payback = true" :state="''" :text="'Payback'" />
                        </div>
                    </div>
                    <div class="active_loans" v-if="userType == 'lender'">
                        <h3>Open Loans</h3>
                        <div>
                            <div class="amount_borrowed">
                                <p>Amount Borrowed</p>
                                <div>
                                    <img src="/images/usdc.png" alt="">
                                    <h3>20,000 USDC</h3>
                                </div>
                            </div>
                            <div class="loan_info" v-on:click="loanInfo = true">
                                <IconInformation />
                                <p>Info</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>My Collateral</p>
                                <div>
                                    <img src="/images/btc.png" alt="">
                                    <p>0.72 WBTC</p>
                                    <IconOut />
                                </div>
                            </div>
                            <div>
                                <p>Due in</p>
                                <div>
                                    <IconClock />
                                    <p>30 days</p>
                                </div>
                            </div>
                        </div>
                        <div class="claim">
                            <p>Borrower's payback</p>
                            <div>
                                <img src="/images/usdc.png" alt="">
                                <h3>10,000 USDC</h3>
                            </div>
                            <PrimaryButton class="claim_button" v-on:click="claimPayback = true" :state="''"
                                :text="'Claim Payback'" />
                        </div>
                    </div>
                    <div class="open_loans" v-if="userType != 'lender' && !borrowerLoan">
                        <h3>Open Loans</h3>
                        <div class="box">
                            <IconReceipt />
                            <p>No open loan Found on <br> this Borrow offer.</p>
                        </div>
                    </div>
                    <div class="stats">
                        <div class="owner">
                            <p>Owner's Stats</p>
                            <div>
                                <IconInformation />
                                <p>Info</p>
                            </div>
                        </div>
                        <div class="score">
                            <div>
                                <p>Trust Score</p>
                                <div>
                                    <IconBadge />
                                    <p><span>80</span> of 100</p>
                                </div>
                            </div>
                            <div>Good</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BorrowRequestPopUp :offer="offer" v-if="borrowRequest" v-on:close="borrowRequest = false" />
        <LoanPayBackPopUp v-if="payback" v-on:close="payback = false" />
        <BorrowPopUp v-if="borrow" :offer="offer" v-on:close="borrow = false" />
        <LoanInfoPopUp v-if="loanInfo" v-on:close="loanInfo = false" />
    </main>
</template>

<script setup>
import BorrowPopUp from '../borrow/BorrowPopUp.vue'
import LoanInfoPopUp from '../LoanInfoPopUp.vue'
import IconClock from '../../../icons/IconClock.vue';
import IconReceipt from '../../../icons/IconReceipt.vue'
import IconInformation from '../../../icons/IconInformation.vue'
import IconBadge from '../../../icons/IconBadge.vue'
import IconAdd from '../../../icons/IconAdd.vue'
import IconChart from '../../../icons/IconChart.vue'
import IconMenu from '../../../icons/IconMenu.vue'
import PrimaryButton from '../../../PrimaryButton.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import IconOut from '../../../icons/IconOut.vue'
import ProgressBox from '../../../ProgressBox.vue'
</script >

<script>
import { fromWei } from 'web3-utils';
import Converter from '../../../../utils/Converter'
import AssetLibrary from '../../../../utils/AssetLibrary'
import IconSort from '../../../icons/IconSort.vue';
import LoanPayBackPopUp from '../LoanPayBackPopUp.vue';
import BorrowRequestPopUp from './BorrowRequestPopUp.vue';
import Countdown from '../../../../utils/Countdown';
import Authentication from '../../../../scripts/Authentication';
export default {
    data() {
        return {
            offer: null,
            countdown: '',
            fetching: true,
            userType: 'none',
            borrowerLoan: null,
            loanInfo: false,
            borrow: false,
            payback: false,
            borrowRequest: false
        };
    },
    created() {
        this.fetchLendingOffer()
    },
    methods: {
        findAsset: function (address) {
            return AssetLibrary.findAsset(address);
        },
        findConjugates: function (address) {
            return AssetLibrary.findConjugates(this.findAsset(address).type);
        },
        progress: function (offer) {
            return (offer.currentPrincipal / offer.initialPrincipal) * 100;
        },
        toMoney: function (value, mF = 2) {
            return Converter.toMoney(value, mF);
        },
        remainPrincipal: function () {
            return (this.offer.initialPrincipal - this.offer.currentPrincipal).toString()
        },
        startCountdown: function () {
            let to = this.offer.expiresAt * 1000
            let _this = this
            Countdown.start(to, (countdown) => {
                _this.countdown = countdown
            })
        },
        getInterest: function (rate) {
            let result = rate * this.offer.daysToMaturity * 24 * 60 * 60
            let interest = fromWei(result.toString())
            return Converter.toMoney(interest)
        },
        loadAsBorrower: async function() {
            let id = this.offer.offerId
            let borrower = await Authentication.userAddress()
            this.axios.get(`https://darshprotocol.onrender.com/loans?offerId=${id}&borrower=${borrower}`).then(response => {
                let loans = response.data;
                if (loans.length > 0) {
                    this.borrowerLoan = loans[0]
                }
            }).catch(error => {
                console.error(error);
                // this.fetching = false
            });

        },
        fetchLendingOffer: async function () {
            this.fetching = true;
            let id = this.$route.params.id;
            try {
                let response = await this.axios.get(`https://darshprotocol.onrender.com/lending-offers/${id}`)
                this.offer = response.data;
                this.fetching = false;

                this.startCountdown()
                let userAddress =  await Authentication.userAddress()
                if (this.offer.lender != userAddress) {
                    this.loadAsBorrower()
                    this.userType = 'borrower'
                } else {
                    // load
                }
            } catch (error) {
                console.error(error);
                // this.fetching = false
            }
        }
    },
    components: { IconSort, LoanPayBackPopUp, BorrowRequestPopUp }
}
</script>

<style scoped>
.progress_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
}

.detail {
    display: grid;
    grid-template-columns: 600px 380px;
    gap: 40px;
    justify-content: center;
    margin-top: 60px;
}

.asset>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.asset>.label>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.asset>.label {
    margin-bottom: 16px;
}

.asset .tokens>div {
    display: flex;
    align-items: center;
    gap: 12px;
}

.asset .tokens>div p {
    font-family: 'Axiforma SemiBold';
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    margin-top: 6px;
    color: var(--textnormal);
}

.asset .tokens>div:first-child img {
    width: 34px;
}

.asset .tokens>div:nth-child(2) img {
    width: 18px;
    margin-left: -18px;
}

.asset .tokens>div:nth-child(2) img:first-child {
    margin-left: 0;
}

.asset .tokens>div:nth-child(2) {
    width: 58px;
    height: 30px;
    background: var(--bglighter);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.info {
    width: 100%;
    background: var(--bglight);
    margin-top: 40px;
    border-radius: 6px;
    overflow: hidden;
}

.info>div:first-child {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-bottom: 2px solid var(--background);
}

.info .duration,
.info .interest {
    border-right: 2px solid var(--background);
}

.info .icon {
    width: 25px;
    height: 25px;
}

.info>div>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
    margin-top: 10px;
}

.info>div:first-child>div>div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
}


.info>div>div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info>div:first-child>div {
    padding: 30px;
}

.info>div:nth-child(2)>div {
    padding: 26px;
}

.info>div>div>div p,
.info>div>div>div span {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}


.info>div .borrowed>div p {
    color: var(--textdimmed);
    font-size: 14px;
}

.expire {
    width: 100%;
    background: var(--bglighter);
    display: grid;
    grid-template-columns: 400px 200px;
}

.expire>div:first-child {
    border-right: 2px solid var(--background);
}

.expire .progress {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.expire .date {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    width: 150px;
}

.date p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
}

.date p:nth-child(2) {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 6px;
}

.users {
    display: flex;
    align-items: center;
}

.users img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.users img {
    margin-left: -16px;
}

.users img:first-child {
    margin: 0;
}

.extra_user {
    width: 42px;
    height: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
    margin-left: -16px;
}

.request_section {
    width: 100%;
    margin-top: 60px;
}

.request_toolbar {
    height: 40px;
    border-bottom: 1px var(--bglightest) solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.request_toolbar h3 {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.request_toolbar>div {
    display: flex;
    align-items: center;
    gap: 20px;
}

.request_toolbar>div>div {
    gap: 10px;
    padding: 10px 20px;
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.request_toolbar>div>div p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}

.request_toolbar .request_button {
    background: rgba(105, 54, 245, 0.1);
}

.request_table {
    width: 100%;
    table-layout: fixed;
}

.request_table td {
    width: calc(100% / 6);
}

.request_table thead {
    height: 54px;
    width: 600px;
    display: table;
    padding: 0 20px;
}

.request_table thead td {
    color: var(--textlight);
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
}

.request_table thead .menu {
    visibility: hidden;
}

.request_table tbody {
    background: var(--bglight);
    width: 600px;
    display: table;
    padding: 0 20px;
    border-radius: 6px;
}

.request_table tbody td {
    height: 62px;
}

.request_table tbody td div {
    display: flex;
    align-items: center;
    gap: 4px;
}

.request_table tbody p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 2px;
}

.request_table .menu {
    width: 36px;
    height: 28px;
    background: rgba(105, 54, 245, 0.1);
    opacity: 0.3;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
}

.request_table .menu:hover {
    transform: translateY(-2px);
}

.sticky {
    position: sticky;
    top: 150px;
}

.created {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.created>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
}

.created>div {
    height: 56px;
    margin-top: 10px;
    background: var(--bglight);
    border-radius: 0px 0px 4px 4px;
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 0 20px;
}

.created>div>div {
    text-align: right;
}

.manage_offer {
    display: flex;
    margin-top: 45px;
    justify-content: flex-end;
}

.manage_offer_button {
    width: 200px;
}

.created>div>div p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
}

.created img {
    width: 36px;
    height: 36px;
}

.created>div>div p:nth-child(2) {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
    margin-top: 2px;
}

.open_loans {
    width: 100%;
    padding: 30px;
    background: var(--bglight);
    border-radius: 6px;
    margin-top: 40px;
}

.open_loans h3 {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.open_loans .box {
    width: 100%;
    height: 160px;
    background: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
}

.open_loans .box p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: var(--textdimmed);
}

.stats {
    width: 100%;
    background: var(--bglight);
    border-radius: 6px;
    margin-top: 40px;
    overflow: hidden;
}

.stats>div {
    padding: 30px;
}

.stats .owner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.stats .owner div {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    height: 30px;
    background: rgba(105, 54, 245, 0.1);
    border-radius: 4px;
}

.stats .owner div p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.stats .owner p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    margin-top: 10px;
    font-size: 16px;
    color: var(--textnormal);
}

.stats .score {
    background-image: url('/images/score_img.png');
    height: 97px;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.score>div:nth-child(2) {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(139, 187, 37, 0.1);
    border-radius: 4px;
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--accentgreen);
}

.score>div:first-child>div {
    display: flex;
    margin-top: 12px;
    align-items: center;
    gap: 10px;
}

.score>div:first-child p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.score>div:first-child p:nth-child(2) {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: var(--textdimmed);
}

.score>div:first-child span {
    color: var(--textnormal);
}

.active_loans {
    width: 100%;
    background-image: url('/images/loan_gradient.png');
    background-color: var(--bglight);
    background-size: cover;
    overflow: hidden;
    border-radius: 6px;
    margin-top: 40px;
}

.active_loans>h3 {
    padding: 30px 30px 20px 30px;
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
    border-bottom: 1px solid var(--background);
}

.active_loans>div:nth-child(2) {
    padding: 20px 50px;
    border-bottom: 1px solid var(--background);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.active_loans .loan_info {
    display: flex;
    cursor: pointer;
    width: 78px;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    height: 30px;
    background: rgba(105, 54, 245, 0.1);
    border-radius: 4px;
}

.active_loans .loan_info p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.active_loans .amount_borrowed div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.amount_borrowed p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.amount_borrowed img {
    width: 24px;
    height: 24px;
}

.amount_borrowed h3 {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.active_loans>div:nth-child(3) {
    border-bottom: 1px solid var(--background);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.active_loans>div:nth-child(3) div:first-child {
    border-right: 1px solid var(--background);
}

.active_loans>div:nth-child(3)>div {
    padding: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 12px;
}

.active_loans>div:nth-child(3)>div p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.active_loans>div:nth-child(3)>div:nth-child(2) {
    align-items: flex-end;
    padding-right: 50px;
}

.active_loans>div:nth-child(3)>div div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.active_loans>div:nth-child(3)>div p {
    font-family: 'Axiforma';
    font-style: normal;
    color: var(--textnormal);
    font-weight: 400;
    font-size: 14px;
}

.active_loans>div:nth-child(3)>div img {
    width: 24px;
    height: 24px;
}

.active_loans>div:nth-child(4) {
    padding: 30px;
    background: var(--bglighter);
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.active_loans .claim {
    padding: 30px;
    background-color: var(--bglighter);
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.active_loans .claim>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.active_loans .claim div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
}

.active_loans .claim div h3 {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.active_loans .claim div img {
    height: 24px;
    width: 24px;
}

.active_loans .claim_button {
    width: 100%;
}
</style>