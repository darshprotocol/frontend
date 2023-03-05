<template>
    <main>
        <div class="progress_box" v-if="fetching">
            <ProgressBox />
        </div>

        <div class="detail" v-else>
            <div>
                <div class="asset">
                    <div class="label">
                        <!---->
                        <p>Principal needed</p>

                        <!---->
                        <p v-if="userType == 'borrower'">Total collateral</p>
                        <p v-else>Borrower's collateral</p>
                    </div>
                    <div class="tokens">
                        <div>
                            <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                            <p>{{ $toMoney($fromWei(offer.initialPrincipal)) }} {{
                                $findAsset(offer.principalToken).symbol
                            }}</p>
                        </div>
                        <div>
                            <img :src="`/images/${$findAsset(offer.collateralToken).image}.png`" alt="">
                            <p>{{ $toMoney($fromWei(offer.initialCollateral)) }}</p>
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
                                <p><span>{{ $toMoney($fromWei(offer.initialPrincipal - offer.currentPrincipal)) }}</span>/
                                    {{
                                        $toMoney($fromWei(offer.initialPrincipal)) }}</p>
                            </div>
                            <p>Lent</p>
                        </div>
                    </div>
                    <div class="expire">
                        <div>
                            <div class="progress">
                                <!---->
                                <div class="users" v-if="offer.loans.length == 0">
                                    <div class="img" v-for="index in 4" :key="index"></div>
                                    <div class="extra_user">0</div>
                                </div>
                                <div class="users" v-else>
                                    <div class="img" v-for="loan, index in offer.loans" :id="`img_lender${index}`"
                                        :key="index">
                                    </div>
                                    <div class="extra_user">{{ offer.loans.length }}</div>
                                </div>

                                <!---->
                                <div class="date" v-if="offer.loans.length == 0">
                                    <p>Offer expires in</p>
                                    <p>{{ countdown }}</p>
                                </div>
                                <div class="date2" v-else>
                                    <IconInformation :color="'var(--primary)'" />
                                    <p class="b_info">Lender's Info</p>
                                </div>
                            </div>
                        </div>
                        <div class="borrow">
                            <PrimaryButton v-if="lenderLoan || userType != 'lender'" :text="'Lend'" :state="'disable'" />
                            <PrimaryButton v-else v-on:click="onLend()" :text="'Lend'" />
                        </div>
                    </div>
                </div>
                <div class="request_section">
                    <div class="request_toolbar">
                        <h3>Lend Requests</h3>
                        <div>
                            <div class="sort">
                                <IconSort />
                                <p>Sort By</p>
                            </div>
                            <div class="request_button" v-if="!lenderLoan && userType == 'lender' && !lenderRequest"
                                v-on:click="request = true">
                                <IconAdd />
                                <p>Request</p>
                            </div>
                            <div class="request_button request_dimmed" v-else>
                                <IconAdd :color="'var(--textdimmed)'" />
                                <p>Request</p>
                            </div>
                        </div>
                    </div>
                    <RequestTable :offer="offer" />
                    <div class="t_empty" v-if="sortRequests(offer.requests).length == 0">
                        <img src="../../../../assets/images/receipt-text.png" alt="">
                        <p>No Lend Requests found.</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="sticky">
                    <div class="created" v-if="userType != 'borrower'">
                        <p>Owned by</p>
                        <div>
                            <div>
                                <p>{{ $shortName(offer.creator, 6) }}</p>
                                <p>20,250 Total Loans</p>
                            </div>
                            <div class="img" id="img_borrower"></div>
                        </div>
                    </div>
                    <div class="manage_offer" v-if="userType == 'borrower'">
                        <RouterLink :to="`/portfolio/borrows/${offer._id}`">
                            <PrimaryButton class="manage_offer_button" :text="'Manage Offer'" />
                        </RouterLink>
                    </div>
                    <LoanBoxes v-on:payback="payback = $event" v-on:info="loanInfo = $event" :offer="offer"
                        :lenderLoan="lenderLoan" :userType="userType" v-on:done="fetchBorrowingOffer(false)" />

                    <BorrowerStats v-if="userType != 'borrower'" v-on:profile="profile = true" :score="lenderScore" />
                </div>
            </div>
        </div>

        <ProfilePopUp :userType="'Borrower'" :address="offer.creator" v-if="profile" v-on:close="profile = false" />

        <LendRequestPopUp v-on:done="fetchBorrowingOffer(false)" :offer="offer" v-if="request"
            v-on:close="request = false" />

        <LoanPayBackPopUp v-on:done="fetchBorrowingOffer(false)" :loan="payback" v-if="payback"
            v-on:close="payback = false" />

        <LendPopUp v-on:done="fetchBorrowingOffer(false)" v-if="lend" :offer="offer" v-on:close="lend = false" />

        <LoanInfoPopUp :claimer="userType == 'borrower'" v-on:payback="paybackCall()" v-on:done="fetchBorrowingOffer(false)" :loan="loanInfo" v-if="loanInfo"
            v-on:close="loanInfo = false" />
    </main>
</template>

