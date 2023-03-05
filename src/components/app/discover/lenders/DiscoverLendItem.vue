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
                            <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                            <p>{{ $toMoney($fromWei(offer.initialPrincipal)) }} {{
                                $findAsset(offer.principalToken).symbol
                            }}</p>
                        </div>
                        <div>
                            <img v-for="address in offer.collateralTokens" :src="`/images/${$findAsset(address).image}.png`"
                                :key="address" alt="">
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
                                <p><span>{{ $toMoney($fromWei(offer.initialPrincipal - offer.currentPrincipal)) }}</span>/{{
                                    $toMoney($fromWei(offer.initialPrincipal)) }}</p>
                            </div>
                            <p>Borrowed</p>
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
                                    <div class="img" v-for="loan, index in offer.loans" :id="`img_borrower${index}`"
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
                                    <p class="b_info">Borrower's Info</p>
                                </div>
                            </div>
                        </div>
                        <div class="borrow">
                            <PrimaryButton v-if="borrowerLoan || userType != 'borrower'" :text="'Borrow'"
                                :state="'disable'" />
                            <PrimaryButton v-else v-on:click="onBorrow()" :text="'Borrow'" />
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
                            <div class="request_button" v-if="!borrowerLoan && userType == 'borrower' && !borrowerRequest"
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
                    <RequestTable :borrowerLoan="borrowerLoan" :offer="offer" v-on:done="fetchLendingOffer(false)" />
                </div>
            </div>
            <div>
                <div class="sticky">
                    <div class="vault" v-if="borrowerLoan && borrowerLoan.unClaimedCollateral > 0">
                        <RouterLink :to="`/portfolio/vaults/lends/${$route.params.id}`">
                        <div class="go_to_vault">
                            <div>
                                <p class="vault_title">Unclaimed collateral</p>
                                <div class="vault_token">
                                    <img :src="`/images/${$findAsset(borrowerLoan.collateralToken).image}.png`" alt="">
                                    <p>{{ $toMoney($fromWei(borrowerLoan.unClaimedCollateral)) }}</p>
                                </div>
                            </div>
                            <IconOut :color="'var(--textnormal)'" />
                        </div>
                    </RouterLink>
                    </div>
                    <div class="created" v-else-if="userType != 'lender'">
                        <p>Owned by</p>
                        <div>
                            <div>
                                <p>{{ $shortName(offer.creator, 6) }}</p>
                                <p>20,250 Total Loans</p>
                            </div>
                            <div class="img" id="img_lender"></div>
                        </div>
                    </div>
                    <div class="manage_offer" v-if="userType == 'lender'">
                        <RouterLink :to="`/portfolio/lends/${offer._id}`">
                            <PrimaryButton class="manage_offer_button" :text="'Manage Offer'" />
                        </RouterLink>
                    </div>

                    <LoanBoxes refs="loanBoxes" v-on:payback="payback = true" v-on:info="loanInfo = $event" :offer="offer"
                        :borrowerLoan="borrowerLoan" :userType="userType" v-on:done="fetchLendingOffer(false)" />

                    <BorrowerStats v-on:profile="profile = true" v-if="userType != 'lender'" :score="lenderScore" />
                </div>
            </div>
        </div>

        <ProfilePopUp :userType="'Lender'" :address="offer.creator" v-if="profile" v-on:close="profile = false" />

        <BorrowRequestPopUp v-on:done="fetchLendingOffer(false)" :offer="offer" v-if="request"
            v-on:close="request = false" />

        <LoanPayBackPopUp :loan="borrowerLoan" v-if="payback" v-on:done="fetchLendingOffer(false)"
            v-on:close="payback = false" />

        <BorrowPopUp v-on:done="fetchLendingOffer(false)" v-if="borrow" :offer="offer" v-on:close="borrow = false" />

        <LoanInfoPopUp :claimer="userType == 'lender'" v-on:payback="paybackCall()" v-on:done="fetchLendingOffer(false)" :loan="loanInfo"
            v-if="loanInfo" v-on:close="loanInfo = false" />
    </main>
</template>

