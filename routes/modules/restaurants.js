const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 路由：新增餐廳  
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/?sort=id'))
    .catch(error => console.log(error))
})

// 路由：瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：編輯特定餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：更新特定餐廳
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 路由：刪除特定餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router