import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    created: { type: Number, default: Date.now() },
    comments: [{ type: ObjectId, ref: models.comment }],
    // Relations
    listId: { type: ObjectId, ref: models.list, required: true },
    boardId: { type: ObjectId, ref: models.board, required: true },
    creatorId: { type: ObjectId, ref: models.user.name }
});


schema.post('save', function () {

})

module.exports = mongoose.model(models.task.name, schema);