const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const seedData = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list-oauth')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  seedData.results.forEach((item) => {
    Restaurant.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })

  console.log('Seed data created done! Ctrl+C to Exit.')
})