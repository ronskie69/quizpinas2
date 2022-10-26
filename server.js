const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./api/route')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const port = process.env.PORT || 3002
const DB_URL = process.env.MONGODB_URL || 'mongodb+srv://nogsuu:Sunogan33!@cluster0.uiqs1.mongodb.net/roberts'

app.use('/quizpinas', routes)

app.get('/', (req, res) => {
    res.send("Test")
})

mongoose.connect(DB_URL)
    .then(() => {
        app.listen(port, () => console.log("connected: ", port))
    })
    .catch(err => console.log("error", err))