const mongoose = require('mongoose')
const Record = require('../record')
const recordList = require('./recordList.json').record
const categoryList = require('./categoryList.json').category
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  let date = new Date()
  for (let i = 0; i < recordList.length; i++) {
    for (k = 0; k < categoryList.length; k++) {
      if (recordList[i].category === categoryList[k].name) {
        Record.create({
          name: recordList[i].name,
          date: date,
          category: recordList[i].category,
          amount: recordList[i].amount,
          icon: categoryList[k].icon
        })
      }
    }
  }
  console.log('Record done!')
})