<script setup>
import BorrowPopUp from '../lenders/BorrowPopUp.vue'
import LoanInfoPopUp from '../LoanInfoPopUp.vue'
import IconClock from '../../../icons/IconClock.vue';
import IconAdd from '../../../icons/IconAdd.vue'
import IconChart from '../../../icons/IconChart.vue'
import RequestTable from '../lenders/RequestTable.vue'
import PrimaryButton from '../../../PrimaryButton.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import ProgressBox from '../../../ProgressBox.vue'
import IconSort from '../../../icons/IconSort.vue';
import LoanPayBackPopUp from '../LoanPayBackPopUp.vue';
import BorrowRequestPopUp from './BorrowRequestPopUp.vue';
import BorrowerStats from './LenderStats.vue';
import IconInformation from '../../../icons/IconInformation.vue';
import LoanBoxes from './LoanBoxes.vue';
import ProfilePopUp from '../ProfilePopUp.vue';
</script >

<script>
import Countdown from '../../../../utils/Countdown';
import Authentication from '../../../../scripts/Authentication';
import DarshScore from '../../../../scripts/DarshScore'
import { messages } from '../../../../reactives/messages';
import Profile from '../../../../scripts/Profile';
import IconOut from '../../../icons/IconOut.vue';
export default {
    data() {
        return {
            offer: null,
            countdown: "",
            fetching: true,
            userType: "none",
            borrowerLoan: null,
            borrowerRequest: null,
            userAddress: null,
            loanInfo: null,
            lenderScore: "•••",
            borrow: false,
            payback: false,
            request: false,
            profile: false
        };
    },
    async created() {
        this.fetchLendingOffer();
        this.userAddress = await Authentication.userAddress();
    },
    methods: {
        onBorrow: function () {
            if (this.borrowerRequest) {
                messages.insertMessage({
                    title: "Action failed",
                    description: "Cancel Borrow Request to Borrow a loan.",
                    type: "failed"
                });
                return;
            }
            this.borrow = true;
        },
        startCountdown: function () {
            let to = this.offer.expiresAt * 1000;
            let _this = this;
            Countdown.start(to, (countdown) => {
                _this.countdown = countdown;
            });
        },
        getInterest: function (rate) {
            let result = rate * this.offer.daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        fetchLendingOffer: async function (fetching = true) {
            this.fetching = fetching;
            let id = this.$route.params.id;
            try {
                let response = await this.axios.get(`https://darshprotocol.onrender.com/offers/${id}`);
                this.offer = response.data;
                if (this.userAddress) {
                    if (this.offer.creator != this.userAddress) {
                        this.userType = "borrower";
                    }
                    else {
                        this.userType = "lender";
                    }
                    this.offer.loans.forEach(loan => {
                        if (loan.borrower.toLowerCase() == this.userAddress) {
                            this.borrowerLoan = loan;
                            return;
                        }
                    });
                    this.offer.requests.forEach(request => {
                        if (request.creator.toLowerCase() == this.userAddress && request.state != 3) {
                            this.borrowerRequest = request;
                            return;
                        }
                    });
                }
                else {
                    this.userType = "none";
                }
                this.fetching = false;
                this.startCountdown();
                this.getLenderScore(this.offer.creator);
                this.generateImages();
            }
            catch (error) {
                console.error(error);
            }
        },
        paybackCall: function () {
            this.loanInfo = null;
            this.payback = true;
        },
        getLenderScore: async function (address) {
            this.lenderScore = await DarshScore.getDarshScore(address);
        },
        generateImages: function () {
            if (this.offer) {
                let el = Profile.generate(36, this.offer.creator);
                let dom = document.getElementById("img_lender");
                if (dom && dom.childNodes.length == 0) {
                    dom.appendChild(el);
                }
                for (let index = 0; index < this.offer.loans.length; index++) {
                    const loan = this.offer.loans[index];
                    let elx = Profile.generate(32, loan.borrower);
                    let domx = document.getElementById(`img_borrower${index}`);
                    if (domx && domx.childNodes.length == 0) {
                        domx.appendChild(elx);
                    }
                }
            }
        }
    },
    mounted() {
        this.generateImages()
    },
    updated() {
        this.generateImages();
    },
    components: { IconOut }
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


/* request_section */

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


.vault {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
}

.go_to_vault {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 40px;
    border-radius: 2px;
}

.go_to_vault svg {
    width: 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 2px;
    padding: 10px;
}

.go_to_vault>div {
    padding: 0 30px;
}
.vault_title {
    font-size: 14px;
    color: var(--textdimmed);
}

.go_to_vault .vault_token {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}

.go_to_vault img {
    width: 16px;
    height: 16px;
}

.vault_token p {
    font-size: 14px;
    color: var(--textnormal);
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
</style>