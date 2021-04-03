const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoruSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categoruSchema)