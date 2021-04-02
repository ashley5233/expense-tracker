const mongoose = require('mongoose')
const Record = require('../record')
const recordList = require('./recordList.json').record
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  let date = new Date()
  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      date: date,
      category: recordList[i].category,
      amount: recordList[i].amount
    })
  }
  console.log('Record done!')
})