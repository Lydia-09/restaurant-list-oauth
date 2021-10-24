const Restaurant = require('../restaurant')
const seedData = require('./restaurant.json')
const db = require('../../config/mongoose')

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