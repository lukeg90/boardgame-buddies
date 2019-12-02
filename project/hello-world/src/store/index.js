import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessions: [],
    sessionsToday: [],
    session: {},
    players: [],
    player: {}
  },
  mutations: {
    SET_SESSIONS(state, data) {
      state.sessions = data
    },
    SET_SESSION(state, data) {
      state.session = data
    },
    SET_SESSIONS_TODAY(state, data) {
      state.sessionsToday = data
    },
    SET_PLAYERS(state, data) {
      state.players = data
    },
    SET_PLAYER(state, data) {
      state.player = data
    }
  },
  actions: {
    async fetchSessions({ commit }) {
      const result = await axios.get('http://localhost:3000/session/all/json')
      commit('SET_SESSIONS', result.data)
    },
    async fetchSessionsToday({ commit }) {
      const result = await axios.get('http://localhost:3000/session/all/today/json')
      commit('SET_SESSIONS_TODAY', result.data)
    },
    async fetchSession({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/session/${id}/json`)
      commit('SET_SESSION', result.data)
    },
    async fetchPlayers({ commit }) {
      const result = await axios.get('http://localhost:3000/player/all/json')
      commit('SET_PLAYERS', result.data)
    },
    async fetchPlayer({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/player/${id}/json`)
      commit('SET_PLAYER', result.data)
    }
  },
  modules: {
  }
})
