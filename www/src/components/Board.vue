<template>
  <div class="board card">
    <div class="card-title">
      <h3>
        <router-link :to="'boards/' + board._id">{{board.name}}</router-link>
      </h3>
      <button @click="deleteBoard(board)">Delete</button>
    </div>
    <!--<list></list>-->
  </div>
</template>

<script>
  export default {
    name: 'Board',
    props: ['board'],
    data() {
      return {
        msg: 'Board',
      }
    },
    methods: {
      deleteBoard(board) {
        this.$root.$data.store.actions.deleteBoard(board)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .board {
    padding: 10px;
    display: flex;
  }
</style>