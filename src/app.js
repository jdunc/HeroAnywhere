const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8080 || process.env.port;
var GoogleAuth = require('google-auth-library');

const app = express();

app.use(bodyParser.json());
// need below for vanilla xhr request w/ header 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

app.post('/gplus', (req, res) => {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2('871608634588-qvq8cq3pkn8sr86u24h0c5vrakd36dfs.apps.googleusercontent.com', '', '');
    client.verifyIdToken(
        req.body.idtoken,
        '871608634588-qvq8cq3pkn8sr86u24h0c5vrakd36dfs.apps.googleusercontent.com',
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
            var payload = login.getPayload();
            var userid = payload['sub'];
            // If request specified a G Suite domain:
            //var domain = payload['hd'];
        });
    // TODO: what now?
    console.log(client.getBasicProfile);

    res.send(req.body)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
