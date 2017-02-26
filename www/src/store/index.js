import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 30000,
    withCredentials: true
})

// axios.post('http://localhost:3000/login',{
//     email:'LEEROOOOOY@jenkins.com',
//     password:'atleastihadchicken'
// }).then(console.log)

// api.post('http://localhost:3000/login',{
//     email:'herecomesdatboi@ohshit.waddup',
//     password:'yolo'
// })

let state = {
    boards: [],
    activeBoard: {},
    activeUser: {},
    isLoading: false,
    lists: [],
    tasks: [],
    error: {}
}

let handleError = (err) => {
    state.error = err
    state.isLoading = false
}

let handleEdit = (elems) => {
    for(elem of elems) {
        elem.edit = false;
    }
}

let boardStore = {
    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS are responsible for managing all async requests
    actions: {
        // USER BOARDS
        getBoards() {
            api('userboards').then(res => {
                state.boards = res.data.data
                //handleEdit(state.boards)
                state.isLoading = false
            }).catch(handleError)
        },
        getBoard(id) {
            api('boards/' + id).then(res => {
                state.activeBoard = res.data.data
            }).catch(handleError)
        },
        getListsAndTasks(id) {
            api('boards/' + id + '/all').then(res => {
                state.lists = res.data.data.lists
                state.tasks = res.data.data.tasks
                //handleEdit(state.lists)
                //handleEdit(state.tasks)
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
        // LISTS
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
        // TASKS
        addTask(task) {
            api.post('tasks/' + task._id, task).then(res => {
                this.getListsAndTasks(task.boardId)
            }).catch(handleError)
        },
        deleteTask(task) {
            api.delete('tasks/'+ task._id).then(res => {
                this.getListsAndTasks(task.boardId)
            }).catch(handleError)
        },
        // USER AUTHENTICATION
        login(email, password) {
            state.isLoading = true
            api.post('http://localhost:3000/login',{
                email:email,
                password:password
            }).then(res => {
                state.activeUser = res.data.data
                this.getBoards()
            }).catch(handleError)
        },
        register(username, email, password) {
            state.isLoading = true
            api.post('http://localhost:3000/register',{
                name:username,
                email:email,
                password:password
            }).then(res => {
                this.login(email, password)
            }).catch(handleError)
        },
        logout() {
            api.delete('http://localhost:3000/logout').then(res => {
                state.activeUser = {}
                this.getBoards()
            }).catch(handleError)
        },
        authenticate() {
            api('http://localhost:3000/authenticate').then(res => {
                if(res.data.data) {
                    state.activeUser = res.data.data
                    this.getBoards()
                }
            }).catch(handleError)
        },
        //EDIT
        editBoard(board) {
            api.put('boards/'+board._id, board).then(res => {
                this.getBoards()
            }).catch(handleError)
        },
        editList(list) {
            api.put('lists/'+list._id, list).then(res => {
                this.getListsAndTasks(list.boardId)
            }).catch(handleError)
        },
        editTask(task) {
            api.put('tasks/'+task._id, task).then(res => {
                this.getListsAndTasks(task.boardId)
            }).catch(handleError)
        }
    }

}


export default boardStore