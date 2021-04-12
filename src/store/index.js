import Vuex from 'vuex'
import Vue from 'vue'
//import register from './modules/register';
import load from './modules/load'
import register from './modules/register'
import loginSetter from './modules/loginSetter'
import business from './modules/business'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    load,
    register,
    loginSetter,
    business
  }
});

