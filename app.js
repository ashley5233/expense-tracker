const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

app.get('/', (req, res) => {
  console.log(Category)
  Record.find()
    .lean()
    .then(
      records => res.render('index', { records })
    )
    .catch(error => console.error(error))
})

//add new record
app.get('/new', (req, res) => {

  res.render('new')
})

app.post('/new', (req, res) => {

  const { name, date, category, amount } = req.body
  return Record.create({
    name: name,
    date: date,
    category: category,
    amount: amount
  })
    .then(
      res.redirect('/')
    )
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})