<template>
    <div :class="`button ${state}`">
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    props: ['text', 'state']
}
</script>

<style scoped>
.button {
    padding: 0 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 2px;
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
    font-style: normal;
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
</style>