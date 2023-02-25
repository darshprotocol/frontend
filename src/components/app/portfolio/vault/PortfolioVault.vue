<template>
    <main>
        <p v-if="!userAddress">Connect Wallet</p>

        <div class="progress_box" v-if="fetching && userAddress != null">
            <ProgressBox />
        </div>

        <div class="lends" v-if="!fetching && userAddress != null">
            <RouterLink v-for="offer in offers" :to="`/portfolio/vault/${offer._id}`" :key="offer.offerId">
                <div class="lend">
                    <div class="asset">
                        <div class="label">
                            <p>Balance</p>
                            <p>Type</p>
                        </div>
                        <div class="tokens">
                            <div>
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(offer.currentPrincipal)) }} {{
                                    $findAsset(offer.principalToken).symbol
                                }}</p>
                            </div>
                            <div>
                                <p>Principal</p>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="duration">
                            <p>Time Locked</p>
                            <div>
                                <IconClock />
                                <p>{{ offer.daysToMaturity }} Days</p>
                            </div>
                        </div>
                        <div class="interest">
                            <p>Amount</p>
                            <div>
                                <IconInterest />
                                <p>{{ getInterest(offer.interest, offer.daysToMaturity) }} %</p>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="users" v-if="offer.currentPrincipal == offer.initialPrincipal">
                            <div class="img" v-for="index in 4" :key="index"></div>
                            <div class="extra_user">0</div>
                        </div>
                        <div class="users" v-else>
                            <img src="/images/user1.png" v-for="loan in offer.loans" :key="loan.loanId" alt="">
                            <div class="extra_user">{{ offer.loans.length }}</div>
                        </div>

                        <div class="needed">
                            <div class="label">
                                <p>{{ $toMoney($fromWei(offer.currentPrincipal)) }} <span>/ {{
                                $toMoney($fromWei(offer.initialPrincipal)) }} {{
        $findAsset(offer.principalToken).symbol
    }}</span></p>
                                <IconInfo />
                            </div>
                            <div class="bar">
                                <div class="percentage" :style="`width: ${$progress(offer)}%`"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>

    </main>
</template>


<script setup>
import IconClock from '../../../icons/IconClock.vue';
import IconInfo from '../../../icons/IconInfo.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import ProgressBox from '../../../ProgressBox.vue'
</script>

<script>
import Countdown from '../../../../utils/Countdown'
import Authentication from '../../../../scripts/Authentication';
export default {
    data() {
        return {
            offers: [],
            fetching: true,
            userAddress: null
        };
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
        this.fetchLendingOffers();
    },
    methods: {
        countdown: function (expiresAt) {
            let txt = ''
            let due = expiresAt * 1000
            Countdown.start(due, function (text) {
                txt = text
            })
            return txt
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60
            let interest = this.$fromWei(result.toString())
            return this.$toMoney(interest)
        },
        fetchLendingOffers: async function () {
            this.fetching = true;
            if (this.userAddress == null) {
                return;
            }
            this.axios.get(`https://darshprotocol.onrender.com/offers?offerType=0&creator=${this.userAddress.toLowerCase()}`).then(response => {
                console.log(response.data);
                this.offers = response.data;
                this.fetching = false;
            }).catch(error => {
                console.error(error);
                this.fetching = false;
            });
        }
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
    padding: 20px;
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info>div>div p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}

.expire,
.progress {
    height: 72px;
    background: var(--bglighter);
    padding: 0 20px;
    display: flex;
    align-items: center;
}

.progress {
    justify-content: space-between;
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
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    
    
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
    margin-left: -16px;
}

.needed>div {
    display: flex;
    align-items: center;
    gap: 6px;
}

.needed>div>p {
    
    
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
}

.needed>div>p span {
    color: var(--textdimmed);
}

.bar {
    width: 120px;
    height: 6px;
    border-radius: 6px;
    background: var(--background);
    margin-top: 12px;
}

.percentage {
    height: 100%;
    background: var(--primary);
    border-radius: 6px;
}

.expire {
    text-align: center;
    flex-direction: column;
    justify-content: center;
}

.expire p:first-child {
    
    
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
}

.expire p:nth-child(2) {
    
    
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 6px;
}
</style>