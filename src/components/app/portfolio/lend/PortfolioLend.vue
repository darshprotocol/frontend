<template>
    <main v-if="!authencating">
        <p v-if="!userAddress">
            <NoWallet />
        </p>

        <div class="progress_box" v-if="fetching && userAddress != null">
            <ProgressBox />
        </div>

        <div class="lends" v-if="!fetching && userAddress != null">
            <RouterLink v-for="offer, fIndex in offers" :to="`/portfolio/lends/${offer._id}`" :key="offer.offerId">
                <div class="lend">
                    <div class="asset">
                        <div class="label">
                            <p>Principal</p>
                            <p>Collaterals</p>
                        </div>
                        <div class="tokens">
                            <div>
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(offer.currentPrincipal)) }} {{
                                    $findAsset(offer.principalToken).symbol
                                }}</p>
                            </div>
                            <div>
                                <img v-for="asset in offer.collateralTokens" :src="`/images/${$findAsset(asset).image}.png`"
                                    :key="asset.id" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="duration">
                            <p>Duration</p>
                            <div>
                                <IconClock />
                                <p>{{ offer.daysToMaturity }} Days</p>
                            </div>
                        </div>
                        <div class="interest">
                            <p>Interest</p>
                            <div>
                                <IconInterest />
                                <p>{{ getInterest(offer.interest, offer.daysToMaturity) }} %</p>
                            </div>
                        </div>
                    </div>
                    <div class="expire" v-if="offer.loans.length == 0">
                        <p>Offer expires in</p>
                        <p>{{ countdown(offer.expiresAt) }}</p>
                    </div>
                    <div class="progress" v-else>
                        <div class="users" v-if="offer.currentPrincipal == offer.initialPrincipal">
                            <div class="img" v-for="index in 4" :key="index"></div>
                            <div class="extra_user">0</div>
                        </div>
                        <div class="users" v-else>
                            <div class="img" v-for="loan, index in offer.loans" :key="index"
                                :id="`${fIndex}img_borrower${index}`"></div>

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
        <div class="t_empty" v-if="!fetching && offers.length == 0">
            <img src="../../../../assets/images/receipt-text.png" alt="">
            <p>No Lend offers found.</p>
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
import NoWallet from '../../../NoWallet.vue';
import Profile from '../../../../scripts/Profile';
export default {
    data() {
        return {
            offers: [],
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
            this.axios.get(`https://darshprotocol.onrender.com/offers?offerType=0&creator=${this.userAddress.toLowerCase()}`).then(response => {
                this.offers = response.data;
                this.fetching = false;
            }).catch(error => {
                console.error(error);
                this.fetching = false;
            });
        },
        generateImages: function () {
            if (this.offers) {
                for (let fIndex = 0; fIndex < this.offers.length; fIndex++) {
                    const offer = this.offers[fIndex];
                    for (let index = 0; index < offer.loans.length; index++) {
                        const loan = offer.loans[index];
                        let el = Profile.generate(30, loan.borrower)
                        let dom = document.getElementById(`${fIndex}img_borrower${index}`)
                        if (dom && dom.childNodes.length == 0) {
                            dom.appendChild(el)
                        }
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
    font-weight: 500;
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
    padding: 26px 20px;
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

.users {
    display: flex;
    align-items: center;
}

.users img,
.users .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: -16px;
    background: var(--bglight);
}

.users img:first-child,
.users .img:first-child {
    margin: 0;
}

.extra_user {
    width: 40px;
    height: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
    margin-left: -16px;
    z-index: 1;
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