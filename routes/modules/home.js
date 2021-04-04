const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  //計算總和
  const amount = Record.aggregate([{
    $group: {
      _id: null,
      total: {
        $sum: "$amount"
      }
    }
  }])
  Promise.all(([amount]))
    .then(([amount]) => {
      const totalAmount = amount[0].total
      Record.find()
        .lean()
        .then(
          records =>
            res.render('index', { records, totalAmount })
        )
    })
    .catch(error => console.log(error))
})

module.exports = router