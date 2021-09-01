import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://www.wawasensei.dev/api/demo-auth/',
})

let user = localStorage.getItem('user')
if (!user) {
  user = {
    userId: -1,
    token: ''
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common['Authorization'] = user.token
  } catch {
    user = {
      userId: -1,
      token: ''
    }
  }
}
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      first_name: '',
      last_name: '',
      email: '',
      photo: ''
    }
  },
  mutations: {
    setStatus(state, status) {
      state.status= status
    },
    logUser(state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos
    }, 
    logout(state) {
      state.user = {
        userId: -1,
        token: ''
      }
      localStorage.removeItem('user')
    }
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/createAccount', userInfos)
          .then(function (response) {
            commit('setStaus', 'created')
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    getUserInfos: ({ commit }) => {
      instance.post('/infos')
          .then(function (response) {
            commit('userInfos', response.data.infos)
          })
          .catch(function () {
          })
    },
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/login', userInfos)
          .then(function (response) {
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_login')
            reject(error)
          })
      })
    }
  }
})

export default store