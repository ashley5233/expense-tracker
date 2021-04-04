
const Record = require('../record')
const recordList = require('./recordList.json').record
const categoryList = require('./categoryList.json').category

const db = require('../../config/mongoose')


db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  let date = new Date()
  for (let i = 0; i < recordList.length; i++) {
    for (k = 0; k < categoryList.length; k++) {
      if (recordList[i].category === categoryList[k].category) {
        Record.create({
          name: recordList[i].name,
          date: recordList[i].date,
          category: recordList[i].category,
          amount: recordList[i].amount,
          categoryIcon: categoryList[k].categoryIcon
        })
      }
    }
  }
  console.log('Record done!')
})