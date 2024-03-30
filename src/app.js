const express = require("express")
const exphbs = require("express-handlebars")
const io = require("./sockets.js")
require("./database.js")
const mainRoutes = require("./routes/main.routes.js")
const session = require ("express-session")
const FileStore = require ("session-file-store")
const fileStore = FileStore (session)

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('*/css',express.static('src/public/css'));
app.use('*/js',express.static('src/public/js'))
app.use(session({
  secret:"secretCoder",
  resave: true,
  saveUninitialized: true
}))


app.engine("handlebars", exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

mainRoutes(app)

app.get("/session", (req,res) => { 
  if (req.session.counter) {
    req.session.counter ++;
    res.send ("You have visited this site " + req.session.counter + " times.");
  } else {
    req.session.counter = 1;
    res.send ("Welcome");
  }
})

const httpServer = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

io(httpServer)