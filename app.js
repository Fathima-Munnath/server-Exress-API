const express= require('express')
const app= express()
const movieRouter = require('./routes/movieRoutes')

app.use(express.json())
app.use('/movies',movieRouter)

app.get ('/',(req,res)=>{
    res.send("Hello")
})

app.listen(3000,()=>{
    console.log("Server started")
})