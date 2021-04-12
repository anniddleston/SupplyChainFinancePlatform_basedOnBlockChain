// import axios from 'axios'
// import Web3 from 'web3'
/*
const state = {
  arbitral,
  companys: [],
  banks:[]
};
/*
const getters = {

};
*/
const actions = { 

  async arbitralReg({rootState, commit},{ name:arbiName, password:arbiPass}) {
    console.log('currentaddr', rootState.load.currentAddr)
    console.log('load arbi', rootState.load.arbitral[1])
    console.log(arbiName, arbiPass)
    if( rootState.load.currentAddr === rootState.load.arbitral[1]) {
      console.log("right user")
      const arbitral = {
        name: arbiName, 
        password: arbiPass, 
        address: rootState.load.arbitral[1]
      }
      commit('setArbitral', arbitral)
      console.log(rootState.load.arbitral)
      return true
    }
    else return false
  }
};


export default {
  actions,
 // mutations
};
