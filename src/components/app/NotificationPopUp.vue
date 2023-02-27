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
                <div class="tab">
                    <p>All</p> <span>4</span>
                </div>
                <div class="tab">
                    <p>Actions</p> <span>4</span>
                </div>
                <div class="tab active">
                    <p>Requests</p> <span>4</span>
                </div>
            </div>
            <div class="scroll">
                <div class="notifications">
                    <div v-for="(notification, index) in data" :key="index"
                        :class="!notification.markedAsRead ? 'notification active' : 'notification'">
                        <div class="image">
                            <img :src="notification.from.image" alt="">
                        </div>
                        <div class="text">
                            <p class="action">
                                <span v-if="notification.from.name">{{ notification.from.name }}</span>
                                {{ notification.action }}
                            </p>
                            <p class="timestamp">
                                {{ notification.timestamp }}
                            </p>
                            <div class="actions" v-if="!notification.markedAsRead">
                                <div class="mark_as_read">
                                    <p>Mark as read</p>
                                </div>
                                <div class="view">
                                    <p>View</p>
                                    <IconOut />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconClose from '../icons/IconClose.vue';
import IconOut from '../icons/IconOut.vue';
</script>

<script>
export default {
    data() {
        return {
            data: [
                {
                    from: {
                        image: "/images/user1.png",
                        name: "LenderA.ftm"
                    },
                    action: "accepts your request.",
                    actionCode: 1,
                    timestamp: 2983737392,
                    markedAsRead: false
                },
                {
                    from: {
                        image: "/images/user1.png",
                        name: "Alice.ftm"
                    },
                    action: "rejects your request.",
                    actionCode: 2,
                    timestamp: 2983847392,
                    markedAsRead: false
                },
                {
                    from: {
                        image: "/images/user1.png"
                    },
                    action: "Your request expires.",
                    actionCode: 3,
                    timestamp: 2983737392,
                    markedAsRead: true
                },
                {
                    from: {
                        image: "/images/user1.png"
                    },
                    action: "You accepted a request.",
                    actionCode: 1,
                    timestamp: 2983737392,
                    markedAsRead: true
                },
                {
                    from: {
                        image: "/images/user1.png"
                    },
                    action: "You rejected a request.",
                    actionCode: 2,
                    timestamp: 2983737392,
                    markedAsRead: true
                },
                {
                    from: {
                        image: "/images/user1.png",
                        name: "Alice.ftm"
                    },
                    action: "rejects your request.",
                    actionCode: 2,
                    timestamp: 2983847392,
                    markedAsRead: true
                }
            ]
        };
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
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

.scroll {
    overflow-y: auto;
    height: calc(100% - 120px);
}

.notification {
    display: flex;
    gap: 20px;
    border-top: 1px solid var(--bglightest);
    padding: 25px 30px;
}

.notification .image img {
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

.notifications .active {
    background: var(--bglighter);
}
</style>