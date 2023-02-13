<template>
    <main>
        <div class="header">
            <div class="toolbar">
                <div class="path">
                    <RouterLink to="/portfolio">
                        <p>My Lends</p>
                    </RouterLink>
                    <span>/</span>
                    <p class="cr">Create Lend Offer</p>
                </div>
                <PrimaryButton :text="'Create'" :width="'180px'" />
            </div>
            <div class="create_form">
                <h3>Create Offer</h3>
                <div class="form">
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
                    <div class="choose_col">
                        <div>
                            <p>Choose collateral types</p>
                            <p><span>3</span>/3</p>
                        </div>
                        <div class="tokens">
                            <div class="token" v-for="index in 3" :key="index">
                                <img src="/images/btc.png" />
                                <h3 class="symbol">BTC</h3>
                                <p class="name">Bitcoin</p>
                                <div class="selected"></div>
                            </div>
                        </div>
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
                        <p>Offer expires in</p>
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
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import PrimaryButton from '../../PrimaryButton.vue';
import IconMinus from '../../icons/IconMinus.vue';
import IconPlus from '../../icons/IconPlus.vue';
</script>

<style scoped>
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
    font-style: normal;
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

.create_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 60px;
    margin-top: 10px;
}

.create_form>h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    color: var(--textnormal);
    width: 100%;
}

.form {
    width: 500px;
}

.option {
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
    margin-top: 20px;
    border-bottom: 1px solid var(--bglightest);
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

.choose_col>div:first-child {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.choose_col {
    margin-top: 50px;
}

.choose_col>div>p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}

.choose_col>div>p span {
    color: var(--textnormal);
}

.choose_col .tokens {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
}

.token {
    width: 146px;
    padding: 20px;
    background: var(--bglight);
    /* border: 4px solid rgba(105, 54, 245, 0.1); */
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}

.token img {
    width: 24px;
    height: 24px;
    margin-bottom: 16px;
}

.token .symbol {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.token .name {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: var(--textdimmed);
}

.selected {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: 0;
    background: var(--primary);
    border-radius: 0px 0px 0px 4px;
}
</style>