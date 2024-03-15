// Desafío 4 Backend

const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const { router: productsRouter, newProductManager } = require("./routes/products.router.js");
const { router: cartsRouter } = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

const app = express();
const PORT = 8080;
require("./database.js");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

const MessageModel = require("./models/message.model.js")

const io = new socket.Server(httpServer);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", async (data) => {

    await MessageModel.create(data);

    const messages = await MessageModel.find();
    io.sockets.emit("message", messages)
  })
})