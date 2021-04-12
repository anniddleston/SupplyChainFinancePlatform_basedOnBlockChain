//import axios from 'axios'
import Web3 from 'web3'
import ReceivableAccounts from '../../../build/contracts/ReceivableAccounts.json'

const state = {
  currentAddr: '',
  userInfo: {},
  receivableAccounts: null,
  companyCount: 0,
  bankCount:0,
  receiptCount: 0,
  arbitral: {},
  companys: [],
  companyAddrs: [],
  banks: [],
  bankAddrs: [],
  receipts: [],
  trustedCompanyFinishedWithBank: false
};
/*
const getters = {

};*/

const actions = {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  async loadBlockChainData({commit}) {
    const web3 = window.web3
    // Load currentUser
    const accounts = await web3.eth.getAccounts()
    //this.currentAddr = accounts[0]
    commit('setCurrentAddr', accounts[0])
    console.log(state.currentAddr)
    // Network ID
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = ReceivableAccounts.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(ReceivableAccounts.abi, networkData.address)
      commit('setContract', contract)
      console.log("contract and address", networkData.address)
      //state.receivableAccounts = contract
      console.log('state contract', state.receivableAccounts)
      // load arbitral
      const arbitral = await state.receivableAccounts.methods.arbitralInstitution().call()
      console.log("arbi", arbitral)
      commit('setArbitral', arbitral)
      // load company info
      const companyCount = await state.receivableAccounts.methods.companyCount().call()
      commit("setCompanyCount", companyCount)
      //console.log(this.companyCount)
      for( var i = 0; i < companyCount; i++) {
        const compAddr = await state.receivableAccounts.methods.company_addrs(i).call()
        commit('addCompanyAddrs', compAddr)
        const comp = await state.receivableAccounts.methods.getCompany(compAddr).call()
        commit('addCompanys',comp)
        if(compAddr == state.currentAddr) {
          commit('setUserInfo',comp)
        }
      }
      // load bank info
      const bankCount = await state.receivableAccounts.methods.bankCount().call()
      commit('setBankCount', bankCount)
      //console.log(this.bankCount)
      for( i = 0; i < bankCount; i++) {
        const bankAddr = await state.receivableAccounts.methods.bank_addrs(i).call()
        commit("addBankAddrs", bankAddr)
        const bankinfo = await state.receivableAccounts.methods.banks(bankAddr).call()
        const bankReceipt = await state.receivableAccounts.methods.getBankReceipts(bankAddr).call()
        const bankDebtComp = await state.receivableAccounts.methods.getBankDebtCompanys(bankAddr).call()
        const debtAmount = []
        for( var j = 0; j < bankDebtComp.length; j++){
          const debt = await state.receivableAccounts.methods.getBankDebt(bankAddr,bankDebtComp[j]).call()
          debtAmount.push(debt)
        }
        //const bankDebtAmount = await state.receivableAccounts.methods.getBankDebtAmounts(bankAddr).call()
        const bank = {
          info : bankinfo,
          receipts : bankReceipt,
          debtComp : bankDebtComp,
          debtAmount : debtAmount
        } 
        commit('addBanks',bank)
        //state.bankAddrs = [...state.bankAddrs, bankAddr]
        if(bankAddr == state.currentAddr) {
          commit('setUserInfo',bank)
        }
      }
      //console.log(this.bankAddrs)
      //load receipt info
      const receiptCount = await state.receivableAccounts.methods.receiptCount().call()
      state.receiptCount = receiptCount
      //console.log(this.receiptCount)
      for( i = 0; i < receiptCount; i++) {
        const receipt = await state.receivableAccounts.methods.receipts(i).call()
        commit("addReceipts", receipt)
        //state.receipts = [...state.receipts, receipt]
      }
      console.log(state.receipts)
    } else {
      window.alert('ReceivableAccounts contract not deployed to detected network.')
    }
  }

  

  

};

const mutations = {
  setArbitral: (state, arbitral) => (state.arbitral = arbitral),
  setContract: (state, account) => (state.receivableAccounts = account),
  setCurrentAddr: (state, addr) => (state.currentAddr = addr),
  setCompanyCount: (state, count) => (state.companyCount = count),
  setBankCount: (state, count) => (state.bankCount = count),
  setReceiptCount: (state, count) => (state.receiptCount = count),
  addCompanys: (state, company) => (state.companys = [...state.companys, company]),
  addCompanyAddrs: (state, addr) => (state.companyAddrs = [...state.companyAddrs, addr]),
  addBanks: (state, bank) => (state.banks = [...state.banks, bank]),
  addBankAddrs: (state, addr) => (state.bankAddrs = [...state.bankAddrs, addr]),
  addReceipts: (state, receipt) => (state.receipts = [...state.receipts, receipt]),
  setEndingMark: (state, mark) => (state.trustedCompanyFinishedWithBank = mark),
  setUserInfo: (state, info) => (state.userInfo = info)
};

export default {
  state,
  actions,
  mutations
};