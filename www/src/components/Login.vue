<template>
  <div class="login card">
      <form @submit.prevent="addBoard">
            <input type="text" v-model="username">
            <input type="text" v-model="password">
            <button>Login</button>
        </form>
      <!--<list></list>-->
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: ['board'],
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
