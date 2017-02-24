<template>
  <div class="task">
    {{task.name}}
    <i @click="deleteTask(task)" class="fa fa-times-circle align-right" aria-hidden="true"></i>
  </div>
</template>

<script>
  export default {
    name: 'task',
    props: ['task'],
    data() {
      return {
        msg: 'task'
      }
    },
    methods: {
      deleteTask(task) {
        this.$root.$data.store.actions.deleteTask(task)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .align-right {
    display: inline-flex;
  }
</style>