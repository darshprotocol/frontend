<template>
    <p v-if="!userAddress && !authenticating">
        <NoWallet />
    </p>

    <div class="progress_box" v-if="(authenticating || fetching && userAddress != null)">
        <ProgressBox />
    </div>

    <main v-if="!fetching && userAddress != null">
        <div class="header">
            <div class="toolbar">
                <div class="path">
                    <RouterLink :to="`/discover/lenders/${$route.params.id}`">
                        <p>My Lend Offer</p>
                    </RouterLink>
                    <span>/</span>
                    <p class="cr">Manage Offer</p>
                </div>
                <div class="buttons" v-if="offer.loans.length == 0">
                    <PrimaryButton :text="'Edit'" :state="''" />
                    <div class="edit_icon" v-on:click="editOptions = !editOptions">
                        <IconMenu :color="'var(--textnormal)'" />
                        <div class="edit_options" v-if="editOptions">
                            <div class="edit_option">Close Offer</div>
                            <RouterLink :to="`/portfolio/vaults/lends/${offer._id}`">
                                <div class="edit_option">Loan's Vault</div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="buttons" v-else>
                    <RouterLink :to="`/portfolio/vaults/lends/${offer._id}`">
                        <div class="go_to_vault">
                            <p>Go to Loan's Vault</p>
                            <IconOut :color="'var(--textnormal)'" />
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="dashboard">
            <div class="first_row">
                <div class="first_row_item">
                    <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                    <p class="deep_text">{{ $toMoney($fromWei(offer.initialPrincipal)) }}
                        <span>{{ $findAsset(offer.principalToken).symbol }}</span>
                    </p>
                    <p class="light_text">My Principal</p>
                </div>
                <div class="first_row_item">
                    <div class="images">
                        <img v-for="address in offer.collateralTokens" :key="address"
                            :src="`/images/${$findAsset(address).image}.png`" alt="">
                    </div>
                    <p class="deep_text">{{ offer.collateralTokens.length }}
                        <span v-if="$findAsset(offer.collateralTokens[0]).type == 'stable'">Stables</span>
                        <span v-if="$findAsset(offer.collateralTokens[0]).type == 'native'">Natives</span>
                    </p>
                    <p class="light_text">Collateral Types</p>
                </div>
                <div class="first_row_item">
                    <IconClock />
                    <p class="deep_text">{{ offer.daysToMaturity }} <span>Days</span></p>
                    <p class="light_text">Duration</p>
                </div>
                <div class="first_row_item">
                    <IconInterest />
                    <p class="deep_text">{{ getInterest(offer.interest, offer.daysToMaturity) }} %</p>
                    <p class="light_text">Interest</p>
                </div>
                <div class="first_row_item">
                    <IconChart />
                    <p class="deep_text">{{ $nFormat($fromWei(offer.currentPrincipal)) }}<span>/{{
                        $nFormat($fromWei(offer.initialPrincipal)) }}
                            {{ $findAsset(offer.principalToken).symbol }}</span>
                    </p>
                    <p class="light_text">Remaining principal</p>
                </div>
            </div>
            <div class="second_row">
                <div class="second_row_item">
                    <div class="borrowers" v-if="offer.loans.length == 0">
                        <div class="img" v-for="index in 4" :key="index"></div>
                        <div class="extra_user">0 <span>Borrowers</span></div>
                    </div>
                    <div class="borrowers" v-else>
                        <div class="img" v-for="(loan, index) in offer.loans" :key="loan.loanId"
                            :id="`img_portfolio_lend${index}`"></div>
                        <div class="extra_user">{{ offer.loans.length }} <span>Borrowers</span></div>
                    </div>
                    <div class="expires_at" v-if="offer.loans.length == 0">
                        <p>Offer expire in</p>
                        <p>{{ dueDate }}</p>
                    </div>
                    <div class="total_borrowed" v-else>
                        <div>
                            <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                            <p>
                                {{ $toMoney(($fromWei(offer.initialPrincipal) - $fromWei(offer.currentPrincipal))) }}
                                {{ $findAsset(offer.principalToken).symbol }}
                            </p>
                        </div>
                        <p>Total Principal Lent</p>
                    </div>
                </div>
                <div class="second_row_item">
                    <PrimaryButton v-on:click="removePrincipal = true" :text="'Remove'" :bg="'rgba(108, 110, 115, 0.1)'" />
                </div>
            </div>
        </div>

        <RemovePrincipalPopUp v-if="removePrincipal" v-on:done="fetchLendingOffer(false)" :offer="offer"
            v-on:close="removePrincipal = false" />

        <RequestTable class="table" :offer="offer" v-on:done="fetchLendingOffer(false)" />
    </main>
</template>

<script setup>
import IconChart from '../../../icons/IconChart.vue';
import IconClock from '../../../icons/IconClock.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import IconMenu from '../../../icons/IconMenu.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
import RequestTable from './RequestTable.vue';
import ProgressBox from '../../../ProgressBox.vue';
</script>

