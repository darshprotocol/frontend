<template>
    <p v-if="!userAddress">Connect Wallet</p>
    <main v-if="userAddress">
        <div class="header">
            <h3 class="title">Portfolio</h3>
            <div class="ratings">
                <div class="label">
                    <p>Ratings</p>
                    <div class="ratings_item">
                        <IconBadge />
                        <p><span>80</span> of 100</p>
                    </div>
                </div>
                <div class="tag">
                    <p>Good</p>
                </div>
            </div>
        </div>
        <div class="profile">
            <div class="profile_info">
                <!-- <img src="/images/user4.png" alt=""> -->
                <div class="image">
                    <div class="img" id="img"></div>
                </div>
                <div class="profile_names">
                    <h3>{{ $shortName(userAddress, 6) }}</h3>
                    <p class="address">{{ $shortAddress(userAddress, 8, '....') }}
                        <IconCopy />
                    </p>
                    <div class="profile_stats">
                        <IconInfo />
                        <p>Stats</p>
                    </div>
                </div>
            </div>

            <div class="stats">
                <div class="stat">
                    <div class="stat_item">
                        <p>Active Loans</p>
                        <p>6</p>
                    </div>
                    <div class="stat_item">
                        <p>Total Loans Joined</p>
                        <p>129</p>
                    </div>
                </div>
                <div class="stat">
                    <div class="stat_item">
                        <p>Loans Defaulted</p>
                        <p>6</p>
                    </div>
                    <div class="stat_item">
                        <p>Total Loans Volume</p>
                        <p>129</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="toolbar">
            <div class="tab_items">
                <RouterLink to="/portfolio">
                    <div :class="$route.name == 'portfolio-lends' ? 'tab tab_active' : 'tab'">
                        <p>My Lends</p>
                    </div>
                </RouterLink>
                <RouterLink to="/portfolio/borrows">
                    <div :class="$route.name == 'portfolio-borrows' ? 'tab tab_active' : 'tab'">
                        <p>My Borrows</p>
                    </div>
                </RouterLink>
                <RouterLink to="/portfolio/vaults">
                    <div :class="$route.name == 'portfolio-vaults' ? 'tab tab_active' : 'tab'">
                        <p>Vaults</p>
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
                <RouterLink v-if="$route.name == 'portfolio-lends'" to="/portfolio/lends/create">
                    <div class="filter create_offer">
                        <IconAdd :color="'#fff'" />
                        <p>Create Offer</p>
                    </div>
                </RouterLink>
                <RouterLink v-else-if="$route.name == 'portfolio-borrows'" to="/portfolio/borrows/create">
                    <div class="filter create_offer">
                        <IconAdd :color="'#fff'" />
                        <p>Create Offer</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconInfo from '../../icons/IconInfo.vue';
import IconSort from '../../icons/IconSort.vue';
import IconAdd from '../../icons/IconAdd.vue';
import IconCopy from '../../icons/IconCopy.vue';
import IconBadge from '../../icons/IconBadge.vue';
</script>

<script>
import Authentication from '../../../scripts/Authentication'
import Profile from '../../../scripts/Profile';
export default {
    data() {
        return {
            userAddress: null,
            generate: false
        }
    },
    async mounted() {
        this.userAddress = await Authentication.userAddress()
    },
    updated() {
        if (this.userAddress && !this.generate) {
            let el = Profile.generate(82, this.userAddress)
            document.getElementById('img').appendChild(el)
            this.generate = true
        }
    }
}
</script>

<style scoped>
main {
    top: -277px;
    position: sticky;
    z-index: 5;
}

.header {
    padding: 0 60px;
    height: 156px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-weight: 500;
    font-size: 30px;
    color: var(--textnormal);
}


.ratings {
    display: flex;
    align-items: center;
    gap: 40px;
}

.ratings .label>p {
    font-size: 12px;
    color: var(--textdimmed);
}

.ratings_item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

.ratings_item p {
    font-size: 14px;
    color: var(--textdimmed);
}

.ratings_item span {
    color: var(--textnormal);
}

.ratings .tag {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: rgba(139, 187, 37, 0.1);
    border-radius: 2px;
}


.ratings .tag p {
    font-size: 16px;
    color: var(--accentgreen);
}

.profile {
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
}

.profile_info {
    display: flex;
    align-items: center;
    gap: 30px;
}

.profile_info .image {
    width: 114px;
    height: 114px;
    background: var(--bglighter);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
}

.profile_info .img {
    height: 82px;
}

.profile_names {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.profile_names h3 {
    font-size: 20px;
    color: var(--textnormal);
}

.profile_names .address {
    font-size: 16px;
    color: var(--textdimmed);
    display: flex;
    align-items: center;
    gap: 8px;
}

.profile_names .address svg {
    margin-bottom: 4px;
    cursor: pointer;
}

.profile_names .profile_stats {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 12px;
    border-radius: 4px;
    background: rgba(108, 110, 115, 0.1);
    font-size: 14px;
    color: var(--textnormal);
    gap: 6px;
    width: fit-content;
}

.profile_stats svg {
    width: 18px;
    height: 18px;
}

.stats {
    display: grid;
    grid-template-columns: 230px 230px;
    border-left: 1px solid var(--bglighter);
    border-right: 1px solid var(--bglighter);
}

.stat_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stat_item:first-child {
    padding: 0 20px;
    padding-top: 26px;
    padding-bottom: 17px;
    border-bottom: 1px solid var(--bglighter);
}

.stat:first-child .stat_item {
    border-right: 1px solid var(--bglighter);
}


.stat_item:last-child {
    padding: 0 20px;
    padding-top: 17px;
    padding-bottom: 26px;
}

.stat_item p:first-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.stat_item p:last-child {
    font-size: 14px;
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
    margin-top: 80px;
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
    height: 100%;
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.create_offer {
    background: var(--primary);
}

.filter p {
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}
</style>