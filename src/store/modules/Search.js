const state = {
  // 搜索文本
  searchText: '',
  count: 0
}

const mutations = {
  SET_SEARCH_TEXT: (state, payload) => {
    state.searchText = payload
  }
}

const actions = {
  SET_SEARCH_DATA ({commit}) {
    let param = ''
    commit('SET_SEARCH_TEXT', param)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
