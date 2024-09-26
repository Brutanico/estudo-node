const express = require('express')
const conn = require('./db/conn')

const app = express()

const userRoutes = require('./routes/userRoutes')
const bankAccountRoutes = require('./routes/bankAccountRoutes')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/bankAccount', bankAccountRoutes)

conn
    .sync({force: true})
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))
