import mutations from '../mutations';

const { SHOW_ROAST_NOTIFY } = mutations;

const notificationStore = {
  state: {
    messagePool: [],
  },

  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  mutations: {
    [SHOW_ROAST_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_ROAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
