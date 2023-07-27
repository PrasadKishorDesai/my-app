const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const session = require('express-session');

const studentRoutes = require('./routes/studentRoutes');
const adminRoute = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const errorControlller = require('./controllers/error');


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

// const csrf = require('csurf');
// const csrfProtection = csrf();

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false
    })
);

// app.use(csrfProtection);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
})


app.get("/message", (req, res) => {
    console.log()
    res.header("Content-Type", "application/json");
    res.status(200).send({ message: "message from server" });
});

app.use('/api', studentRoutes);   // home page
app.use('/auth', authRoutes);
app.use('/admin', adminRoute);
app.use(studentRoutes)

app.use('*', errorControlller.get404);


app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});
