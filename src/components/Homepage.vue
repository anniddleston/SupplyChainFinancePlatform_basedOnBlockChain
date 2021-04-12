<template>
  <div class="hello">
    <span>
      <h1>{{title}}</h1>
      <br>
      <p>{{msg}}</p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
msg{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font: message-box;
}

span{
  align-content: center;
}
</style>
