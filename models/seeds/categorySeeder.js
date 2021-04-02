const mongoose = require('mongoose')
//載入category model
const Category = require('../category')
const categoryList = require('./categoryList.json').category

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  for (let i = 0; i < categoryList.length; i++) {
    Category.create({
      name: categoryList[i].name,
      icon: categoryList[i].icon
    })
  }
  console.log('Category done!')
})