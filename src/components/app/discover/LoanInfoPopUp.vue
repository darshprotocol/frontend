<template>
    <main>
        <div :class="`box ${loanState}`">
            <div class="title">
                <h3>Loan Info</h3>
                <div>
                    <LoanState :state="loanState" :height="30" />
                    <div class="close" v-on:click="$emit('close')">
                        <IconClose />
                    </div>
                </div>
            </div>
            <div class="fill fill_1">
                <!---->
                <div>
                    <p>Amount Borrowed + Interest</p>
                    <div class="fill_1_detail">
                        <img :src="`/images/${$findAsset(loan.principalToken).image}.png`" alt="">
                        <h3>{{ $fromWei(loan.initialPrincipal) }} {{ $findAsset(loan.principalToken).symbol }}</h3>
                        <div class="accrued" v-if="loanState != 'repaid'">
                            <IconAdd class="icon" />
                            <p>{{ $toMoney($fromWei(getAccrued())) }}</p>
                        </div>
                        <div class="accrued" v-if="loanState == 'repaid'">
                            <IconAdd class="icon" />
                            <p>{{ $toMoney($fromWei(loan.totalInterestPaid), 6) }}</p>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="paid">
                    <div class="paid_token">
                        <p>-{{ $toMoney($fromWei(loan.initialPrincipal) - $fromWei(loan.currentPrincipal)) }}</p>
                        <img :src="`/images/${$findAsset(loan.principalToken).image}.png`" alt="">
                    </div>
                    <p class="paid_text">Paidback</p>
                </div>
            </div>
            <div class="grid">
                <div class="grid_1">
                    <p>Interest</p>
                    <div>
                        <IconInterest class="icon" />
                        <p>{{ getInterest(loan.interest) }} %</p>
                    </div>
                </div>

                <!---->
                <div class="grid_1" v-if="loanState == 'open'">
                    <p>Due in</p>
                    <div>
                        <IconClock class="icon" />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
                <div class="grid_1" v-if="loanState == 'repaid'">
                    <p>Repaid on</p>
                    <div>
                        <IconCalendar class="icon" />
                        <p>
                            {{ $toDate(loan.repaidOn).month }}
                            {{ $toDate(loan.repaidOn).date }}
                        </p>
                    </div>
                </div>
                <div class="grid_1" v-if="loanState == 'defaulting'">
                    <p>Default in</p>
                    <div>
                        <IconClock class="icon" />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
                <div class="grid_1" v-if="loanState == 'defaulted'">
                    <p>Defaulted on</p>
                    <div>
                        <IconCalendar class="icon" />
                        <p>{{ dueDate }} days</p>
                    </div>
                </div>
            </div>
            <div class="grid">
                <!---->
                <div class="grid_2" v-if="!claimer">
                    <p>Lender</p>
                    <div>
                        <div class="img" id="img_lender_loan"></div>
                        <p>{{ $shortName(loan.lender, 6) }}</p>
                    </div>
                </div>
                <div class="grid_2" v-else>
                    <p>Borrower</p>
                    <div>
                        <div class="img" id="img_lender_loan"></div>
                        <p>{{ $shortName(loan.borrower, 6) }}</p>
                    </div>
                </div>

                <!---->
                <div class="grid_2" v-if="loanState != 'defaulted'">
                    <p v-if="!claimer">My Collateral</p>
                    <p v-else>Collateral</p>

                    <div>
                        <p>{{ $toMoney($fromWei(loan.currentCollateral)) }}
                        </p>
                        <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                    </div>
                </div>
                <div class="grid_2" v-if="loanState == 'defaulted'">
                    <p v-if="!claimer">My Collateral</p>
                    <p v-else>Collateral</p>

                    <div>
                        <p class="strike">{{ $toMoney($fromWei(loan.currentCollateral)) }}
                        </p>
                        <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                    </div>
                </div>
            </div>
            <div class="action" v-if="!claimer">
                <PrimaryButton v-if="loanState != 'repaid'" :text="'Payback'" v-on:click="$emit('payback')" />
                <PrimaryButton v-if="loanState == 'repaid'" :text="'Payback'" :state="'disable'" />
            </div>
            <div class="action" v-else>
                <PrimaryButton :state="claimingPayback ? 'disable' : ''" :progress="claimingPayback"
                    v-if="loan.unClaimedPrincipal > 0" :text="'Claim'" v-on:click="claimPrincipal()" />
                <PrimaryButton v-else :text="'Claim'" :state="'disable'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import IconAdd from '../../icons/IconAdd.vue';
import IconClock from '../../icons/IconClock.vue';
import IconClose from '../../icons/IconClose.vue';
import IconInterest from '../../icons/IconInterest.vue';
import LoanState from '../../LoanState.vue';
import PrimaryButton from '../../PrimaryButton.vue';
</script>

