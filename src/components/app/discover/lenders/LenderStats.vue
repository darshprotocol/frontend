<template>
    <div class="stats" v-if="userType != 'lender'">
        <div class="owner">
            <p>Lender's Ratings</p>
            <div v-on:click="$emit('profile')">
                <IconInformation />
                <p>Info</p>
            </div>
        </div>
        <div :class="`score ${score ? score.tag : ''}`">
            <div>
                <!-- <p>Trust Score</p> -->
                <div>
                    <IconBadge />
                    <p><span>{{ score ? score.score : 0 }}</span> of 100</p>
                </div>
            </div>
            <div>{{ score ? score.label : '' }}</div>
        </div>
</div>
</template>

<script setup>
import IconInformation from '../../../icons/IconInformation.vue'
import IconBadge from '../../../icons/IconBadge.vue'
</script>

<script>
export default {
    props: ['score']
}
</script>

<style scoped>
.stats {
    width: 100%;
    background: var(--bglight);
    border-radius: 6px;
    margin-top: 40px;
    overflow: hidden;
}

.stats>div {
    padding: 30px;
}

.stats .owner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.stats .owner div {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 0 12px;
    height: 30px;
    border-radius: 4px;
    background: rgba(105, 54, 245, 0.1);
}

.stats .owner div p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.stats .owner p:first-child {
    font-weight: 500;
    margin-top: 10px;
    font-size: 16px;
    color: var(--textnormal);
}

.stats .score {
    height: 97px;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bad {
    background-image: url('/images/score_img_bad.png');
}

.good {
    background-image: url('/images/score_img_good.png');
}

.excellent {
    background-image: url('/images/score_img_excellent.png');
}

.score>div:nth-child(2) {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
}

.bad>div:nth-child(2) {
    background: rgba(233, 71, 3, 0.1);
    color: var(--accentred);
}

.good>div:nth-child(2) {
    background: rgba(139, 187, 37, 0.1);
    color: var(--accentgreen);
}

.excellent>div:nth-child(2) {
    background: rgba(105, 54, 245, 0.1);
    color: var(--primary);
}

.score>div:first-child>div {
    display: flex;
    /* margin-top: 12px; */
    align-items: center;
    gap: 10px;
}

.score>div:first-child p:first-child {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.score>div:first-child p:nth-child(2) {
    font-weight: 700;
    font-size: 16px;
    color: var(--textdimmed);
}

.score>div:first-child span {
    color: var(--textnormal);
}
</style>