<template>
    <div>
        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6" id="arbi-add-company" v-if="currentUser.type=='arbitral'" >
                    <stats-card title="Arbitral"
                                type="gradient-yellow"
                                sub-title="Add Company"
                                icon="ni ni-building"
                                class="mb-4 mb-xl-0">
                        
                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='arbi-add-company'">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="arbi-add-bank" v-if="this.currentUser.type=='arbitral'">
                    <stats-card title="Arbitral"
                                type="gradient-yellow"
                                sub-title="Add Bank"
                                icon="ni ni-building"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='arbi-add-bank'">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="bank-CA-to-company" v-if="this.currentUser.type=='bank'">
                    <stats-card title="Bank"
                                type="gradient-red"
                                sub-title="Credit Asset Distribute"
                                icon="ni ni-building"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='bank-CA-to-company'; receiptInfo.bankIn=true; receiptInfo.isRealMoney=false">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="company-CA-to-company" v-if="this.currentUser.type=='company'">
                    <stats-card title="COMPANY"
                                type="gradient-orange"
                                sub-title="Credit Asset Transfer"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='company-CA-to-company'; receiptInfo.bankIn=false; receiptInfo.isRealMoney=false">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="bank-RM-to-company" v-if="this.currentUser.type=='bank'">
                    <stats-card title="bank"
                                type="gradient-green"
                                sub-title="Real Money Distribute"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='bank-RM-to-company';receiptInfo.bankIn=true; receiptInfo.isRealMoney=true">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6" id="company-RM-to-bank" v-if="this.currentUser.type=='company'">
                    <stats-card title="company"
                                type="gradient-info"
                                sub-title="Real Money Repay"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='company-RM-to-bank'; receiptInfo.bankIn=true; receiptInfo.isRealMoney=true">Transact</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="arbi-company-info" v-if="this.currentUser.type=='arbitral'">
                    <stats-card title="Arbitral"
                                type="gradient-info"
                                sub-title="Companys Information"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='arbi-company-info'">View</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="arbi-bank-info" v-if="this.currentUser.type=='arbitral'">
                    <stats-card title="Arbitral"
                                type="gradient-info"
                                sub-title="Banks Information"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='arbi-bank-info'">View</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="bank-receipt-view" v-if="this.currentUser.type=='bank'">
                    <stats-card title="Bank"
                                type="gradient-info"
                                sub-title="Receipts Record"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='bank-receipt-view'">View</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6" id="company-receipt-view" v-if="this.currentUser.type=='company'">
                    <stats-card title="Company"
                                type="gradient-info"
                                sub-title="Receipts Record"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <div class="text-center">
                                <base-button type="primary" class="my-4" size="sm" @click="functionName='company-receipt-view'">View</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            
            <div class="row" id="arbi-add-company" v-if="functionName=='arbi-add-company'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Add Company</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center text-muted mb-4">
                                        <small>Sign in company infos</small>
                                    </div>
                                    <form role="form">
                                        <b-form-select class="selectpicker mb-3"  v-model="companyInfo.whetherTrusted" >
                                            <b-form-select-option value="null" disabled>whetherTrusted</b-form-select-option>
                                            <b-form-select-option value="true">trusted</b-form-select-option>
                                            <b-form-select-option value="false">untrusted</b-form-select-option>
                                        </b-form-select>

                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Name"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="companyInfo.companyName">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Address"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="companyInfo.companyAddr">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Password"
                                                    addon-left-icon="ni ni-lock-circle-open"
                                                    v-model="companyInfo.companyKey">
                                        </base-input>
                                        
                                        
                                        <base-input class="input-group-alternative"
                                                    placeholder="Credit Asset Amount"
                                                    addon-left-icon="ni ni-money-coins"
                                                    v-model="companyInfo.creditAsset">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Real Money Amount"
                                                    addon-left-icon="ni ni-planet"
                                                    v-model="companyInfo.realMoney">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="addCompany">Add Company</base-button>
                                    </div>
                                    <base-alert type="primary" dismissible v-if="addCompanySuccess==1">
                                        <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                        <span class="alert-inner--text"><strong>Congratulation!</strong> Add company successfully!</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>

                                    <base-alert type="danger" dismissible v-if="addCompanySuccess==2">
                                        <span class="alert-inner--icon"><i class="ni ni-dislike-2"></i></span>
                                        <span class="alert-inner--text"><strong>Sorry...</strong> Add company failed!</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" id="arbi-add-bank" v-if="functionName=='arbi-add-bank'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Add Bank</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center text-muted mb-4">
                                        <small>Sign in bank infos</small>
                                    </div>
                                    <form role="form">
                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Name"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="bankInfo.bankName">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Address"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="bankInfo.bankAddr">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Password"
                                                    addon-left-icon="ni ni-lock-circle-open"
                                                    v-model="bankInfo.bankKey">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="addBank">Add Bank</base-button>
                                    </div>
                                    <base-alert type="primary" dismissible v-if="addBankSuccess==1">
                                        <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                        <span class="alert-inner--text"><strong>Congratulation!</strong> Add bank successfully!</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>

                                    <base-alert type="danger" dismissible v-if="addBankSuccess==2">
                                        <span class="alert-inner--icon"><i class="ni ni-dislike-2"></i></span>
                                        <span class="alert-inner--text"><strong>Sorry...</strong> Add bank failed!</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row " id="bank-CA-to-company" v-if="functionName=='bank-CA-to-company'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Credit Asset Distribute</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    
                                    <form role="form" >
                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Bank Name"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="receiptInfo.nameA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Bank Address"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="receiptInfo.addrA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Name"
                                                    addon-left-icon="ni ni-album-2"
                                                    v-model="receiptInfo.nameB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Address"
                                                    addon-left-icon="ni ni-basket"
                                                    v-model="receiptInfo.addrB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Credit Asset Amount"
                                                    addon-left-icon="ni ni-atom"
                                                    v-model="receiptInfo.amount">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="bankGiveCreditAssetToCompany">Distribute</base-button>
                                    </div>
                                    <base-alert type="primary" dismissible v-if="func_success==1">
                                        <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                        <span class="alert-inner--text"><strong>Congratulation!</strong> Successful transaction!</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>

                                    <base-alert type="danger" dismissible v-if="func_success==2">
                                        <span class="alert-inner--icon"><i class="ni ni-dislike-2"></i></span>
                                        <span class="alert-inner--text"><strong>Sorry...</strong> Transaction failed !</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </base-alert>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" id="company-CA-to-company" v-if="functionName=='company-CA-to-company'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Credit Asset Transfer</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    <form role="form" >
                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Company Name (from)"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="receiptInfo.nameA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Address (from)"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="receiptInfo.addrA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Name (to)"
                                                    addon-left-icon="ni ni-album-2"
                                                    v-model="receiptInfo.nameB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Address (to)"
                                                    addon-left-icon="ni ni-basket"
                                                    v-model="receiptInfo.addrB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Credit Asset Amount"
                                                    addon-left-icon="ni ni-atom"
                                                    v-model="receiptInfo.amount">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="companyGiveCreditAssetToCompany">Transfer</base-button>
                                    </div>
                        
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" id="bank-RM-to-company" v-if="functionName=='bank-RM-to-company'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Real Money Distribute</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    <form role="form" >
                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Bank Name"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="receiptInfo.nameA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Bank Address"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="receiptInfo.addrA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Name"
                                                    addon-left-icon="ni ni-album-2"
                                                    v-model="receiptInfo.nameB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Address"
                                                    addon-left-icon="ni ni-basket"
                                                    v-model="receiptInfo.addrB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Credit Asset Amount"
                                                    addon-left-icon="ni ni-atom"
                                                    v-model="receiptInfo.amount">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="bankGiveRealMoneyToCompany">Distribute</base-button>
                                    </div>
                        
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row " id="company-RM-to-bank" v-if="functionName=='company-RM-to-bank'">
                <div class="col">
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-header bg-transparent pb-5">
                                    <div class="text-info text-center mt-5 mb-0"><h3>Repay Real Money</h3></div>
                                </div>
                                <div class="card-body px-lg-5 py-lg-5">
                                    <form role="form" >
                                        <base-input class="input-group-alternative mb-3"
                                                    placeholder="Company Name"
                                                    addon-left-icon="ni ni-credit-card"
                                                    v-model="receiptInfo.nameA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Company Address"
                                                    addon-left-icon="ni ni-istanbul"
                                                    v-model="receiptInfo.addrA">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Bank Name"
                                                    addon-left-icon="ni ni-album-2"
                                                    v-model="receiptInfo.nameB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Bank Address"
                                                    addon-left-icon="ni ni-basket"
                                                    v-model="receiptInfo.addrB">
                                        </base-input>
                                        <base-input class="input-group-alternative"
                                                    placeholder="Credit Asset Amount"
                                                    addon-left-icon="ni ni-atom"
                                                    v-model="receiptInfo.amount">
                                        </base-input>
                                    </form>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" @click="trustedCompanyRepayToBank">Repay</base-button>
                                    </div>
                                    <div>
                                        <base-alert type="primary" dismissible v-if="bargainOver==true ">
                                            <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                            <span class="alert-inner--text"><strong>Congratulation!</strong> The bargain is over !</span>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </base-alert>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5" id="arbi-company-info" v-if="functionName=='arbi-company-info'">
                <div class="col">
                    <company-table title="Company Information"></company-table>
                </div>

            </div>

            <div class="row mt-5" id="arbi-bank-info" v-if="functionName=='arbi-bank-info'">
                <div class="col">
                    <bank-table  title="Bank Information"></bank-table>
                </div>

            </div>

            <div class="row mt-5" id="bank-receipt-view" v-if="functionName=='bank-receipt-view'">
                <div class="col">
                    <receipt-table title="Receipt Information"></receipt-table>
                </div>

            </div>

            <div class="row mt-5" id="company-receipt-view" v-if="functionName=='company-receipt-view'">
                <div class="col">
                    <receipt-table  title="Receipt Information"></receipt-table>
                </div>
            </div>
        </div>
        

        

    </div>