<script setup>
import LendPopUp from './LendPopUp.vue'
import LoanInfoPopUp from '../LoanInfoPopUp.vue'
import IconClock from '../../../icons/IconClock.vue';
import IconAdd from '../../../icons/IconAdd.vue'
import IconChart from '../../../icons/IconChart.vue'
import RequestTable from './RequestTable.vue'
import PrimaryButton from '../../../PrimaryButton.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import ProgressBox from '../../../ProgressBox.vue'
import IconSort from '../../../icons/IconSort.vue';
import LoanPayBackPopUp from '../LoanPayBackPopUp.vue';
import LendRequestPopUp from './LendRequestPopUp.vue';
import LoanBoxes from './LoanBoxes.vue';
import BorrowerStats from './BorrowerStats.vue';
</script>

<script>
import { messages } from '../../../../reactives/messages';
import Countdown from '../../../../utils/Countdown';
import Authentication from '../../../../scripts/Authentication';
import DarshScore from '../../../../scripts/DarshScore'
import IconInformation from '../../../icons/IconInformation.vue';
import Profile from '../../../../scripts/Profile';
import ProfilePopUp from '../ProfilePopUp.vue';
export default {
    components: {
        LendPopUp,
        LoanInfoPopUp,
        IconClock,
        IconAdd,
        IconChart,
        RequestTable,
        PrimaryButton,
        IconInterest,
        ProgressBox,
        IconSort,
        LoanPayBackPopUp,
        LendRequestPopUp,
        LoanBoxes,
        BorrowerStats,
        IconInformation,
        ProfilePopUp
    },
    data() {
        return {
            offer: null,
            countdown: '',
            fetching: true,
            userType: 'none',
            lenderLoan: null,
            lenderRequest: null,
            userAddress: null,
            loanInfo: null,
            lenderScore: '•••',
            lend: false,
            payback: false,
            request: false,
            profile: false
        };
    },
    async created() {
        this.fetchBorrowingOffer()
        this.userAddress = await Authentication.userAddress()
    },
    methods: {
        onLend: function () {
            if (this.lenderRequest) {
                messages.insertMessage({
                    title: 'Action failed',
                    description: 'Cancel Lend Request to Lend a loan.',
                    type: 'failed'
                })
                return
            }
            this.lend = true
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
            let interest = this.$fromWei(result.toString())
            return this.$toMoney(interest)
        },
        fetchBorrowingOffer: async function (fetching = true) {
            this.fetching = fetching;
            let id = this.$route.params.id;
            try {
                let response = await this.axios.get(`https://darshprotocol.onrender.com/offers/${id}`)
                this.offer = response.data

                if (this.userAddress) {
                    if (this.offer.creator.toLowerCase() == this.userAddress.toLowerCase()) {
                        this.userType = 'borrower'
                    } else {
                        this.userType = 'lender'
                    }

                    this.offer.loans.forEach(loan => {
                        if (loan.lender.toLowerCase() == this.userAddress) {
                            this.lenderLoan = loan
                            return
                        }
                    })
                    this.offer.requests.forEach(request => {
                        if (request.creator.toLowerCase() == this.userAddress) {
                            this.lenderRequest = request
                            return
                        }
                    })
                } else {
                    this.userType = 'none'
                }

                this.fetching = false;
                this.startCountdown()
                this.getBorrowerScore(this.offer.creator)
                this.generateImages()
            } catch (error) {
                console.error(error);
            }
        },
        paybackCall: function () {
            this.loanInfo = null
            this.payback = true
        },
        getBorrowerScore: async function (address) {
            this.lenderScore = await DarshScore.getDarshScore(address)
        },
        sortRequests: function (requests) {
            return requests.filter(request => request.state == 0);
        },
        generateImages: function () {
            if (this.offer) {
                let el = Profile.generate(36, this.offer.creator)
                let dom = document.getElementById('img_borrower')
                if (dom && dom.childNodes.length == 0) {
                    dom.appendChild(el)
                }

                for (let index = 0; index < this.offer.loans.length; index++) {
                    const loan = this.offer.loans[index];
                    let elx = Profile.generate(32, loan.lender)
                    let domx = document.getElementById(`img_lender${index}`)
                    if (domx && domx.childNodes.length == 0) {
                        domx.appendChild(elx)
                    }
                }
            }
        }
    },
    mounted() {
        this.generateImages()
    },
    updated() {
        this.generateImages()
    }
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
}

.asset .tokens>div:nth-child(2) {
    padding: 0 8px;
    gap: 8px;
    height: 30px;
    background: var(--bglighter);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.asset .tokens>div:nth-child(2) p {
    font-weight: 400;
    font-size: 14px;
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

.date2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 150px;
}

.date p:first-child {
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
}

.date p:nth-child(2) {
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 6px;
}

.b_info {
    font-size: 14px !important;
    color: var(--textnormal) !important;
    margin: 0 !important;
}

.users {
    display: flex;
    align-items: center;
}

.users img,
.users .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--bglight);
    margin-left: -16px;
}

.users img:first-child,
.users .img:first-child {
    margin: 0;
}

.extra_user {
    width: 42px;
    height: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bglightest);
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
    margin-left: -16px;
    z-index: 1;
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
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}

.request_toolbar .request_button {
    cursor: pointer;
    user-select: none;
    background: rgba(105, 54, 245, 0.1);
}

.request_dimmed {
    background: var(--bglight) !important;
}

.request_dimmed p {
    color: var(--textdimmed) !important;
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
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
}

.created .img {
    width: 36px;
    height: 36px;
}

.created>div>div p:nth-child(2) {
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

.t_empty {
    width: 100%;
    height: 298px;
    background: var(--bglight);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
}

.t_empty p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}
</style>