<script>
import Countdown from '../../../utils/Countdown';
import IconCalendar from '../../icons/IconCalendar.vue';
import Profile from '../../../scripts/Profile';
import Authentication from '../../../scripts/Authentication';
import LendingPoolAPI from '../../../scripts/LendingPoolAPI';
import { messages } from '../../../reactives/messages';
export default {
    props: ["loan", "claimer"],
    data() {
        return {
            dueDate: 0,
            loanState: "open",
            claimingPayback: false
        };
    },
    methods: {
        getInterest: function (rate) {
            let daysToMaturity = this.loan.maturityDate - this.loan.startDate;
            let result = rate * daysToMaturity;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        getDueDate: function () {
            let due = this.loan.maturityDate * 1000;
            Countdown.startOnlyDay(due, (text) => {
                this.dueDate = text;
            });
        },
        getAccrued: function () {
            let now = Date.now() + (60 * 1000);
            let duration = (now / 1000) - (this.loan.startDate);
            let interest = this.$fromWei(this.loan.interest);
            let accrued = (this.loan.currentPrincipal * interest * duration) / 100;
            return accrued;
        },
        getLoanState: function () {
            let due = this.loan.maturityDate * 1000;
            let grace = this.loan.graceDays * 24 * 60 * 60 * 1000;
            let defaulted = due + grace;
            let now = Date.now();
            if (this.loan.state != 1 && now >= due) {
                this.loanState = "defaulting";
            }
            else if (this.loan.state == 0) {
                this.loanState = "open";
            }
            else if (this.loan.state == 1) {
                this.loanState = "repaid";
            }
            else if (this.loanState == 2 || now >= defaulted) {
                this.loanState = "defaulted";
            }
        },
        generateImages: function () {
            let el = Profile.generate(30, this.loan.lender)
            let dom = document.getElementById('img_lender_loan')
            if (dom && dom.childNodes.length == 0) {
                dom.appendChild(el)
            }
        },
        claimPrincipal: async function () {
            if (this.claimingPayback) return
            this.claimingPayback = true

            const trx = await LendingPoolAPI.claimPrincipal(
                this.loan.loanId,
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
            this.$emit('close')

            this.claimingPayback = false
        }
    },
    mounted() {
        this.getDueDate();
        this.getLoanState()
        this.generateImages()
        document.body.classList.add("modal");
    },
    updated() {
        this.generateImages()
    },
    unmounted() {
        document.body.classList.remove("modal");
    }
}
</script>

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

.box {
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    animation: slide_in_up .2s ease-in-out;
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
    display: flex;
    align-items: center;
    gap: 20px;
}

.title .close {
    width: 30px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}


.fill {
    width: 100%;
    border-bottom: 1px solid var(--background);
}

.fill_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
}

.fill p:first-child {
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}

.fill_1_detail {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}

.fill_1_detail img {
    width: 28px;
    height: 28px;
}

.fill_1_detail h3 {
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.paid {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.paid_token {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 14px;
}

.paid_token img {
    width: 20px;
    height: 20px;
}

.paid_text {
    font-weight: 400;
    font-size: 12px;
    color: var(--textdimmed);
}

.accrued {
    display: flex;
    align-items: center;
    gap: 6px;
}

.accrued .icon {
    background: #6936f560;
    border-radius: 50%;
}

.accrued p {
    font-size: 16px;
    color: var(--primary);
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.grid>div:first-child {
    border-right: 1px solid var(--background);
}

.grid>div {
    padding: 30px;
}

.grid_1 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.grid_1>p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}

.grid_1>div {
    display: flex;
    margin-top: 16px;
    gap: 12px;
    align-items: center;
}

.grid_1 svg {
    width: 28px;
    height: 28px;
}

.grid_1>div p {
    font-weight: 400;
    font-size: 20px;
    color: var(--textnormal);
}

.grid_2>div {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
}

.grid_2>p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}

.grid_2:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.grid_2:first-child .img {
    width: 30px;
    height: 30px;
}

.grid_2:last-child img {
    width: 28px;
    height: 28px;
}

.grid_2>div p {
    font-size: 20px;
    color: var(--textnormal);
}

.action {
    width: 100%;
    padding: 30px;
    margin-top: 40px;
    background-image: url('/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}

/* states */
.open {
    background-image: url('/images/loan_gradient_open2.png');
}

.repaid {
    background-image: url('/images/loan_gradient_repaid2.png');
}

.defaulting {
    background-image: url('/images/loan_gradient_defaulting2.png');
}

.defaulted {
    background-image: url('/images/loan_gradient_defaulted2.png');
}
</style>