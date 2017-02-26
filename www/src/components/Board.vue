<template>
  <div class="board card">
    <div class="card-title">
      <div v-show="!edit">
        <h4>
          <router-link :to="'boards/' + board._id">{{board.name}}</router-link>
        </h4>
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
        <i @click="deleteBoard(board)" class="fa fa-times-circle align-right" aria-hidden="true"></i>
      </div>

      <div v-show="edit">
        <form class="boards" @submit.prevent="editBoard(board)">
          <input type="text" v-model="boardName" required>
          <button class="btn btn-small btn-primary" type="submit">Edit</button>
        </form>
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
      </div>

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
        boardName: this.board.name,
        edit: false
      }
    },
    methods: {
      deleteBoard(board) {
        this.$root.$data.store.actions.deleteBoard(board)
      },
      toggleEdit() {
        this.edit = !this.edit
      },
      editBoard(board) {
        if (board.name !== this.boardName) {
          this.$root.$data.store.actions.editBoard({ name: this.boardName, _id: board._id });
        }
        this.edit = !this.edit
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