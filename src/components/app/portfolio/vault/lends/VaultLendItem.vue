<template>
    <p v-if="!userAddress && !authenticating">
        <NoWallet />
    </p>

    <div class="progress_box" v-if="(authenticating || fetching && userAddress != null)">
        <ProgressBox />
    </div>

    <main v-if="!fetching && userAddress != null">
        <!---->
        <div class="dashboard">
            <div class="first_box">
                <!---->
                <div class="principal" v-if="offer.creator == userAddress.toLowerCase()">
                    <p class="label">Principal Locked</p>
                    <div>
                        <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                        <p>
                            {{ $toMoney($fromWei(offer.currentPrincipal)) }}
                            {{ $findAsset(offer.principalToken).symbol }}
                        </p>
                    </div>
                </div>

                <div class="principal" v-else-if="loan">
                    <p class="label">Collateral Locked</p>
                    <div>
                        <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                        <p>
                            {{ $toMoney($fromWei(loan.initialCollateral)) }}
                            {{ $findAsset(loan.collateralToken).symbol }}
                        </p>
                    </div>
                </div>


                <!---->
                <div class="apy" v-if="offer.creator == userAddress.toLowerCase()">
                    <p class="label">APY</p>
                    <div>
                        <p>0.00%</p>
                        <IconInfo />
                    </div>
                </div>
            </div>

            <div class="second_box">
                <div class="buttons">
                    <RouterLink :to="`/discover/lenders/${$route.params.id}`">
                        <div class="go_to_vault">
                            <p>Go to Vault's Loan</p>
                            <IconOut :color="'var(--textnormal)'" />
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

        <!---->

        <div class="dashboard" v-if="offer.creator == userAddress.toLowerCase()">
            <div class="firstbox">
                <div class="offer">
                    <div class="first_row">
                        <div>
                            <IconClock />
                            <p class="deep_text">{{ daysAgo }} Days <span>ago</span></p>
                            <p class="light_text">Time Locked</p>
                        </div>
                        <div>
                            <IconChart />
                            <p class="deep_text">{{
                                $nFormat(
                                    ($fromWei(offer.currentPrincipal))
                                )
                            }}<span>/{{
    $nFormat($fromWei(offer.initialPrincipal)) }}
                                    {{ $findAsset(offer.principalToken).symbol }}
                                </span></p>
                            <p class="light_text">Amount Locked</p>
                        </div>
                    </div>
                    <div class="second_row">
                        <div class="total_emitted">
                            <div class="total_emitted_tokens">
                                <div class="images">
                                    <img v-for="address in offer.collateralTokens" :key="address"
                                        :src="`/images/${$findAsset(address).image}.png`" alt="">
                                </div>
                                <p>~ $0.00</p>
                            </div>
                            <div class="total_emitted_label">
                                <p>Total Emitted</p>
                                <IconInformation :color="'var(--primary)'" />
                            </div>
                        </div>
                        <div class="collateral_info">
                            <IconInformation :color="'var(--primary)'" />
                            <p>Collaterals Info</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="second_box">
                <div class="emission">
                    <h3 class="emission_title">Emissions</h3>
                    <div class="emission_grid">
                        <div>
                            <p class="emission_grid_label">Principal's</p>
                            <div class="emission_grid_token">
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>0.00 {{ $findAsset(offer.principalToken).symbol }}</p>
                            </div>
                        </div>
                        <div>
                            <p class="emission_grid_label">Collateral's</p>
                            <div class="emission_grid_token">
                                <p>~0.00 USD</p>
                            </div>
                        </div>
                    </div>
                    <div class="emission_action">
                        <PrimaryButton :state="'disable'" :text="'Claim All'" />
                    </div>
                </div>
            </div>
        </div>

        <!---->

        <div class="dashboard dashboard2" v-else-if="loan">
            <div class="firstbox">
                <div class="offer">
                    <div class="first_row">
                        <div>
                            <IconCalendar />
                            <p class="deep_text">{{ daysAgo }} Days <span>ago</span></p>
                            <p class="light_text">Unlocked on</p>
                        </div>
                        <div>
                            <IconChart />
                            <p class="deep_text">{{
                                $nFormat($fromWei(loan.currentCollateral))
                            }}<span>/{{ $nFormat($fromWei(loan.initialCollateral)) }}
                                    {{ $findAsset(loan.collateralToken).symbol }}
                                </span></p>
                            <p class="light_text">Amount Locked</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="second_box">
                <div class="emission">
                    <h3 class="emission_title">Unlocked
                        <IconInformation :color="'var(--textdimmed)'" :stripe="'var(--textnormal)'" />
                    </h3>
                    <div class="emission_grid">
                        <div>
                            <p class="emission_grid_label">Collateral</p>
                            <div class="emission_grid_token">
                                <img :src="`/images/${$findAsset(loan.collateralToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(loan.unClaimedCollateral)) }} {{
                                    $findAsset(loan.collateralToken).symbol }}</p>
                            </div>
                        </div>
                        <div class="emission_action2">
                            <PrimaryButton :progress="claimingCollateral"
                                :state="(claimingCollateral || loan.unClaimedCollateral == 0) ? 'disable' : ''"
                                v-on:click="!(claimingCollateral || loan.unClaimedCollateral == 0) ? claimCollateral() : null"
                                :text="'Claim'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <HistoryTable class="table" :offer="offer" :userAddress="userAddress" />
    </main>
