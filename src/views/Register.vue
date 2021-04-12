<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-5 mb-0">
                        <h3>Sign up</h3>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>sign up with credentials</small>
                    </div>
                    <form role="form">
                        
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Arbitral Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.name">
                        </base-input>


                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4"  @click="arbitralRegist">Create account</base-button>
                        </div>
                    </form>
                    <div>
                        <base-alert type="primary" dismissible v-if="regSubmit==true && regSuccess==true">
                            <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                            <span class="alert-inner--text"><strong>Congratulation!</strong> Sign in successfully!</span>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </base-alert>

                        <base-alert type="danger" dismissible v-if="regSubmit==true && regSuccess==false">
                            <span class="alert-inner--icon"><i class="ni ni-dislike-2"></i></span>
                            <span class="alert-inner--text"><strong>Sorry...</strong> Sign in failed!</span>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </base-alert>

                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 text-center">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Regist',
    data() {
      return {
        model: {
          name: '',
          password: ''
        },
        regSuccess: false,
        regSubmit: false,
        arbitral_reg: false
      }
    },
    methods: {
        ...mapActions(["arbitralReg"]),

        async arbitralRegist(e) {
        e.preventDefault();
        console.log("attr", this.model.name, this.model.password)
        const result = await this.arbitralReg(this.model)
        this.regSubmit = true
        if(result){
            this.arbitral_reg = true
        }
        this.regSuccess = result
        }
    }
  }
</script>
<style>
</style>
