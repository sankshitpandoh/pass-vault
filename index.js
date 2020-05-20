let express = require('express');
const fs = require('fs');
let app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server .address().port;

    console.log("App running at http://%s:%s" , host, port)
});