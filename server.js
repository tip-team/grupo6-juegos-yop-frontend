const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/grupo6-juegos-yop-frontend'));

app.get('/*', function(req,res) {
    
res.sendFile('/dist/grupo6-juegos-yop-frontend/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);