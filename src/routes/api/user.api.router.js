const express = require ("express");
const router = express.Router(); 
const UserModel = require("../../models/user.model.js"); //corrección de tutor, agrego ../ para que funione

//Registro: 
const isAdmin =  (req, res, next) => {
    const { email } = req.body
      if (email && email.endsWith("admin@coder.com")) {
        req.role = "admin"
      }
      next()
    }
  
router.post("/register", isAdmin, async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        const existUser = await UserModel.findOne({email:email});
        if(existUser) {
            return res.status(400).send("The email address is already registered");
        }
        //Creamos un nuevo user: 
        const newUser = await UserModel.create({first_name, last_name, email, password, age, role: req.role});

        //Armamos la session: 
        req.session.login = true;
        req.session.user = {...newUser._doc}
        res.redirect("/products");

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//Login: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try { 
        if (email === "admin@coder.com" && password === "admin1234") {
        req.session.login = true
        req.session.user = {
          email,
          role: "admin"
        }
        return res.redirect("/products")
      }
        const user = await UserModel.findOne({email:email}); 
        if(user) {
            if(user.password === password) {
                req.session.login = true;
                req.session.user = {
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                    age: user.age,
                    role: user.role
                  }
                res.redirect("/products");
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
    res.redirect("/user/login");
})

module.exports = {router}
