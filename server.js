const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
app.use(compression());

var oneYear = 60 * 1000 * 60 * 24 * 365;
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist', { maxAge: oneYear }));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);