exports.get404 = (req, res) => {
    // console.log("logg")
    // res.status(404).send("Page not found!!")
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        pageTitle: "Page Not Found!!!",
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.get500 = (req, res) => {
    res.status(500).render('500', { 
        pageTitle: "Internal Server Error!!!",
        data: error.message,
        isAuthenticated: req.session.isLoggedIn
    });
}
