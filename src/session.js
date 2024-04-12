const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const mainSession = (app) => {
  app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://fnadalich:coder018.kva@cluster0.atltqod.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100
    })
  }))
}

module.exports = mainSession