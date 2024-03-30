const express = require("express")
const session = require("express-session");
//const FileStore = require("session-file-store")(session);
const MongoStore = require("connect-mongo");
const exphbs = require("express-handlebars");
const io = require("./sockets.js")
require("./database.js")
const mainRoutes = require("./routes/main.routes.js")


const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('*/css',express.static('src/public/css'));
app.use('*/js',express.static('src/public/js'))



app.engine("handlebars", exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use(session({
  secret:"secretCoder",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://fnadalich:coder018.kva@cluster0.atltqod.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
})
}))

mainRoutes(app)

const httpServer = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

io(httpServer)