const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 路由：新增餐廳  
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description, website} = req.body
  const userId = req.user._id
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, website, userId })
    .then(() => res.redirect('/?sort=id'))
    .catch(error => console.log(error))
})

// 路由：瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：編輯特定餐廳
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：更新特定餐廳
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findByIdAndUpdate({ _id, userId }, { $set: req.body })
    .then(()=> res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 路由：刪除特定餐廳
router.delete('/:id', (req, res) => {
   const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router