const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  //計算總和
  const amount = Record.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ])
  const records = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        categoryIcon: 1
      }
    }
  ])


  Promise.all(([amount, records]))
    .then(([amount, records]) => {
      const totalAmount = amount[0]
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router