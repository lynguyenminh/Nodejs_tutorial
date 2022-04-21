const express = require('express')
const morgan = require('morgan')


const {engine} = require('express-handlebars');

const app = express()
const port = 5000
 
app.use(morgan('combined'))


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', function(req, res){
    res.render('home')
})



app.listen(port)