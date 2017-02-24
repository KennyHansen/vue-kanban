<template>
    <div class="home">
        <h2>{{msg}}</h2>

        <div class="boards container">
            <div class="row">
                <div v-for="board in boards">
                    <div class="col s4">
                        <board :board="board"></board>
                    </div>

                </div>
            </div>
            <form @submit.prevent="addBoard">
                <input type="text" v-model="boardName">
                <button>Add</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Board from './Board'
    import boardService from '../services/board-service'

    export default {
        name: 'home',
        components: { Board, Error },
        mounted() {
            this.$root.$data.store.actions.getBoards()
        },
        computed: {
            boards() {
                return this.$root.$data.store.state.boards
            }
        },
        data() {
            return {
                msg: 'Hobord',
                boardName: ''
            }
        },
        methods: {
            addBoard() {
                this.$root.$data.store.actions.addBoard({
                    name: this.boardName,
                    description: "Something"
                })
                this.boardName = ''
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>