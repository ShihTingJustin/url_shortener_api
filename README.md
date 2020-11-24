# URL Shortener API Server
前提條件：
1. 假設服務是一個用戶登入在使用，因此 1 個原始網址只能產生 1 個短網址
## API
* POST /api/urls - create short url
* GET /api/:urls - get original url
#### 👉 [API Doc by Swagger](https://url-shortener-api-server.herokuapp.com/api-docs/#/)

## Setup
1. Install Redis and MongoDB in your computer
2. Clone repository
```
git clone https://github.com/ShihTingJustin/url_shortener_api.git
```
2. Install by NPM
```
npm install
```
3. Use seed data
```
npm run seed
```
4. Start the server
```
npm run start
```
5. Terminal show the message
```
Express is listening on http://localhost:3000
```

## Test
Don't start the server
```
npm test
```

## Stack
* Node.js
* Express.js
* MongoDB
* Redis (cache)
* Mocha (testing)
* Heroku (deployment)

## Authors
[Justin Huang 黃士庭](https://www.linkedin.com/in/justinhuang777/) 