</template>

<script setup>
import IconChart from '../../../../icons/IconChart.vue';
import IconClock from '../../../../icons/IconClock.vue';
import IconInfo from '../../../../icons/IconInfo.vue';
import IconInformation from '../../../../icons/IconInformation.vue';
import IconOut from '../../../../icons/IconOut.vue';
import PrimaryButton from '../../../../PrimaryButton.vue';
import HistoryTable from './HistoryTable.vue'
import ProgressBox from '../../../../ProgressBox.vue';
</script>

<script>
import Authentication from '../../../../../scripts/Authentication';
import IconCalendar from '../../../../icons/IconCalendar.vue';
import LendingPoolAPI from '../../../../../scripts/LendingPoolAPI';
import { messages } from '../../../../../reactives/messages';
import NoWallet from '../../../../NoWallet.vue';
export default {
    data() {
        return {
            userAddress: null,
            fetching: true,
            offer: null,
            authenticating: true,
            daysAgo: "",
            loan: null,
            claimingCollateral: false
        };
    },
    methods: {
        fetchOffer: async function (fetching) {
            let id = this.$route.params.id;
            this.fetching = fetching;
            if (this.userAddress == null) {
                return;
            }
            this.axios.get(`https://darshprotocol.onrender.com/offers/${id}?creator=${this.userAddress.toLowerCase()}`).then(response => {
                this.offer = response.data;
                this.getDaysAgo(this.offer.createdAt);
                this.fetching = false;
                if (this.offer.creator != this.userAddress.toLowerCase()) {
                    this.offer.loans.forEach(loan => {
                        if (loan.borrower == this.userAddress.toLowerCase()) {
                            this.loan = loan;
                        }
                    });
                }
            }).catch(error => {
                console.error(error);
            });
        },
        getDaysAgo: function (createdAt) {
            let now = Date.now() / 1000;
            let elapsed = now - createdAt;
            let daysAgo = elapsed / 24 / 60 / 60;
            if (daysAgo < 1) {
                daysAgo = 1;
            }
            this.daysAgo = daysAgo.toFixed(0);
        },
        claimCollateral: async function () {
            this.claimingCollateral = true;

            const trx = await LendingPoolAPI.claimCollateral(
                this.loan.loanId, 
                await Authentication.userAddress()
            );
            
            if (trx && trx.tx) {
                messages.insertMessage({
                    title: "Collateral claimed",
                    description: "Collateral was successfully claimed.",
                    type: "success",
                    linkTitle: "View Trx",
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.tx}`
                });
            }
            else {
                messages.insertMessage({
                    title: "Claim failed",
                    description: "Collateral failed to claim.",
                    type: "failed"
                });
            }

            this.claimingCollateral = false;
            this.fetchOffer(false);
        }
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
        this.authenticating = false
        this.fetchOffer(true);
    },
    components: { NoWallet }
}
</script>

<style scoped>
.progress_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
}

main {
    margin-top: 60px;
    padding: 0 60px;
}

.dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px;
}

.first_box {
    width: 620px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.second_box {
    width: 380px;
}

.first_box .label {
    font-size: 14px;
    color: var(--textdimmed);
}

.principal>div {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
}

.principal>div img {
    width: 34px;
    height: 34px;
}

.principal>div p {
    font-size: 25px;
    color: var(--textnormal);
    font-family: 'Axiforma SemiBold';
}

.apy {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.apy>div {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 16px;
}

.apy>div p {
    font-size: 14px;
    color: var(--textnormal);
}

.apy svg {
    width: 14px;
    height: 14px;
}

.dashboard .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    margin-top: 34px;
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

/*  */

.offer {
    margin-top: 50px;
    width: 620px;
    background: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
}

.offer .first_row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 2px solid var(--background);
}

.offer .first_row>div:first-child {
    border-right: 2px solid var(--background);
}

.offer .first_row>div {
    padding: 30px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.dashboard2 .first_row {
    border: none;
}

.offer .first_row svg {
    width: 25px;
    height: 25px;
}

.offer .first_row .deep_text {
    font-size: 20px;
    color: var(--textnormal);
    margin-top: 20px;
}

.offer .deep_text span {
    font-size: 12px;
    color: var(--textdimmed);
}

.offer .light_text {
    font-size: 14px;
    color: var(--textdimmed);
    margin-top: 10px;
}

.offer .second_row {
    background: var(--bglighter);
    padding: 28px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.offer .total_emitted_tokens {
    display: flex;
    align-items: center;
    gap: 12px;
}

.total_emitted_tokens .images {
    display: flex;
    align-items: center;
}

.total_emitted_tokens .images img {
    height: 24px;
    width: 24px;
    margin-left: -4px;
}

.total_emitted_tokens .images img:first-child {
    margin: 0;
}

.total_emitted_tokens p {
    font-size: 16px;
    color: var(--textnormal);
}

.total_emitted_label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
}

.total_emitted_label p {
    font-size: 12px;
    color: var(--textdimmed);
}

.collateral_info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.collateral_info p {
    font-size: 14px;
    color: var(--textnormal);
}

.emission {
    margin-top: 50px;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    background-image: url('/images/vault_emission.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.emission_title {
    padding: 30px;
    padding-bottom: 20px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--textnormal);
    border-bottom: 2px solid var(--background);
}

.emission_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 2px solid var(--background);
}

.emission_grid>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 40px;
}

.emission_grid>div:first-child {
    padding-right: 4px;
}

.emission_grid>div:last-child {
    align-items: flex-end;
    border-left: 2px solid var(--background);
}

.emission_grid_label {
    font-size: 14px;
    color: var(--textdimmed);
}

.emission_grid_token {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
}

.emission_grid_token img {
    height: 24px;
    width: 24px;
}

.emission_grid_token p {
    font-size: 16px;
    color: var(--textnormal);
}

.emission_action {
    padding: 30px;
    background-color: var(--bglighter);
    background-image: url('/images/subtle_gradient.png');
}

.table {
    margin-top: 60px;
}

.emission_action2 {
    display: flex;
    justify-content: center;
}

.dashboard2 .emission_grid {
    grid-template-columns: auto 150px;
    border: none;
}

.dashboard2 .emission_grid>div {
    padding: 15px 30px;
}
</style>