<template>
  <div class="List">
    <div class="col s12 m3 card list">
      <div v-show="!edit">
        <h5>{{list.name}}</h5>
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
        <i @click="deleteList(list)" class="fa fa-times-circle " aria-hidden="true"></i>
      </div>
      <div v-if="edit">
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
        <form @submit.prevent="editList(list)">
          <input type="text" v-model="listName" required>
          <button class="btn btn-small btn-primary" type="submit">Edit</button>
        </form>

      </div>

      <div v-for="task in tasks">
        <task v-if="task.listId == list._id" :task="task"></task>
      </div>
      <form @submit.prevent="addTask">
        <input type="text" v-model="taskName" required>
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
        taskName: '',
        listName: this.list.name,
        edit: false
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
      },
      toggleEdit() {
        this.edit = !this.edit
      },
      editList(list) {
        if (list.name !== this.listName) {
          this.$root.$data.store.actions.editList({ name: this.listName, _id: list._id, boardId: list.boardId });
        }
        this.edit = !this.edit
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    min-height: 500px;
  }
</style>