<template>
    <main>
        <div class="header">
            <h3 class="title">Discover</h3>
            <div class="tvl">
                <div class="label">
                    <p>TVL</p>
                    <IconInfo />
                </div>
                <div class="value">
                    <p>$50,252,145</p>
                </div>
            </div>
        </div>
        <div class="toolbar">
            <div class="tab_items">
                <RouterLink to="/discover">
                    <div :class="$route.name == 'discover-lend' ? 'tab tab_active' : 'tab'">
                        <p>Lenders</p>
                    </div>
                </RouterLink>
                <RouterLink to="/discover/borrowers">
                    <div :class="$route.name == 'discover-borrow' ? 'tab tab_active' : 'tab'">
                        <p>Borrowers</p>
                    </div>
                </RouterLink>
            </div>
            <div class="filter_items">
                <div class="filter">
                    <p>Offer Only</p>
                </div>
                <div class="filter">
                    <IconSort />
                    <p>Sort By</p>
                </div>
                <div class="filter">
                    <IconFilter />
                    <p>Filter</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconInfo from '../../icons/IconInfo.vue';
import IconSort from '../../icons/IconSort.vue';
import IconFilter from '../../icons/IconFilter.vue';
</script>

<style scoped>
main {
    top: -66px;
    position: sticky;
    z-index: 5;
}

.header {
    height: 156px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
}

.tvl {
    width: 140px;
}

.title {
    font-weight: 500;
    font-size: 30px;
    color: var(--textnormal);
}

.label {
    height: 30px;
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.label p {
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    color: var(--textdimmed);
}

.value {
    height: 40px;
    background: var(--bglighter);
    border-radius: 0px 0px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.value p {
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: var(--textnormal);
}

.toolbar {
    width: 100%;
    height: 40px;
    padding: 0 60px;
    border-bottom: 1px var(--bglightest) solid;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(8px);
}

.tab_items {
    display: flex;
    gap: 20px;
    height: 100%;
}

.tab {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 20px;
}

.tab p {
    font-weight: 500;
    font-size: 16px;
    color: var(--textdimmed);
}

.tab_active p {
    color: var(--textnormal);
}

.tab_active {
    border-bottom: 2px solid var(--primary);
}

.filter_items {
    display: flex;
    gap: 20px;
}

.filter {
    gap: 10px;
    padding: 10px 20px;
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter p {
    
    
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}
</style>