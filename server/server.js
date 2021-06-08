const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

// Import routes
const register = require('./routes/register')
const product = require('./routes/product')
const site = require('./routes/site')

// .env
require('dotenv').config()

// connect to DB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('\x1b[32m', 'Connected to DB successfully')
)

mongoose.set('useFindAndModify', false)

// GLOBAL Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes Middlewares

// USERS
app.use('/api/users', register)
// PRODUCTS
app.use('/api/product', product)
// SITES
app.use('/api/site', site)

const port = process.env.PORT || 3002

app.listen(port, () => console.log(`Server Up and runnig at ${port}`))
