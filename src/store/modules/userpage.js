
const state = {
  userInfo: {}
  
};
/*
const getters = {

};*/

const actions = {
  async loadUserInfo({rootState, commit}, user){
    commit ('setUserInfo', user)
  }
};

const mutations = {
  setUserInfo: (state, user) => (state.userInfo = user),
};

export default {
  state,
  actions,
  mutations
};