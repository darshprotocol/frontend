<template>
    <div ref="button" :class="`button ${state}`" :style="`width: ${width}; background: ${bg};`">
        <ProgressBoxWhite class="progress" v-if="progress" />
        <p v-else>{{ text }}</p>
    </div>
</template>

<script setup>
import ProgressBoxWhite from './ProgressBoxWhite.vue';
</script >

<script>
export default {
    props: ["text", "state", "width", "bg", "progress"],
}
</script>

<style scoped>
.button {
    padding: 0 20px;
    max-width: 100%;
    height: 40px;
    background: var(--primary);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}

.button:hover {
    transform: translateY(-2px);
}


p {
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
    margin-top: 4px;
}

.disable {
    cursor: not-allowed;
    background: var(--primarydimmed);
}

.disable:hover {
    transform: translateY(0);
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}

.disable p {
    color: var(--textdimmed);
}

.progress {
    transform: scale(0.4, 0.4);
}
</style>