<template>
  <div id="app">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
//import Web3 from 'web3'
//import ReceivableAccounts from '../build/contracts/ReceivableAccounts.json'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    
  },

  

  data: () => ({
    
    
  }),

  methods: {
    ...mapActions(['loadWeb3','loadBlockChainData'])
  },

  async created() {
   await this.loadWeb3()
   await this.loadBlockChainData()

  },
  
}

  
</script>

<style>
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
figure {
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 10px;
	margin-inline-end: 0;
}
body{
  background-color: #EDF7FA;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
