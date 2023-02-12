const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 5000;

// Set Templating Enginge
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.get('/register', (req, res)=> {
    res.render('register')
})

app.post('/register', [
    check("username")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet"),
    check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
], (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
       const alert = errors.array()
        res.render('register', {
            alert
        })
    }

})

app.listen(port, () => console.log(`App listening on port: ${port}`))