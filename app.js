const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const swaggerDoc = require('./swagger/swaggerDoc')
const cors = require('cors')
const methodOverride = require('method-override')
require('./config/mongoose')
require('./redis/config')
require('./redis/cacheHelpers').createUrlCache()
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(routes)
swaggerDoc(app)

var server = require("http").createServer(app);
var socket = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'http://localhost:8080',
    methods: ["GET", "POST"],
    credentials: true
  }
});

socket.on("connection", (socket) => {
  if (socket.connected) {
    console.log("[socket] client is connected");
    //socket.emit("shortUrlClick", { shortUrlClick: 63, id: "6052eb3d13941a4871603fcd"});
  }
  socket.on("connect", () => {
    console.log("client is connected");
  });
  socket.on("disconnect", () => {
    console.log("client is disconnected");
  });
})

server.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})

module.exports = app