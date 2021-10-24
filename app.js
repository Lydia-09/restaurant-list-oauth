// 載入 express, mongoose, body-parser 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list-oauth')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定靜態文件
app.use(express.static('public'))

// 設定首頁路由
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
})

// 路由：新增餐廳  
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 路由：瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：編輯特定餐廳
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 路由：更新特定餐廳
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 路由：刪除特定餐廳
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋設定 : name, name_en, category of restaurants
app.get('/search', (req, res) => {
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

// 在 Express 服務器上啟動和偵聽
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})