const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const seedData = require('./restaurant.json').results
const User = require('../user')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    seedData_index: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    seedData_index: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const restaurant = []
          Array.from(seedUser.seedData_index, index => {
            seedData[index].userId = userId
            restaurant.push(seedData[index])
          })
          return Restaurant.create(restaurant)
        })
    }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})