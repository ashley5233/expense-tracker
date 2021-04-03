const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

// create database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Record = require('./models/record')
const Category = require('./models/category')

db.on('error', () => {
  console.log(error)
})
db.once('open', () => {
  console.log('mongodb is connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(
      records =>
        res.render('index', { records })
    )
    .catch(error => console.error(error))
})

//add new record
app.get('/new', (req, res) => {

  res.render('new')
})

app.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  Category.find({ category: { $regex: `${category}`, $options: 'i' } })
    .lean()
    .then(
      record => {
        let categoryIcon = record[0].categoryIcon
        return Record.create({
          name: name,
          date: date,
          category: category,
          amount: amount,
          categoryIcon: categoryIcon
        })
      }
    )
    .then(
      res.redirect('/')
    )
    .catch(error => console.error(error))
})

//edit 
app.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
    }
    )
})

app.post('/:id/edit', (req, res) => {
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
app.get('/:id/delete', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})