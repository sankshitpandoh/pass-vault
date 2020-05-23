let express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
let app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json({limit: '10mb', extended: true}));

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server .address().port;

    console.log("App running at http://%s:%s" , host, port)
});

/* API called when user attempts to log in */
app.post("/logInAttempt" , function(req,res){
    let uName = req.body.user;
    let password = req.body.pass;
    /* Hashing the password */
    hashPwd = crypto.createHash('sha1').update(password).digest('hex');
    let exist = false;
    fs.readFile('./data/userInfo.json' , function(err, Data){
        let dataArray = JSON.parse(Data);
        /* Checking if the user exists */
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].userName === uName && dataArray[i].password === hashPwd){
                exist = true;
                break;
            }
        }        
    });
    if(exist === true){
        res.send("true");
    }
    else{
        res.send("false");
    }
})