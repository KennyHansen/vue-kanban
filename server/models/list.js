import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	boardId: { type: ObjectId, ref: models.board, required: true },
	creatorId: {type: ObjectId, ref: models.user.name },
  	tasks: [{ type: ObjectId, ref: models.task }]
});


schema.post('save', function() {

})

module.exports = mongoose.model(models.list.name, schema);