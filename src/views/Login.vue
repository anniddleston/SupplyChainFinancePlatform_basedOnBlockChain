<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-5 mb-0"><h3>Log in</h3></div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5" >
                        <div class="text-center text-muted mb-4">
                            <small> log in with credentials</small>
                        </div>
                        <div class="select-wrapper mb-3" >
                          <b-form-select class="selectpicker"  v-model="model.type" >
                            <b-form-select-option value="null" disabled>Type</b-form-select-option>
                            <b-form-select-option value="arbitral">Arbitral</b-form-select-option>
                            <b-form-select-option value="company">Company</b-form-select-option>
                            <b-form-select-option value="bank">Bank</b-form-select-option>
                          </b-form-select>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Name"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.name">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" v-bind:disabled="this.loginPermit"  @click="login_func">Log in</base-button>
                            </div>
                        </form>
                        <div>
                            <base-alert type="primary" dismissible v-if="loginSubmit==true && loginSuccess==true">
                                <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                <span class="alert-inner--text"><strong>Congratulation!</strong> Log in successfully !</span>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </base-alert>

                            <base-alert type="danger" dismissible v-if="loginSubmit==true && loginSuccess==false">
                                <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                <span class="alert-inner--text"><strong>Sorry...</strong> Log in failed !</span>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </base-alert>

                            
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 text-center">
                        <router-link to="/regist" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 text-center">
                    
                        <base-button type="default" class="my-4"  @click="log_out">Log out</base-button>
                    
                  </div>
                </div>
            </div>
        </div>
</template>
<script>
  import { mapActions } from "vuex"
  import { mapState } from "vuex"
  export default {
    name: 'login',
    data() {
      return {
        model: {
          name: '',
          password: '',
          type: null
        },
        loginSubmit: false,
        loginSuccess: false
      }
    },
    computed: {
      ...mapState({
        loginPermit: state => state.loginSetter.logInState
      })
    },
    methods: {
    ...mapActions(["arbitralLog", "bankLog", "companyLog","logOut"]),
    
      async login_func (e)  {
        e.preventDefault()
        if(! this.loginPermit){
          console.log(this)
          var result = false
          console.log("login attr", this.model.name, this.model.password)
          if(this.model.type == 'bank'){
            result = await this.bankLog(this.model)
            
          }
          else if(this.model.type == 'company'){
            result = await this.companyLog(this.model)
            
          }
          else if(this.model.type == 'arbitral'){
            result = await this.arbitralLog(this.model)
          }
          this.loginSubmit = true
          console.log("login result",result)
          this.loginSuccess = result
        }
      },

      async log_out(){
        const user= { }
        await this.logOut(user)
        this.loginSuccess = false
        this.loginSubmit = false
      }

      
    }
   


  }
</script>
<style>
</style>
