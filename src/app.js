const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 5000
 
app.use(morgan('combined'))


app.get('/', function(req, res){
    res.send('Hello!!!')
})



app.listen(port)