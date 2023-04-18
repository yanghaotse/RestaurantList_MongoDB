const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended : true })) //body-parser
app.use(express.static('public')) //使用靜態檔案


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





app.get('/',(req, res) => {
  // res.render("index")
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

//new 頁面路由
app.get('/restaurants/new', (req, res) => {
  return res.render("new")
})


// 新增 post路由
app.post('/restaurants', (req, res) => {
  const bodyParser = req.body
  // console.log(bodyParser)
  return Restaurant.create( {
    name: bodyParser.name,
    name_en: bodyParser.name_en,
    category: bodyParser.category,
    image: bodyParser.image,
    location: bodyParser.location,
    phone: bodyParser.phone,
    google_map: bodyParser.google_map,
    rating: bodyParser.rating,
    description: bodyParser.description
  })
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))

})

app.get('/restaurants/:_id/detail', (req,res) => {
  const id = req.params._id
  // console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("detail", { restaurants }))
    .catch(error => console.log(error))
})




app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})