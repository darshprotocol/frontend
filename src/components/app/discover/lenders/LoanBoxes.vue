<template>
    <main>
        <!---->
        <div class="active_loans" v-if="userType == 'borrower' && borrowerLoan" :class="getState(borrowerLoan.loanId)">
            <h3>Borrow Loan</h3>
            <div>
                <!---->
                <div class="amount_borrowed" v-if="getState(borrowerLoan.loanId) != 'repaid'">
                    <p>Outstanding</p>
                    <div>
                        <img :src="`/images/${$findAsset(borrowerLoan.principalToken).image}.png`" alt="">
                        <h3>{{ $toMoney($fromWei(borrowerLoan.currentPrincipal)) }} {{
                            $findAsset(borrowerLoan.principalToken).symbol
                        }}</h3>
                    </div>
                </div>
                <div class="amount_borrowed" v-if="getState(borrowerLoan.loanId) == 'repaid'">
                    <p>Total Paidback</p>
                    <div>
                        <img :src="`/images/${$findAsset(borrowerLoan.principalToken).image}.png`" alt="">
                        <h3>{{ $toMoney($fromWei(borrowerLoan.initialPrincipal)) }} {{
                            $findAsset(borrowerLoan.principalToken).symbol
                        }}</h3>
                    </div>
                </div>

                <!---->
                <div class="loan_info">
                    <p>State</p>
                    <LoanState :state="getState(borrowerLoan.loanId)" />
                </div>
            </div>
            <div>
                <!---->
                <div v-if="getState(borrowerLoan.loanId) != 'defaulted'">
                    <p>My Collateral</p>
                    <RouterLink :to="`/portfolio/vaults/lends/${$route.params.id}`">
                        <div style="border: none;">
                            <img :src="`/images/${$findAsset(borrowerLoan.collateralToken).image}.png`" alt="">
                            <p>{{ $toMoney($fromWei(borrowerLoan.currentCollateral)) }}</p>
                            <IconOut />
                        </div>
                    </RouterLink>
                </div>
                <div v-if="getState(borrowerLoan.loanId) == 'defaulted'">
                    <p>My Collateral</p>
                    <RouterLink :to="`/portfolio/vaults/lends/${$route.params.id}`">
                        <div style="border: none;">
                            <img :src="`/images/${$findAsset(borrowerLoan.collateralToken).image}.png`" alt="">
                            <p class="strike">{{ $toMoney($fromWei(borrowerLoan.currentCollateral)) }}</p>
                            <IconOut />
                        </div>
                    </RouterLink>
                </div>

                <!----->
                <div v-if="getState(borrowerLoan.loanId) == 'open'">
                    <p>Due in</p>
                    <div>
                        <IconClock />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
                <div v-if="getState(borrowerLoan.loanId) == 'repaid'">
                    <p>Repaid on</p>
                    <div>
                        <IconCalendar />
                        <p>
                            {{ $toDate(offer.loans[loanIndex].repaidOn).month }}
                            {{ $toDate(offer.loans[loanIndex].repaidOn).date }}
                        </p>
                    </div>
                </div>
                <div v-if="getState(borrowerLoan.loanId) == 'defaulting'">
                    <p>Default in</p>
                    <div>
                        <IconCalendar />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
                <div v-if="getState(borrowerLoan.loanId) == 'defaulted'">
                    <p>Defaulted on</p>
                    <div>
                        <IconCalendar />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
            </div>

            <!---->
            <div class="borrower_action" v-if="getState(borrowerLoan.loanId) != 'repaid'">
                <PrimaryButton v-on:click="emitLoan(borrowerLoan)" :text="'Loan Info'" :bg="'rgba(108, 110, 115, 0.1)'" />
                <PrimaryButton v-on:click="$emit('payback')" :state="''" :text="'Payback'" />
            </div>
            <div class="borrower_action" v-if="getState(borrowerLoan.loanId) == 'repaid'">
                <PrimaryButton v-on:click="emitLoan(borrowerLoan)" :text="'Loan Info'" :bg="'rgba(108, 110, 115, 0.1)'" />
                <PrimaryButton :state="'disable'" :text="'Payback'" />
            </div>
        </div>

        <!---->
        <div class="mySwiper" v-if="userType == 'lender' && offer.loans.length > 0">
            <div class="navigate">
                <h3>Lend Loans</h3>
                <div>
                    <IconArrowLeft v-on:click="prevLoan()" />
                    <p>{{ loanIndex + 1 }} <span>of {{ offer.loans.length }}</span></p>
                    <IconArrowRight v-on:click="nextLoan()" />
                </div>
            </div>
            <div class="active_loans" :class="getState(offer.loans[loanIndex].loanId)">
                <h3></h3>
                <div>
                    <div class="amount_borrowed">
                        <p>Borrower's Outstanding</p>
                        <div>
                            <img :src="`/images/${$findAsset(offer.loans[loanIndex].principalToken).image}.png`" alt="">
                            <h3>
                                {{ $toMoney($fromWei(offer.loans[loanIndex].currentPrincipal)) }}
                                {{ $findAsset(offer.loans[loanIndex].principalToken).symbol }}
                            </h3>
                        </div>
                    </div>

                    <!---->
                    <div class="loan_info">
                        <p>State</p>
                        <LoanState :state="getState(offer.loans[loanIndex].loanId)" />
                    </div>
                </div>
                <div>
                    <!---->
                    <div v-if="getState(offer.loans[loanIndex].loanId) == 'repaid'">
                        <p>Borrower's Collateral</p>
                        <RouterLink :to="`/portfolio/vaults/lends/${$route.params.id}`">
                            <div style="border: none;">
                                <img :src="`/images/${$findAsset(offer.loans[loanIndex].collateralToken).image}.png`"
                                    alt="">
                                <p>{{ $toMoney($fromWei(offer.loans[loanIndex].initialCollateral)) }}</p>
                                <IconOut />
                            </div>
                        </RouterLink>
                    </div>
                    <div v-else>
                        <p>Borrower's Collateral</p>
                        <RouterLink :to="`/portfolio/vaults/lends/${$route.params.id}`">
                            <div style="border: none;">
                                <img :src="`/images/${$findAsset(offer.loans[loanIndex].collateralToken).image}.png`"
                                    alt="">
                                <p>{{ $toMoney($fromWei(offer.loans[loanIndex].currentCollateral)) }}</p>
                                <IconOut />
                            </div>
                        </RouterLink>
                    </div>

                    <!----->
                    <div v-if="getState(offer.loans[loanIndex].loanId) == 'open'">
                        <p>Due in</p>
                        <div>
                            <IconClock />
                            <p>{{ getDate(offer.loans[loanIndex]) }} days</p>
                        </div>
                    </div>
                    <div v-if="getState(offer.loans[loanIndex].loanId) == 'repaid'">
                        <p>Repaid on</p>
                        <div>
                            <IconCalendar />
                            <p>
                                {{ $toDate(offer.loans[loanIndex].repaidOn).month }}
                                {{ $toDate(offer.loans[loanIndex].repaidOn).date }}
                            </p>
                        </div>
                    </div>
                    <div v-if="getState(offer.loans[loanIndex].loanId) == 'defaulting'">
                        <p>Default in</p>
                        <div>
                            <IconCalendar />
                            <p>{{ getDate(offer.loans[loanIndex]) }} days</p>
                        </div>
                    </div>
                    <div v-if="getState(offer.loans[loanIndex].loanId) == 'defaulted'">
                        <p>Defaulted on</p>
                        <div>
                            <IconCalendar />
                            <p>{{ getDate(offer.loans[loanIndex]) }} days</p>
                        </div>
                    </div>
                </div>

                <!---->
                <div class="claim">
                    <p v-if="offer.loans[loanIndex].unClaimedPrincipal > 0">Repayments</p>
                    <div v-if="offer.loans[loanIndex].unClaimedPrincipal > 0" class="claim_asset">
                        <img :src="`/images/${$findAsset(offer.loans[loanIndex].principalToken).image}.png`" alt="">
                        <h3>
                            {{ $toMoney($fromWei(offer.loans[loanIndex].unClaimedPrincipal)) }}
                            {{ $findAsset(offer.loans[loanIndex].principalToken).symbol }}
                        </h3>
                    </div>

                    <!---->
                    <div :style="offer.loans[loanIndex].unClaimedPrincipal == 0 ? 'margin-top: 10px !important;' : ''"
                        class="borrower_action">
                        <PrimaryButton v-on:click="emitLoan(offer.loans[loanIndex])" :text="'Loan Info'"
                            :bg="'rgba(108, 110, 115, 0.1)'" />

                        <PrimaryButton
                            :state="(offer.loans[loanIndex].unClaimedPrincipal == 0 || claimingPaybackOf == loanIndex) ? 'disable' : ''"
                            :progress="claimingPaybackOf == loanIndex"
                            v-on:click="offer.loans[loanIndex].unClaimedPrincipal > 0 ? claimPayback(loanIndex) : null"
                            class="claim_button" :text="'Claim'" />
                    </div>
                </div>
            </div>
        </div>

        <!---->
        <div class="open_loans" v-if="(!borrowerLoan || offer.loans.length == 0) && userType != 'lender'">
            <h3>Open Loans</h3>
            <div class="box">
                <IconReceipt />
                <p>No open loan Found on <br> this Borrow offer.</p>
            </div>
        </div>
        <div class="open_loans" v-if="offer.loans.length == 0 && userType == 'lender'">
            <h3>Open Loans</h3>
            <div class="box">
                <IconReceipt />
                <p>No open loan Found on <br> this Borrow offer.</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconReceipt from '../../../icons/IconReceipt.vue'
