<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Borrow Request</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div class="principal_needed">
                <p class="label">Principal</p>
                <div class="principal_needed_token">
                    <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                    <p>
                        {{ $toMoney($fromWei(getPrincipal(request.percentage))) }}
                        {{ $findAsset(offer.principalToken).symbol }}
                    </p>
                </div>
            </div>
            <div class="box_grid">
                <div>
                    <div class="label">Interest</div>
                    <div class="box_grid_item">
                        <IconInterest />
                        <p>{{ getInterest(request.interest, request.daysToMaturity) }} %</p>
                    </div>
                </div>
                <div>
                    <div class="label">Duration</div>
                    <div class="box_grid_item">
                        <IconClock />
                        <p>{{ request.daysToMaturity }} Days</p>
                    </div>
                </div>
            </div>
            <div class="box_action">
                <PrimaryButton :text="'Cancel Request'" :progress="cancelling" :state="cancelling ? 'disable' : ''"
                    v-on:click="!cancelling ? cancelRequest() : null" :bg="'rgba(108, 110, 115, 0.1)'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { messages } from '../../../../reactives/messages';
import Authentication from '../../../../scripts/Authentication';
import LendingPoolAPI from '../../../../scripts/LendingPoolAPI';
import IconClock from '../../../icons/IconClock.vue';
import IconClose from '../../../icons/IconClose.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
</script>

<script>
export default {
    props: ['request', 'offer'],
    data() {
        return {
            cancelling: false
        }
    },
    methods: {
        getPrincipal: function (percentage) {
            let principal = this.offer.initialPrincipal * (percentage / 100);
            return principal.toString();
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        cancelRequest: async function () {
            this.cancelling = true

            const trx = await LendingPoolAPI.cancelRequest(
                this.request.requestId,
                await Authentication.userAddress()
            )

            if (trx && trx.tx) {
                messages.insertMessage({
                    title: 'Request cancalled',
                    description: 'Borrow request was successfully cancelled.',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.tx}`
                })
                this.$emit('close')
            } else {
                messages.insertMessage({
                    title: 'Cancelling failed',
                    description: 'Borrow request failed to cancel.',
                    type: 'failed'
                })
            }

            this.$emit('done')
            this.cancelling = false
        }
    },
    mounted() {
        document.body.classList.add('modal')
    },
    unmounted() {
        document.body.classList.remove('modal')
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
    background-image: url('/images/request_gradient.png');
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
    width: 30px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box .label {
    font-size: 14px;
    color: var(--textdimmed);
}

.principal_needed {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    border-bottom: 1px solid var(--background);
}

.principal_needed_token {
    display: flex;
    align-items: center;
    margin-top: 22px;
    gap: 12px;
}

.principal_needed_token img {
    width: 28px;
    height: 28px;
}

.principal_needed_token p {
    font-size: 20px;
    font-weight: 600;
    color: var(--textnormal);
}

.box_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.box_grid>div {
    padding: 30px;
}

.box_grid>div:first-child {
    border-right: 1px solid var(--background);
}

.box_grid:nth-child(3)>div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box_grid .box_grid_item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}

.box_grid svg {
    width: 24px;
    height: 24px;
}

.box_grid .box_grid_item p {
    font-size: 20px;
    color: var(--textnormal);
}

.box_grid .photo {
    width: 30px;
    height: 30px;
}

.box_grid .icon {
    width: 28px;
    height: 28px;
}

.box_grid .collateral {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.box_action {
    padding: 30px;
    background-image: url('/images/subtle_gradient.png');
    background-color: var(--bglighter);
    margin-top: 40px;
}
</style>