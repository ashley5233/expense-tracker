const express = require('express')
const app = express()
const Record = require('./models/record')

app.get('/filter', (req, res) => {
  const home = req.body.home
  Record.aggregate([
    {
      $group: {
        totalAmount: { $sum: "amount" }
      }
    }
  ])
    .lean()
    .then(
      console.log(totalAmount)
    )
  res.render('/')
})