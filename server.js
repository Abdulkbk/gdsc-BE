// Importing Express
const express = require('express')

// Set the PORT: http://localhost:8000/
const port = 8000

// Initializing express app/server
const app = express()

// Server configurations
app.use(express.json()) // Tell our server to convert request object to JSON
app.use(express.urlencoded({ extended: false })) // Tell our server to convert request object to JSON for form

// Setting up the view engine to server static file e.g HTML files
app.set('view engine', 'ejs')

// Define  Routes
// GET: to get something from the server
// POST: sending data to your server
// PUT: updating data
// DELETE: to delete info

// GET request
app.get('/', (req, res) => {
  res.send('Request successfull')
})

// POST request
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

// GET request: get all products from the database
app.get('/products', (req, res) => {
  res.send(PRODUCTS)
})

// GET request: get a specific item from the db using its ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id

  const product = PRODUCTS.filter(element => {
    return element.id == id
  })

  res.send(product)
})

// POST request: add a product to the database
app.post('/products/add', (req, res) => {
  const newId = PRODUCTS.slice(-1)[0].id + 1

  const product = req.body
  product.id = newId

  PRODUCTS.push(product)

  res.send(product)
})

// GET request: Send back HTML Files
app.get('/home', (req, res) => {
  res.render('home.ejs')
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
