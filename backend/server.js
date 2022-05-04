const express=require('express')
const colors=require('colors')
const {errorHandler}=require('./middleware/errorMiddleware')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')
const port=process.env.PORT||4000

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))


app.use(errorHandler)
//woah
app.listen(port,() => console.log(`server running on ${port}`));