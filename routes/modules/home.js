// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
})

// 搜尋設定 : name, name_en, category of restaurants
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().replace(/\s+/g, '')
  Restaurant.find()
  .lean()
  .then( allRestaurants => {
   const restaurants = allRestaurants.filter ( item => {
     return item.name.toLowerCase().includes(keyword) || item.name_en.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
   })
   
  if ( keyword.trim() !== '' ) {
      res.render('index', { restaurants, keyword})
    } else {
      const emptyText = 'Invalid Value'
      console.log(`輸入值為空白鍵: ${emptyText}`)
      res.render('index', {emptyText})
    }
  })
  .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router