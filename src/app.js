const express = require('express')
const app = express()
const port = 5000



app.get('/', function(req, res){
    res.send('Hello!!!')
})


app.listen(port)