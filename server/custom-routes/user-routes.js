let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')

export default {
  userBoards: {
    path: '/userboards',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Boards'
      Boards.find({creatorId: req.session.uid})
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userLists: {
    path: '/userlists',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Lists'
      Lists.find({creatorId: req.session.uid})
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userTasks: {
    path: '/usertasks',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Tasks'
      Tasks.find({creatorId: req.session.uid})
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedBoards',
    reqType: 'get',
    method(req, res, next){
      Boards.find({collaborators: { $in: req.session.uid}})
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
    var response = {
      action: action,
      data: data
    }
    if (error) {
      response.error = error
    }
    return response
  }