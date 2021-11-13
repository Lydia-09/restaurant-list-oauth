# My-Restaurant-List

使用 Node.js + Express 製作的餐廳清單，可收集自己喜愛的餐廳名單。

## Features

- 首頁可查看所有餐廳列表及它們的簡單資料
- 首頁可點選個別餐廳，查看餐廳的詳細資訊
- 首頁可搜尋餐廳的「中英文名稱」找到特定餐廳
- 首頁可搜尋餐廳的「類別」找到特定餐廳
- 使用者可以自行新增、修改、刪除餐廳資料
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼(其中 email 與密碼是必填欄位，但名字不是)。
- 使用者可以透過 Facebook Login 直接登入

## Installation and Execution

1. 在終端機輸入指令將此專案 clone 到本機電腦

```
git clone https://github.com/Lydia-09/restaurant-list-oauth.git
```

2. 安裝相關套件

```
cd restaurant-list-oauth
```

```
npm install
```

3. 調整環境變數
- 將 .env.example 更名為 .env
- 將 .env 檔案中 FACEBOOK_ID & FACEBOOK_SECRET 的 SKIP 調整為您的環境變數。
```
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
```

4. 匯入種子資料

```
npm run seed
```

5. 執行程式

```
npm run dev
```

終端機顯示 `App is listening on localhost:3000` 表示啟動完成，請至 http://localhost:3000 使用此專案程式。

## Prerequisites

- Visual Studio Code - Development Environment
- Node.js & npm - JavaScript Runtime Environment
- Express.js - Web Application Framework
- Express-Handlebars - Template Engine
- MongoDB - Document-oriented Database
- Mongoose - MongoDB Object Modeling(ODM)
- body-parser, method-override & bcrypt.js - Middleware
- passport - authentication middleware for Node.js
- Facebook for Developer - get APP_ID & APP_SECRET for passport-facebook
