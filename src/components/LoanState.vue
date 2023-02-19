<template>
    <div :class="`state ${state}_state`" :style="`height: ${height}px;`">
        <p v-if="state == 'open'">Open</p>
        <p v-if="state == 'repaid'">Repaid</p>
        <p v-if="state == 'defaulting'">Defaulting</p>
        <p v-if="state == 'defaulted'">Defaulted</p>
</div>
</template>

<script>
export default {
    props: ['state', 'height']
}
</script>

<style scoped>
.state {
    gap: 4px;
    display: flex;
    align-items: center;
    height: 26px;
    border-radius: 2px;
    padding: 0 14px;
}

.state p {
    font-size: 12px;
}

.open_state {
    background: rgba(105, 54, 245, 0.1);
}

.open_state p,
.repaid_state p,
.defaulted_state p {
    color: var(--textnormal);
}

.repaid_state {
    background: rgba(108, 110, 115, 0.1);
}

.defaulting_state {
    background: rgba(233, 71, 3, 0.1);
}

.defaulting_state p {
    color: #E94703;
}

.defaulted_state {
    background: #E94703;
}
</style>