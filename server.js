const express = require('express')

const port = 8000

const app = express()

// Configs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// Create routes

app.get('/', (req, res) => {
  res.send('Request successfull')
})

app.post('/adduser', (req, res) => {
  const data = req.body
  console.log(data)
  res.send(data)
})

// Mimic a DB
const PRODUCTS = [
  { id: 1, name: 'apple', prize: 30.0 },
  { id: 2, name: 'orange', prize: 20.0 },
]

app.get('/products', (req, res) => {
  res.send(PRODUCTS)
})

app.get('/products/:id', (req, res) => {
  const id = req.params.id

  const product = PRODUCTS.filter(element => {
    return element.id == id
  })

  res.send(product)
})

app.post('/products/add', (req, res) => {
  const newId = PRODUCTS.slice(-1)[0].id + 1

  const product = req.body
  product.id = newId

  PRODUCTS.push(product)

  res.send(product)
})

// Sending back HTML Files
app.get('/home', (req, res) => {
  res.render('home.ejs')
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
