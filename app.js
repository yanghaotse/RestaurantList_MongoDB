const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({defaultLayout : 'main'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended : true }))

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})


app.get('/',(req,res) => {
  res.send(`happy420`)
})

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})