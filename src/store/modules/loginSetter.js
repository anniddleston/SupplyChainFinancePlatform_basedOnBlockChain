
const state = {
  currentUser: {},
  logInState: false
};
/*
const getters = {

};*/

const actions = {
  async arbitralLog({rootState, commit}, user) {
    if( rootState.load.currentAddr === rootState.load.arbitral.address) {
      console.log("loginsetter check caller addr pass")
      if( rootState.load.arbitral.name === user.name && rootState.load.arbitral.password === user.password && state.logInState === false){
        console.log("loginsetter check callerinfo pass")
        commit('setCurrentUser', user)
        commit('changeLogInState')
        return true
      }
      else return false
    }
    else return false
  },

  async bankLog({rootState, commit}, user){
    const result = await rootState.load.receivableAccounts.methods.bank_login(user.name, rootState.load.currentAddr, user.password).send( {from: rootState.load.currentAddr})
    if(result && state.logInState == false){
      commit('setCurrentUser', user)
      commit('changeLogInState')
      return result
    }
    else return false
  },

  async companyLog({rootState, commit}, user){
    const result = await rootState.load.receivableAccounts.methods.company_login(user.name, rootState.load.currentAddr, user.password).send( {from: rootState.load.currentAddr})
    if(result && state.logInState == false){
      commit('setCurrentUser', user)
      commit('changeLogInState')
      return result
    }
    else return false
  },

  async logOut({commit}, user){
    commit('setCurrentUser', user)
    commit('changeLogInState')
    return true
  }
};

const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user),
  changeLogInState: (state) => (state.logInState = !state.logInState)
};

export default {
  state,
  actions,
  mutations
};