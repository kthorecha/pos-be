const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const db = require('./dbConnect');
const products = require('./routes/Products.route');
const productCategory = require('./routes/ProductCategory.route');
const users = require('./routes/Users.route');
const userRole = require('./routes/UserRoles.route');

// require('./config/passport')(passport);
require('dotenv').config();

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());
app.use(cookieParser());

const expressSession = session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
});

// passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use(expressSession);

app.use((req, res, next) => {
    console.log(req.path);
    next();
})

app.use('/product', products);
app.use('/product-category', productCategory);
app.use('/users', users);
app.use('/users-role', userRole);

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))