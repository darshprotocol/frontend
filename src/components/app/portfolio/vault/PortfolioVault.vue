<template>
    <main v-if="!authencating">
        <p v-if="!userAddress">
            <NoWallet />
        </p>

        <div class="progress_box" v-if="fetching && userAddress != null">
            <ProgressBox />
        </div>

        <div class="lends" v-if="!fetching && userAddress != null">
            <RouterLink v-for="loan in loans" :to="`/portfolio/vaults/${loan.offer[0].offerType == 0 ? 'lends' : 'borrows'}/${loan.offer[0]._id}`" :key="loan.loanId">
                <div class="lend">
                    <div class="asset">
                        <div class="label">
                            <p>Balance</p>
                            <p>Type</p>
                        </div>
                        <div class="tokens">
                            <!---->
                            <div v-if="loan.lender == userAddress.toLowerCase()">
                                <img :src="`/images/${$findAsset(loan.principalToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(loan.currentPrincipal)) }} {{
                                    $findAsset(loan.principalToken).symbol
                                }}</p>
                            </div>
                            <div v-else>
                                <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(loan.currentCollateral)) }} {{
                                    $findAsset(loan.collateralToken).symbol
                                }}</p>
                            </div>

                            <!---->
                            <div>
                                <p v-if="loan.lender == userAddress.toLowerCase()">Principal</p>
                                <p v-else>Collateral</p>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="duration">
                            <p>Time Locked</p>
                            <div>
                                <IconClock />
                                <p>{{ getLockTime(loan.startDate, loan.maturityDate) }} Days</p>
                            </div>
                        </div>
                        <div class="interest">
                            <p>Amount</p>
                            <div>
                                <IconChart />
                                <p v-if="loan.lender == userAddress.toLowerCase()">
                                    {{ $nFormat($fromWei(loan.initialPrincipal)) }}
                                    <span>{{ $findAsset(loan.principalToken).symbol }}</span>
                                </p>
                                <p v-else>
                                    {{ $nFormat($fromWei(loan.initialCollateral)) }}
                                    <span>{{ $findAsset(loan.collateralToken).symbol }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="emissions">
                        <!---->
                        <p class="label" v-if="loan.lender == userAddress.toLowerCase()">Emissions
                            <IconInfo />
                        </p>
                        <p class="label" v-else>Unlocks
                            <IconInfo />
                        </p>

                        <!---->
                        <div class="emission_token" v-if="loan.lender == userAddress.toLowerCase()">
                            <p>~ $0.00</p>
                            <div class="emission_token_image">
                                <img v-for="address in loan.offer[0].collateralTokens" :key="address"
                                    :src="`/images/${$findAsset(address).image}.png`" alt="">
                            </div>
                        </div>
                        <div class="emission_token emission_token2" v-else>
                            <div class="emission_token_image">
                                <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                            </div>
                            <p>
                                {{ $toMoney($fromWei(loan.unClaimedCollateral)) }} 
                                {{ $findAsset(loan.collateralToken).symbol }}
                            </p>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div class="t_empty" v-if="!fetching && loans.length == 0">
            <img src="../../../../assets/images/receipt-text.png" alt="">
            <p>No Vaults found.</p>
        </div>
    </main>
</template>


<script setup>
import IconClock from '../../../icons/IconClock.vue';
import IconInfo from '../../../icons/IconInfo.vue';
import ProgressBox from '../../../ProgressBox.vue'
</script>

<script>
import Countdown from '../../../../utils/Countdown'
import Authentication from '../../../../scripts/Authentication';
import IconChart from '../../../icons/IconChart.vue';
import NoWallet from '../../../NoWallet.vue';
export default {
    data() {
        return {
            loans: [],
            fetching: true,
            userAddress: null,
            authencating: true
        };
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
        this.authencating = false
        this.fetchLendingOffers();
    },
    methods: {
        countdown: function (expiresAt) {
            let txt = "";
            let due = expiresAt * 1000;
            Countdown.start(due, function (text) {
                txt = text;
            });
            return txt;
        },
        getLockTime: function (start, end) {
            let duration = (end - start)
            return duration / 24 / 60 / 60
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        fetchLendingOffers: async function () {
            this.fetching = true;
            if (this.userAddress == null) {
                return;
            }
            this.axios.get(`https://darshprotocol.onrender.com/loans/vault?address=${this.userAddress.toLowerCase()}`).then(response => {
                this.loans = response.data;
                this.fetching = false;
            }).catch(error => {
                console.error(error);
                this.fetching = false;
            });
        }
    },
    components: { IconChart, NoWallet }
}
</script>

<style scoped>
.progress_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
}

.lends {
    display: flex;
    flex-wrap: wrap;
    padding: 40px 60px;
    gap: 30px;
}

.lend {
    width: 333px;
    background: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    transition: .2s;
    /* border: 2px transparent solid; */
}

.lend:hover {
    transform: translateY(-2px);
    /* border: 2px var(--bglighter) solid; */
}

.asset {
    padding: 26px 20px;
    border-bottom: 1px solid var(--background);
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
    font-size: 16px;
    color: var(--textnormal);
}

.asset .tokens>div:first-child img {
    width: 24px;
}

.asset .tokens>div:nth-child(2) img {
    width: 18px;
    margin-left: -18px;
}

.asset .tokens>div:nth-child(2) {
    padding: 0 10px;
    height: 30px;
    background: var(--bglighter);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.asset .tokens>div:nth-child(2) p {
    font-size: 12px;
}

.info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.info svg {
    width: 17px;
    height: 17px;
}

.info .duration {
    border-right: 1px solid var(--background);
}

.info>div>p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.info>div>div {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}

.info>div {
    padding: 26px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info>div>div p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}


.emissions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bglighter);
    padding: 26px 20px;
}

.emissions .label {
    font-size: 12px;
    color: var(--textdimmed);
    display: flex;
    align-items: center;
    gap: 12px;
}

.emission_token {
    display: flex;
    align-items: center;
    gap: 12px;
}

.emission_token2 {
    gap: 8px;
}

.emission_token>p {
    font-size: 12px;
    color: var(--textnormal);
}

.emission_token_image {
    display: flex;
    align-items: center;
}

.emission_token_image img {
    width: 20px;
    height: 20px;
    margin-left: -6px;
}

.emission_token_image img:first-child {
    margin: 0;
}


.t_empty {
    width: 100%;
    height: 298px;
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