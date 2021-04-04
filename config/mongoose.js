// create database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})
db.once('open', () => {
  console.log('mongodb is connected!')
})

module.exports = db