const mongoose = require("mongoose")
const Restaurant = require("../restaurant")
const restaurantList = require("../restaurant-list.json").results
if (process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
  for(let i = 0; i < restaurantList.length; i++){
    Restaurant.create({ 
      name: `${restaurantList[i].name}`,
      name_en: `${restaurantList[i].name_en}`,
      category: `${restaurantList[i].category}`,
      image: `${restaurantList[i].image}`,
      location: `${restaurantList[i].location}`,
      phone: `${restaurantList[i].phone}`,
      google_map: `${restaurantList[i].google_map}`,
      rating: `${restaurantList[i].rating}`,
      description: `${restaurantList[i].description}`
    })
  }
  console.log("done.")
})

// const restaurantList = require("../restaurant-list.json").results
// let restaurant = []
// for (let i = 0; i < restaurantList.length; i++){
//   restaurant[i] += `{
//     "name": "${restaurantList[i].name}",
//     "name_en": "${restaurantList[i].name_en}",
//     "category": "${restaurantList[i].category}",
//     "image": "${restaurantList[i].image}",
//     "location": "${restaurantList[i].location}",
//     "phone": "${restaurantList[i].phone}",
//     "google_map": "${restaurantList[i].google_map}",
//     "rating": "${restaurantList[i].rating}",
//     "description": "${restaurantList[i].description}"
//   }`
// }
// console.log(restaurant[2])

// let restaurant = []
// restaurantList.forEach( (item) => {
//   restaurant += `{
//     "name": "${item.name}",
//     "name_en": "${item.name_en}",
//     "category": "${item.category}",
//     "image": "${item.image}",
//     "location": "${item.location}",
//     "phone": "${item.phone}",
//     "google_map": "${item.google_map}",
//     "rating": "${item.rating}",
//     "description": "${item.description}"
//   }`
// })
// console.log(restaurant)


// restaurantList.forEach( (item) => {
// })
// console.log(restaurantList[0].name)
// console.log("=====================================================")


