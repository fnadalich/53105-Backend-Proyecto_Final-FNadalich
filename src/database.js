const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://fnadalich:coder018.kva@cluster0.atltqod.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then (() => console.log("Succefully connected"))
    .catch ((error) => console.log ("Conection error", error))

    
