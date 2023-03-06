<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Notifications</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div class="tabs">
                <div class="tab active">
                    <p>All</p> <span>{{ notifications.length }}</span>
                </div>
                <div class="tab">
                    <p>Actions</p> <span>0</span>
                </div>
                <div class="tab">
                    <p>Requests</p> <span>{{ notifications.length }}</span>
                </div>
            </div>
            <div class="scroll">
                <div class="notifications">
                    <div v-for="(notification, index) in notifications" :key="index"
                        :class="notification.readAt == 0 ? 'notification active' : 'notification'">
                        <div class="image">
                            <div class="img" :id="`img_notification${index}`"></div>
                        </div>
                        <div class="text">
                            <p class="action">
                                <span>{{ $shortName(notification.from, 6) }}</span>
                                {{ getActionText(notification.id) }}
                            </p>
                            <p class="timestamp">
                                <timeago auto-update :datetime="new Date(notification.timestamp * 1000)" />
                            </p>
                            <div class="actions" v-if="notification.readAt == 0">
                                <div class="mark_as_read" v-on:click="markAsRead(notification._id)">
                                    <p>Mark as read</p>
                                </div>
                                <RouterLink v-on:click="$emit('close')"
                                    :to="`/discover/${notification.offerType == 0 ? 'lenders' : 'borrowers'}/${notification.offerId}`">
                                    <div class="view">
                                        <p>View</p>
                                        <IconOut />
                                    </div>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mark_all" v-on:click="markAllAsRead()">
                <p>Mark All as Read</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import Profile from '../scripts/Profile';
import IconClose from './icons/IconClose.vue';
import IconOut from './icons/IconOut.vue';
</script>

<script>
export default {
    props: ["userAddress"],
    data() {
        return {
            notifications: [],
            fetching: false
        }
    },
    methods: {
        generateImages: function () {
            for (let index = 0; index < this.notifications.length; index++) {
                let el = Profile.generate(50, this.notifications[index].from)
                let dom = document.getElementById(`img_notification${index}`)
                if (dom && dom.childNodes.length == 0) {
                    dom.appendChild(el)
                }
            }
        },
        markAsRead: async function (id) {
            this.axios.post(`https://darshprotocol.onrender.com/notifications/mark/${id}`).then(() => {
                this.getNotifications()
            }).catch(error => {
                console.error(error);
            })
        },
        markAllAsRead: async function () {
            this.axios.post(`https://darshprotocol.onrender.com/notifications/markall?to=${this.userAddress.toLowerCase()}`).then(() => {
                this.getNotifications()
            }).catch(error => {
                console.error(error);
            })
        },
        getActionText: function (code) {
            switch (code) {
                case 100: return 'accepts your request.'
                case 101: return 'rejects your request.'
                case 102: return 'Your request expires.'
                case 103: return 'repaid their loan.'
                case 104: return 'liquidates their loan.'
                default: return '';
            }
        },
        getNotifications: function () {
            if (!this.userAddress) return
            this.fetching = true
            this.axios.get(`https://darshprotocol.onrender.com/notifications?to=${this.userAddress.toLowerCase()}`).then(response => {
                this.notifications = response.data
                this.fetching = false
            }).catch(error => {
                console.error(error);
                this.fetching = false
            })
        }
    },
    mounted() {
        this.generateImages()
        this.getNotifications()
        document.body.classList.add('modal')
    },
    updated() {
        this.generateImages()
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
    padding: 60px;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(20, 20, 22, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    animation: fade_in .2s ease-in-out;
}

.box {
    width: 400px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    animation: slide_in_left .2s ease-in-out;
}


.title {
    height: 90px;
    width: 100%;
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

.tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 20px;
    height: 40px;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 6px;
}

.tab p {
    font-size: 14px;
    color: var(--textdimmed);
}

.tab span {
    border-radius: 2px;
    background: var(--bglighter);
    padding: 3px 4px 1px;
    font-size: 12px;
    color: var(--textdimmed);
}

.tabs .active {
    border-bottom: 2px solid var(--primary);
}

.tabs .active p {
    color: var(--textnormal) !important;
}

.tabs .active span {
    color: var(--textnormal) !important;
}

.scroll {
    overflow-y: auto;
    height: calc(100% - 180px);
}

.notification {
    display: flex;
    gap: 20px;
    border-top: 1px solid var(--bglightest);
    padding: 25px 30px;
}

.notification .image .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.notification .action {
    font-size: 14px;
    color: var(--textdimmed);
}

.notification .action span {
    font-weight: 500;
    color: var(--textnormal);
}

.notification .timestamp {
    font-size: 12px;
    color: var(--textdimmed);
    margin-top: 6px;
}

.notification .actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 18px;
    gap: 20px;
}

.notification .actions div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 4px;
    padding: 0 20px;
}

.mark_as_read {
    background: rgba(108, 110, 115, 0.1);
}

.mark_as_read,
.view p {
    font-size: 12px;
    color: var(--textnormal);
}

.view {
    background: rgba(105, 54, 245, 0.1);
    gap: 6px;
}

.view svg {
    width: 12px;
    height: 12x;
}

.notifications {
    display: flex;
    flex-direction: column-reverse;
}

.notifications .active {
    background: var(--bglighter);
}

.mark_all {
    height: 60px;
    background: var(--bglighter);
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mark_all p {
    font-size: 14px;
    text-decoration: underline;
    margin-top: -4px;
    color: var(--textnormal);
}
</style>