const express = require ("express");
const router = express.Router(); 
const UserModel = require("../models/user.model.js");

//Registro: 

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        //Verificamos si el correo que recibo ya regustadrado en la BD 
        const existUser = await UserModel.findOne({email:email});
        if(existUser) {
            return res.status(400).send("The email address is already registered");
        }
        //Creamos un nuevo usuario: 
        const newUser = await UserModel.create({first_name, last_name, email, password, age});

        //Armamos la session: 
        req.session.login = true;
        req.session.user = {...newUser._doc}
        res.redirect("/profile");

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//Login: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const usuario = await UserModel.findOne({email:email}); 
        if(usuario) {
            if(usuario.password === password) {
                req.session.login = true;
                req.session.user = {
                    email: usuario.email, 
                    age: usuario.age,
                    first_name: usuario.first_name, 
                    last_name: usuario.last_name
                }
                res.redirect("/profile");
            } else {
                res.status(401).send("Not valid password.");
            }

        } else {
            res.status(404).send("Not found user.");
        }
        
    } catch (error) {
        res.status(500).send("Internal server error")
    }

})

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

module.exports = router
