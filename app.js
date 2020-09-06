const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const passport = require ('passport')
const session = require ('express-session')
const MongoStore = require('connect-mongo')(session)
const login = require('./routes/login')
const auth = require('./routes/auth')

//Load config
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

connectDB()

const app = express()


//Logging with Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//sessions middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use(login)
app.use(auth)

const PORT = process.env.PORT || 3000

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)