import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setTokenId, getTokenId, removeTokenId } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  tokenId: getTokenId()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, tokenId) => {
    state.tokenId = tokenId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { name, pass } = userInfo
    return new Promise((resolve, reject) => {
      login({ name, pass, token: getToken() }).then(res => {
        console.log(res)
        commit('SET_TOKEN', res.teaInofr.token)
        commit('SET_NAME', res.teaInofr.name)
        commit('SET_AVATAR', res.teaInofr.image)
        commit('SET_ID', res.teaInofr._id)
        setToken(res.teaInofr.token)
        setTokenId(res.teaInofr._id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    let params = {
      tokenIdArr: [
        {
          tokenId: state.tokenId
        }
      ]
    }
    return new Promise((resolve, reject) => {
      getInfo(params).then(response => {
        const { data } = response

        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', data[0].name)
        commit('SET_AVATAR', data[0].image)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeTokenId()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

