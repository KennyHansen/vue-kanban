import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 3000,
    withCredentials: true
})

axios.post('http://localhost:3000/login',{
    email:'LEEROOOOOY@jenkins.com',
    password:'atleastihadchicken'
})

let state = {
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: [],
    error: {}
}

let handleError = (err) => {
    state.error = err
}

let boardStore = {
    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS are responsible for managing all async requests
    actions: {
        getBoards() {
            api('boards').then(res => {
                state.boards = res.data.data
            }).catch(handleError)
        },
        getBoard(id) {
            api('boards/' + id).then(res => {
                state.activeBoard = res.data.data
                console.log(res.data.data)
            }).catch(handleError)
        },
        getListsAndTasks(id) {
            api('boards/' + id + '/all').then(res => {
                state.lists = res.data.data.lists
                state.tasks = res.data.data.tasks
                console.log(res.data.data)
            }).catch(handleError)
        },
        addBoard(board) {
            api.post('boards/', board).then(res => {
                this.getBoards()
            }).catch(handleError)
        },
        deleteBoard(board) {
            api.delete('boards/'+ board._id).then(res => {
                this.getBoards()
            }).catch(handleError)
        },
        addList(list) {
            api.post('lists/' + list._id, list).then(res => {
                this.getListsAndTasks(list.boardId)
            }).catch(handleError)
        },
        deleteList(list) {
            api.delete('lists/'+ list._id).then(res => {
                this.getListsAndTasks(list.boardId)
            }).catch(handleError)
        },
        addTask(task) {
            api.post('tasks/' + task._id, task).then(res => {
                this.getListsAndTasks(task.boardId)
            }).catch(handleError)
        },
        deleteTask(task) {
            api.delete('tasks/'+ task._id).then(res => {
                this.getListsAndTasks(task.boardId)
            }).catch(handleError)
        }
    }

}


export default boardStore