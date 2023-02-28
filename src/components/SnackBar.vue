<template>
    <main>
        <div class="snackbars">
            <div v-for="(message, index) in messages.data" :key="index" :class="`snackbar ${message.type}`">
                <div class="indicator"></div>
                <IconSuccess v-if="message.type == 'success'" class="icon" />
                <IconFailed v-if="message.type == 'failed'" class="icon" />
                <div class="texts">
                    <h3>{{ message.title }}</h3>
                    <p>{{ message.description }}</p>
                </div>
                <IconClose class="close" v-on:click="removeIndex(index)" />

                <a target="_blank" v-if="message.linkUrl && message.linkUrl != '' && message.linkUrl.startsWith('http')"
                    v-on:click="removeIndex(index)" :href="message.linkUrl">
                    <div class="link">
                        <p>{{ message.linkTitle }}</p>
                        <IconOut />
                    </div>
                </a>

                <RouterLink v-else-if="message.linkUrl && message.linkUrl != ''" :to="message.linkUrl"
                    v-on:click="removeIndex(index)">
                    <div class="link">
                        <p>{{ message.linkTitle }}</p>
                        <IconOut />
                    </div>
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconClose from './icons/IconClose.vue';
import IconSuccess from './icons/IconSuccess.vue';
import IconFailed from './icons/IconFailed.vue';
import IconOut from './icons/IconOut.vue';
</script>

<script>
import { messages } from '../reactives/messages';
export default {
    methods: {
        removeIndex: function (index) {
            messages.deleteMessage(index)
        }
    }
}
</script>

<style scoped>
.snackbars {
    position: fixed;
    left: calc(50% + 123px);
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 100;
}

.snackbar {
    width: 580px;
    background: var(--bglighter);
    border: 2px solid var(--bglightest);
    box-shadow: 0px 6px 12px rgba(20, 20, 22, 0.8);
    border-radius: 4px;
    margin-bottom: 40px;
    padding: 20px 16px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    animation: slide_in_up .2s ease-in-out;
}

.indicator {
    width: 6px;
    height: 56px;
    border-radius: 1px;
}

.success .indicator {
    background: var(--primary);
}

.failed .indicator {
    background: var(--accentred);
}

.icon {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    padding: 4px;
}

.success .icon {
    background: rgba(105, 54, 245, 0.4);
}

.failed .icon {
    background: rgba(233, 71, 3, 0.1);
}

.close {
    position: absolute;
    top: 12px;
    right: 18px;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    background: #1A1B1D;
    cursor: pointer;
}

.texts h3 {
    font-size: 16px;
    color: var(--textnormal);
}

.texts p {
    font-size: 14px;
    margin-top: 14px;
    color: var(--textnormal);
}

.link {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(108, 110, 115, 0.1);
    border-radius: 4px;
    padding: 0 12px;
    height: 30px;
    bottom: 16px;
    right: 18px;
}

.link p {
    font-size: 12px;
    color: var(--textnormal);
}

.link svg {
    width: 14px;
    height: 14px;
}
</style>