</template>
<script>
 // import ProjectsTable from './Tables/ProjectsTable'
  import ReceiptTable from './Tables/ReceiptTable'
  import CompanyTable from './Tables/CompanyTable'
  import BankTable from './Tables/BankTable'
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  export default {
    name: 'tables',
    components: {
     // ProjectsTable,
      ReceiptTable,
      CompanyTable,
      BankTable
    },
    computed: 
        mapState({
            currentUser: state => state.loginSetter.currentUser,
            logInState: state => state.loginSetter.logInState,
            companys: state => state.load.companys,
            banks: state => state.load.banks,
            receipts: state => state.load.receipts,
            trustedCompanyFinishedWithBank: state => state.load.trustedCompanyFinishedWithBank
            
            
        })
    ,
    data() {
      return {
          functionName: '',
          companyInfo: {
              companyName: '',
              companyAddr: '',
              companyKey: '',
              whetherTrusted: null,
              creditAsset: '',
              realMoney: ''
          },
          bankInfo: {
              bankName: '',
              bankAddr: '',
              bankKey: ''
          },
          receiptInfo: {
              nameA: '',
              addrA: '',
              nameB: '',
              addrB: '',
              amount: '',
              bankIn: false,
              isRealMoney: false
          },
          addCompanySuccess: 0, //0-default, 1-success, 2-fail
          addBankSuccess: 0,
          func_success: 0,
          bargainOver: false
      }
    },
    methods:{
        ...mapActions(["add_company","add_bank","bank_giveCreditAssetTo_trustedCompany","company_giveCreditAssetTo_company",
        "bank_giveRealMoneyTo_company","trustedCompany_repayTo_bank","trustedCompany_finishWith_bank"]),

        async addCompany(event){
            event.preventDefault()
            console.log("company info",this.companyInfo)
            const result = this.add_company(this.companyInfo)
            if(result)  this.addCompanySuccess = 1
            else this.addCompanySuccess = 2
        },

        async addBank(event){
            event.preventDefault()
            console.log(this.bankInfo)
            const result = this.add_bank(this.bankInfo)
            if(result)  this.addBankSuccess = 1
            else this.addBankSuccess = 2
        },

        async bankGiveCreditAssetToCompany(event){
            event.preventDefault()
            console.log(this.receiptInfo)
            const result = this.bank_giveCreditAssetTo_trustedCompany(this.receiptInfo)
            if(result) this.func_success = 1
            else this.func_success = 2
        },

        async companyGiveCreditAssetToCompany(event){
            event.preventDefault()
            console.log(this.receiptInfo)
            const result = this.company_giveCreditAssetTo_company(this.receiptInfo)
            if(result) this.func_success = 1
            else this.func_success = 2
        },

        async bankGiveRealMoneyToCompany(event){
            event.preventDefault()
            console.log(this.receiptInfo)
            const result = this.bank_giveRealMoneyTo_company(this.receiptInfo)
            if(result) this.func_success = 1
            else this.func_success = 2
        },

        async trustedCompanyRepayToBank(event){
            event.preventDefault()
            console.log(this.receiptInfo)
            const result = this.trustedCompany_repayTo_bank(this.receiptInfo)
            if(result) this.func_success = 1
            else this.func_success = 2
            const whetherEnd = this.trustedCompanyFinishWithBank(this.receiptInfo)
            if(whetherEnd) {
                this.bargainOver = true
                this.trustedCompanyFinishedWithBank = true
            }
        },

        async trustedCompanyFinishWithBank(){
            const result = this.trustedCompany_finishWith_bank(this.receiptInfo)
            return result
        }
    }
  };
</script>
<style></style>
