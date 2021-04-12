<template>
  <div class="home">
            <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-0">
            <!-- Card stats -->
            <div class="row">
            </div>
        </base-header>
    <img alt="BCSC logo" src="../assets/logo.png">
    <Homepage title="BCSC Financial Platform" msg="A Hand In Need At Any Time"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Homepage from '@/components/Homepage.vue'

export default {
  name: 'Home',
  components: {
    Homepage
  }
}
</script>

<style scoped>
img{
  margin: 60px
}
</style>
