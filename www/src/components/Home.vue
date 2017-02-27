<template>
    <div class="home">
        <h2>{{msg}}</h2>
        <!--<button @click="makeBoards">Make boards</button>-->

        <div v-if="user.name">
            <div class="boards container">
                <div class="row">
                    <div v-for="board in boards">
                        <div class="col m4 s12">
                            <board :board="board"></board>
                        </div>
                    </div>
                </div>
                <form class="boards container" @submit.prevent="addBoard">
                    <input type="text" v-model="boardName" placeholder="New board" required>
                    <button>Add</button>
                </form>
            </div>
        </div>
        <div v-else-if="loading">
            Loading...
        </div>
        <div v-else>
            Please login or register to use Hobord.
        </div>
    </div>
</template>

<script>
    import Board from './Board'
    import boardService from '../services/board-service'

    export default {
        name: 'home',
        components: { Board, Error },
        // mounted() {
        //     this.$root.$data.store.actions.()
        // },
        computed: {
            boards() {
                return this.$root.$data.store.state.boards
            },
            user() {
                return this.$root.$data.store.state.activeUser
            },
            loading() {
                return this.$root.$data.store.state.isLoading
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
            },
            makeBoards() {
                this.$root.$data.store.actions.getBoards()
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>