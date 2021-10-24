// 載入 express, mongoose, body-parser 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
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
app.use(routes)

// 設定靜態文件
app.use(express.static('public'))

// 在 Express 服務器上啟動和偵聽
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})