<script>
import Authentication from '../../../../scripts/Authentication';
import Countdown from '../../../../utils/Countdown';
import IconOut from '../../../icons/IconOut.vue';
import RemovePrincipalPopUp from './RemovePrincipalPopUp.vue';
import NoWallet from '../../../NoWallet.vue';
import Profile from '../../../../scripts/Profile';
export default {
    data() {
        return {
            fetching: true,
            authenticating: true,
            userAddress: null,
            editOptions: false,
            offer: null,
            dueDate: "",
            removePrincipal: false
        };
    },
    methods: {
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        getDueDate: function () {
            let due = this.offer.expiresAt * 1000;
            Countdown.start(due, (text) => {
                this.dueDate = text;
            });
        },
        fetchLendingOffer: async function (fetching) {
            let id = this.$route.params.id;
            this.fetching = fetching;
            if (this.userAddress == null) {
                return;
            }
            this.axios.get(`https://darshprotocol.onrender.com/offers/${id}?creator=${this.userAddress.toLowerCase()}`).then(response => {
                this.offer = response.data;
                this.fetching = false;
                if (this.offer) {
                    this.getDueDate();
                }
            }).catch(error => {
                console.error(error);
                // this.fetching = false;
            });
        }, 
        generateImages: function () {
            if (this.offer) {
                for (let index = 0; index < this.offer.loans.length; index++) {
                    const loan = this.offer.loans[index];
                    let elx = Profile.generate(40, loan.borrower);
                    let domx = document.getElementById(`img_portfolio_lend${index}`);
                    if (domx && domx.childNodes.length == 0) {
                        domx.appendChild(elx);
                    }

                }
            }
        }
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
        this.authenticating = false
        this.fetchLendingOffer(true);
    },
    mounted() {
        this.generateImages()
    },
    updated() {
        this.generateImages();
    },
    components: { RemovePrincipalPopUp, NoWallet }
}
</script>

<style scoped>
.progress_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
}

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

.buttons {
    display: flex;
    align-items: center;
    gap: 20px;
}

.buttons .edit_icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bglighter);
    border-radius: 2px;
    transition: .2s;
    cursor: pointer;
    position: relative;
}

.edit_options {
    width: 180px;
    background: var(--bglighter);
    border: 2px solid var(--bglightest);
    box-shadow: 0px 6px 12px rgba(20, 20, 22, 0.6);
    border-radius: 2px;
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1;
}

.edit_option {
    height: 57px;
    color: var(--textnormal);
    padding: 20px;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
}

.edit_option:first-child {
    border-bottom: 1px solid var(--bglightest);
}

.edit_icon svg {
    width: 18px;
}

.go_to_vault {
    display: flex;
    align-items: center;
    height: 40px;
    background: var(--bglighter);
    border-radius: 2px;
}

.go_to_vault svg {
    width: 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 2px;
    padding: 10px;
}

.go_to_vault p {
    padding: 0 30px;
    font-size: 14px;
    color: var(--textdimmed);
}

/* dashboard */

.dashboard {
    margin: 0 60px;
    margin-top: 40px;
    background: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
}

.dashboard .first_row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.dashboard .first_row svg {
    width: 25px;
    height: 25px;
}

.dashboard .first_row img {
    width: 30px;
    height: 30px;
}

.dashboard .images {
    display: flex;
    align-items: center;
}

.dashboard .images img {
    margin-left: -15px;
}

.dashboard .images img:first-child {
    margin: 0;
}

.dashboard .first_row_item {
    width: 211px;
    height: 165px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-right: 2px solid var(--background);
    border-bottom: 2px solid var(--background);
}

.dashboard .first_row_item:last-child {
    border: none;
}

.dashboard .first_row .deep_text {
    margin-top: 20px;
    font-size: 20px;
    color: var(--textnormal);
}

.dashboard .first_row .deep_text span {
    font-size: 12px;
    color: var(--textdimmed);
}

.dashboard .first_row .light_text {
    font-size: 14px;
    color: var(--textdimmed);
    margin-top: 12px;
}

.dashboard .second_row {
    display: flex;
    align-items: center;
}

.dashboard .second_row_item:first-child {
    width: calc(211px * 4);
    height: 100px;
    background: var(--bglighter);
    border-right: 2px solid var(--background);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
}

.dashboard .second_row_item:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 212px;
}

.expires_at {
    text-align: right;
}

.expires_at p:first-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.expires_at p:last-child {
    font-size: 12px;
    color: var(--textnormal);
}


.total_borrowed {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.total_borrowed>div {
    display: flex;
    align-items: center;
    gap: 12px;
}

.total_borrowed img {
    width: 17px;
    height: 17px;
}

.total_borrowed div p {
    font-size: 14px;
    color: var(--textnormal);
}

.total_borrowed>p {
    font-size: 12px;
    margin-top: 8px;
    color: var(--textdimmed);
}

.borrowers {
    display: flex;
    align-items: center;
}

.borrowers img,
.borrowers .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bglight);
    margin-left: -4px;
}

.borrowers img:first-child,
.borrowers .img:first-child {
    margin: 0;
}

.borrowers .extra_user {
    padding: 0 16px;
    height: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: var(--bglightest);
    font-size: 12px;
    color: var(--textnormal);
    margin-left: -4px;
    z-index: 1;
}

.borrowers span {
    color: var(--textdimmed);
}

.table {
    padding: 0 60px;
    margin-top: 60px;
}
</style>