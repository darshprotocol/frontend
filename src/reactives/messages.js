import { reactive } from 'vue'

export const messages = reactive({
  data: [],
  insertMessage: function (message) {
    this.data.push(message)

    setTimeout(() => {
      this.deleteMessage(this.data.length - 1)
    }, 30000);
  },
  deleteMessage: function (index) {
    this.data.splice(index, 1)
  }
})