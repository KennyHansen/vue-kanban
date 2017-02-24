<template>
  <div class="List">
    <div class="col s12 m3 card list">
      <h5>{{list.name}}</h5>
      <button @click="deleteList(list)">Delete</button>
      <div v-for="task in tasks">
        <div class="card blue white-text">
          <task v-if="task.listId == list._id" :task="task"></task>
        </div>
      </div>
      <form @submit.prevent="addTask">
          <input type="text" v-model="taskName">
        </form>
    </div>
  </div>
</template>

<script>
  import Task from './Task'
  import boardService from '../services/board-service'
  export default {
    name: 'List',
    props: ['list', 'tasks'],
    components: { Task },
    data() {
      return {
        taskName: ''
      }
    },
    methods: {
      deleteList(list) {
        this.$root.$data.store.actions.deleteList(list)
      },
      addTask(taskName) {
        this.$root.$data.store.actions.addTask({
            name: this.taskName,
            description: "Some task",
            boardId: this.$root.$root.$route.params.id,
            listId: this.list._id
        })
        this.taskName = ''
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    margin: 20px;
    min-height: 500px;
  }
</style>