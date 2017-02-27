<template>
  <div class="task card" draggable="true" v-on:dragstart.capture="moving">
    <div class="task-head card-head blue white-text">
      <div v-show="!edit">
        {{task.name}}
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
        <i @click="deleteTask(task)" class="fa fa-check inline-flex" aria-hidden="true"></i>
      </div>
      <div v-if="edit">
        <i @click="toggleEdit()" class="fa fa-pencil" aria-hidden="true"></i>
        <form class="task" @submit.prevent="editTask(task)">
          <input type="text" v-model="taskName" required>
          <button class="btn btn-small btn-primary" type="submit">Edit</button>
        </form>
      </div>
    </div>
    <!--<div v-show="!task.comments" class="input-field col s12 m3">
        <textarea id="textarea1" class="materialize-textarea" rows="4" cols="100" v-model="text"></textarea>
        <label for="textarea1">Comments</label>
    </div>-->

  </div>
</template>

<script>
  export default {
    name: 'task',
    props: ['task'],
    data() {
      return {
        msg: 'task',
        text: '',
        taskName: this.task.name,
        edit: false
      }
    },
    methods: {
      deleteTask(task) {
        this.$root.$data.store.actions.deleteTask(task)
      },
      addComment() {
        this.$root.$data.store.actions.addComment(this.text)
        this.text = ''
      },
      toggleEdit() {
        this.edit = !this.edit
      },
      editTask(task) {
        if (task.name !== this.taskName) {
          this.$root.$data.store.actions.editTask({ name: this.taskName, _id: task._id, boardId: task.boardId });
        }
        this.edit = !this.edit
      },
      moving(event) {
        event.dataTransfer.setData('text/javascript', JSON.stringify(this.task))
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task {
    display: inline-block;
    width: 80%;
  }
  
  .task-head {
    padding: 2px 5px;
  }
  
  i {
    /*display: block;*/
    margin: 0px;
  }
</style>