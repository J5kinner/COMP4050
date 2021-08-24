//Express server intitiation 
const express = require('express') 
const cors = require('cors')
const apiRouter = require("./controllers/api")


const app = express() 
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'))
app.use(apiRouter)

module.exports = app
