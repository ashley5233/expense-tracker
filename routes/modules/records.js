const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//add new record
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  Category.find({ category: { $regex: `${category}`, $options: 'i' } })
    .lean()
    .then(
      record => {
        let categoryIcon = record[0].categoryIcon
        console.log(date)
        return Record.create({
          name: name,
          date: date,
          category: category,
          amount: amount,
          categoryIcon: categoryIcon
        })
          .then(res.redirect('/'))
          .catch(error => console.error(error))
      }
    )
})

//edit 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
    }
    )
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount } = req.body
  const id = req.params.id
  Category.find({ category: { $regex: `${category}`, $options: 'i' } })
    .lean()
    .then(
      record => {
        let categoryIcon = record[0].categoryIcon
        return Record.findById(id)
          .then(record => {
            record.name = name,
              record.date = date,
              record.category = category,
              record.amount = amount,
              record.categoryIcon = categoryIcon
            return record.save()
          })
          .then(res.redirect('/'))
          .catch(error => { console.log(error) })
      }
    )
    .catch(error => console.error(error))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router