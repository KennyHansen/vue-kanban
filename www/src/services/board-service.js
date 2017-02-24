let boards = [
    {
        name: "A fake board",
        lists:[{
            name:'A fake list', 
            tasks:[{
                name:'A fake task'
            }]
        }]
    },
    {
        name: "Another fake board",
        lists:[]
    },
    {
        name: "A third fake board",
        lists:[]
    }
]

let boardService = {
    getSomeFakeBoards() {
        return boards
    },
    addFakeBoard(boardName) {
        boards.push({ name: boardName, lists: []})
        console.log('New board added')
    },
    getFakeLists(boardName) {
        var index = boards.findIndex(name => {
            return name.name === boardName
        })
        return boards[index].lists
    },
    getFakeTasks(boardName, listName) {
        var index = boards.findIndex(name => {
            return name.name === boardName
        })
        console.log(boards[index])
        var listIndex = boards[index].lists.findIndex(name => {
            return name.name === listName
        })
        
        return boards[index].lists[listIndex].tasks
         
    }
}

export default boardService;