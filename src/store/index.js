import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    address: 'disconnected',
    isMetaMaskConnected: false
  },
  mutations: {
      setAddress(state, payload) {
        state.address = payload;
      },
      connectMetaMask(state) {
        state.isMetaMaskConnected = true
      },
      disconnectMetaMask(state) {
        state.isMetaMaskConnected = false
      }
  },
  plugins: [
    createPersistedState()
  ]
})