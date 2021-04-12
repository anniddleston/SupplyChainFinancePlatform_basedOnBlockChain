
const state = {

};
/*
const getters = {

};*/

const actions = {
  async add_company({rootState}, user) {
    if(rootState.loginSetter.currentUser.type !== 'arbitral')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.company_regist(user.companyName, user.companyKey, user.companyAddr, user.whetherTrusted,
       parseInt(user.creditAsset), parseInt(user.realMoney)).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },

  async add_bank({rootState}, user) {
    if(rootState.loginSetter.currentUser.type !== 'arbitral')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.bank_regist(user.bankName, user.bankKey, user.bankAddr).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },

  async bank_giveCreditAssetTo_trustedCompany({rootState}, receipt) {
    if(rootState.loginSetter.currentUser.type !== 'bank')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.bank_giveCreditAssetTo_trustedCompany(receipt.nameA, receipt.nameB, rootState.load.currentAddr, receipt.addrB, receipt.amount).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },

  async company_giveCreditAssetTo_company({rootState},  receipt){
    if(rootState.loginSetter.currentUser.type !== 'company')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.company_giveCreditAssetTo_company(receipt.nameA, receipt.nameB, rootState.load.currentAddr, receipt.addrB, receipt.amount).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },
  async bank_giveRealMoneyTo_company({rootState}, receipt){
    if(rootState.loginSetter.currentUser.type !== 'bank')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.bank_giveRealMoneyTo_company(receipt.nameA, receipt.nameB, rootState.load.currentAddr, receipt.addrB, receipt.amount).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },
  async trustedCompany_repayTo_bank({rootState}, receipt){
    if(rootState.loginSetter.currentUser.type !== 'company')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.trustedCompany_repayTo_bank(receipt.nameA, receipt.nameB, rootState.load.currentAddr, receipt.addrB, receipt.amount).send( {from: rootState.load.currentAddr})
      return result
    }
    
  },
  async trustedCompany_finishWith_bank({rootState}, info){
    if(rootState.loginSetter.currentUser.type !== 'company')
      return false
    else{
      const result = await rootState.load.receivableAccounts.methods.trustedCompany_finishWith_bank(info.nameA, info.nameB, rootState.load.currentAddr, info.addrB).call()
      return result
    }
  }

};

const mutations = {
  setcurrentUser: (state, type) => (state.currentUser.type = type),
  setCurrentUser: (state, user) => (state.currentUser = user)
};

export default {
  state,
  actions,
  mutations
};