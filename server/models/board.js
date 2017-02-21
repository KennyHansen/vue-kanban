import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name},
  lists: [{ type: ObjectId, ref: models.list }],
  tasks: [{ type: ObjectId, ref: models.task }]
});

// schema.methods.getLists = function(next){ 
//   Lists.find({boardID: this._id})
//   .then()
//   .catch(err => return {err: "No lists found"})
// }

module.exports = mongoose.model(models.board.name, schema);