import IconOut from '../../../icons/IconOut.vue'
import IconCalendar from '../../../icons/IconCalendar.vue'
import PrimaryButton from '../../../PrimaryButton.vue';
import LoanState from '../../../LoanState.vue';
import IconArrowLeft from '../../../icons/IconArrowLeft.vue';
import IconArrowRight from '../../../icons/IconArrowRight.vue';
import IconClock from '../../../icons/IconClock.vue';
</script>

<script>
import Countdown from '../../../../utils/Countdown';
import LendingPoolAPI from '../../../../scripts/LendingPoolAPI';
import Authentication from '../../../../scripts/Authentication';
import { messages } from '../../../../reactives/messages';
export default {
    props: ["offer", "borrowerLoan", "userType"],
    data() {
        return {
            dueDate: 0,
            loanIndex: 0,
            claimingPaybackOf: -1
        };
    },
    methods: {
        emitLoan: function (loan) {
            this.$emit('info', loan)
        },
        getDate: function (loan) {
            let txt = "";
            let due = loan.maturityDate * 1000;
            Countdown.startOnlyDay(due, (text) => {
                txt = text;
            });
            return txt;
        },
        nextLoan: function () {
            if (this.loanIndex < this.offer.loans.length - 1) {
                this.loanIndex++;
            }
        },
        prevLoan: function () {
            if (this.loanIndex > 0) {
                this.loanIndex--;
            }
        },
        getDueDate: function () {
            if (this.borrowerLoan == null)
                return;
            let due = this.borrowerLoan.maturityDate * 1000;
            Countdown.startOnlyDay(due, (text) => {
                this.dueDate = text;
            });
        },
        getState: function (loanId) {
            let loan = this.offer.loans.find(loan => loan.loanId == loanId);
            let due = loan.maturityDate * 1000;
            let grace = loan.graceDays * 24 * 60 * 60 * 1000;
            let defaulted = due + grace;
            let now = Date.now();
            let loanState = "";
            if (loan.state != 1 && now >= due) {
                return "defaulting";
            }
            else if (loan.state == 0) {
                return "open";
            }
            else if (loan.state == 1) {
                return "repaid";
            }
            else if (loanState == 2 || now >= defaulted) {
                return "defaulted";
            }
        },
        claimPayback: async function (index) {
            this.claimingPaybackOf = index

            const trx = await LendingPoolAPI.claimPrincipal(
                this.offer.loans[index].loanId,
                await Authentication.userAddress()
            )

            if (trx && trx.tx) {
                messages.insertMessage({
                    title: 'Repayment claimed',
                    description: 'Repayment was successfully claimed.',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.tx}`
                })
            } else {
                messages.insertMessage({
                    title: 'Claimimg failed',
                    description: 'Repayment claim failed.',
                    type: 'failed'
                })
            }

            this.$emit('done')

            this.claimingPaybackOf = -1
        }
    },
    mounted() {
        this.getDueDate()
    }
}
</script>

<style scoped>
.open_loans {
    width: 100%;
    padding: 30px;
    background: var(--bglight);
    border-radius: 6px;
    margin-top: 40px;
}

.open_loans h3 {
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
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: var(--textdimmed);
}

.navigate {
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    top: 80px;
    z-index: 1;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navigate svg {
    cursor: pointer;
}

.mySwiper .active_loans>h3 {
    height: 80px;
}

.navigate h3 {
    font-size: 16px;
    color: var(--textnormal);
}

.navigate div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.navigate p {
    font-size: 16px;
    color: var(--textnormal);
}

.navigate span {
    color: var(--textdimmed);
}

.navigate svg {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(108, 110, 115, 0.1);
    border-radius: 4px;
    padding: 4px;
}

.active_loans {
    min-width: 100%;
    width: 380px;
    background-color: var(--bglight);
    background-size: cover;
    overflow: hidden;
    margin-top: 40px;
    border-radius: 6px;
}

.active_loans>h3 {
    padding: 30px;
    font-size: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--background);
    color: var(--textnormal);
}

.active_loans>div:nth-child(2) {
    padding: 20px 40px;
    border-bottom: 1px solid var(--background);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.active_loans .loan_info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

.active_loans .loan_info p {
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
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.amount_borrowed img {
    width: 24px;
    height: 24px;
}

.amount_borrowed h3 {
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.active_loans>div:nth-child(3) {
    display: grid;
    border-bottom: 1px solid var(--background);
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.active_loans>div:nth-child(3) div:first-child {
    border-right: 1px solid var(--background);
}

.active_loans>div:nth-child(3)>div {
    padding: 20px 10px;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 12px;
}

.active_loans>div:nth-child(3)>div p:first-child {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.active_loans>div:nth-child(3)>div div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.active_loans>div:nth-child(3)>div p {
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
    display: flex;
    align-items: center;
    gap: 20px;
}

.active_loans>div:nth-child(4) div {
    width: 100%;
}

.active_loans .claim {
    background-color: var(--bglighter);
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0 !important;
    padding: 20px 30px !important;
    padding-bottom: 30px !important;
}


.active_loans .claim>p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.active_loans .borrower_action {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
}

.claim_asset {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    gap: 10px;
}

.active_loans .claim_asset h3 {
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.active_loans .claim_asset img {
    height: 24px;
    width: 24px;
}

.active_loans .claim_button {
    width: 100%;
}

/* states */
.open {
    background-image: url('/images/loan_gradient_open.png');
}

.repaid {
    background-image: url('/images/loan_gradient_repaid.png');
}

.defaulting {
    background-image: url('/images/loan_gradient_defaulting.png');
}

.defaulted {
    background-image: url('/images/loan_gradient_defaulted.png');
}
</style>