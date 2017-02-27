<template>
  <div class="board-list">

    <router-link to="/">Back</router-link>
    <h2>{{board.name}}</h2>

    <div class="container-fluid">
      <div class="row">
        <list :list="list" :tasks="tasks" v-for="list in lists"></list>
        <form class="col s3 card" @submit.prevent="addList">
          <input type="text" v-model="listName" placeholder="New list" required>
          <button>Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './List'
  import boardService from '../services/board-service.js'
  export default {
    name: 'board-list',
    components: { List },
    data() {
      return {
        msg: 'Board',
        listName: '',
      }
    },
    mounted() {
      this.$root.$data.store.actions.getBoard(this.$root.$root.$route.params.id)
      this.$root.$data.store.actions.getListsAndTasks(this.$root.$root.$route.params.id)
    },
    computed: {
      board() {
        return this.$root.$data.store.state.activeBoard
      },
      lists() {
        return this.$root.$data.store.state.lists
      },
      tasks() {
        return this.$root.$data.store.state.tasks
      }
    },
    methods: {
      addList(listName) {
        this.$root.$data.store.actions.addList({
            name: this.listName,
            description: "Something",
            boardId: this.$root.$root.$route.params.id
        })
        this.listName = ''
      },
      handleDrop() {
        console.log("drop")
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    margin: 0px;
    min-height: 500px;
  }
</style>