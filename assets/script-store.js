import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

window.store = new Vuex.Store({
  state: {
    categories: [],
    sections: [],
  },

  mutations: {
    setState(state, data) {
      state[data.key] = data.value;
    },
  },

  getters: {
    categories: state => state.categories,
    sections: state => state.sections,
  },

  actions: {
    setState({ commit }, value) {
      commit('setState', value);
    },
  },
});