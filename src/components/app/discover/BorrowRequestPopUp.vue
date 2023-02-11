<template>
    <main>
        <div class="scroll">
            <div class="scroll_box">
                <div class="box">
                    <div class="title">
                        <h3>Borrow Request</h3>
                        <div class="close" v-on:click="$emit('close')">
                            <IconClose />
                        </div>
                    </div>
                    <div class="option">
                        <p>Principal needed</p>
                        <div>
                            <p>40,000</p>
                            <div class="click_1"> 
                                <img src="/images/usdc.png" alt="">
                                <p>USDC</p>
                                <IconArrowDown />
                            </div>
                        </div>
                    </div>
                    <div class="slider">
                        <Slider v-model="percentage" :step="25" :format="{ suffix: '%' }" />
                    </div>
                    <div class="option">
                        <p>Duration</p>
                        <div>
                            <p>20 <span>days</span></p>
                            <div class="clicks">
                                <div class="click">
                                    <IconMinus />
                                </div>
                                <div class="click">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Interest</p>
                        <div>
                            <p>9.00 <span>%</span></p>
                            <div class="clicks">
                                <div class="click">
                                    <IconMinus />
                                </div>
                                <div class="click">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Collateral Amount</p>
                        <div>
                            <p>40,000</p>
                            <div class="click_1"> 
                                <img src="/images/usdc.png" alt="">
                                <p>USDC</p>
                                <IconArrowDown />
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <p>Request Expires in</p>
                        <div>
                            <p>24 <span>hrs</span></p>
                            <div class="clicks">
                                <div class="click">
                                    <IconMinus />
                                </div>
                                <div class="click">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="">
                            <p>Read and Agreed to our <a href="" target="_blank">Terms & Policy?</a></p>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton :text="'Make Request'" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import Slider from '@vueform/slider'
import IconClose from '../../icons/IconClose.vue';
import IconMinus from '../../icons/IconMinus.vue';
import IconPlus from '../../icons/IconPlus.vue';
import PrimaryButton from '../../PrimaryButton.vue';
</script>

<script>
export default {
    data() {
        return {
            percentage: 25
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

<style src="@vueform/slider/themes/default.css">

</style>
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
}


.scroll {
    border-radius: 6px;
    overflow: hidden;
    position: relative;
}

.scroll_box {
    max-height: 80vh;
    overflow-y: scroll;
}

.box {
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    padding-top: 70px;
    padding-bottom: 100px;
}

.title {
    height: 70px;
    width: 100%;
    background: #141416;
    z-index: 10;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
}

.title h3 {
    font-family: 'Axiforma';
    font-style: normal;
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

.box>div:nth-child(2) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--background);
}

.slider {
    padding: 30px;
    padding-top: 40px;
}

.option {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 20px;
}

.option>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.option>div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom: 1px solid var(--background);
}

.option>div:nth-child(2) .clicks {
    display: flex;
    align-items: center;
    gap: 10px;
}

.option>div:nth-child(2) .click {
    height: 50px;
    width: 50px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.option>div:nth-child(2) .click_1 {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.option>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.option>div:nth-child(2) p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    color: var(--textnormal);
}

.option>div:nth-child(2) p:first-child span {
    color: var(--textdimmed);
}

.option>div:nth-child(2)>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.option>div:nth-child(3) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}

.option>div:nth-child(3) p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}


.option>div:nth-child(3) a {
    color: var(--primary);
    border-bottom: 1px var(--primary) solid;
}

.box>div:nth-child(8) {
    width: 100%;
    padding: 30px;
    background-image: url('../../../assets/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>