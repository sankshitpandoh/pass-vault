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
    let hashPwd = crypto.createHash('sha1').update(password).digest('hex');
    let exist = false;
    let userId;
    fs.readFile('./data/userInfo.json' , function(err, Data){
        let dataArray = JSON.parse(Data);

        /* Checking if the user exists */
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].userName === uName && dataArray[i].password === hashPwd){
                exist = true;
                userId = dataArray[i].uId
                break;
            }
        }
        if(exist === true){
            let resObj = {
                status : true,
                id : userId
            }
            res.json(resObj);
            // res.send("true");
        }
        else{
            let resObj = {
                status : false
            }
            res.json(resObj);
        }        
    });
})

/* API called when user attempts to signUp */
app.post("/signMeUp", function(req, res){
    let uName = req.body.user;
    let password = req.body.pass;
    let userNameCheck = true;
    fs.readFile('./data/userInfo.json' , function (err, Data){
        let dataArray = JSON.parse(Data);
        /* Checking if userName is not used before */
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].userName === uName){
                userNameCheck = false;
                break;
            }
        }
        if(userNameCheck === false){
            res.send("alreadyUser");
        }
        else{
            let hashPwd = crypto.createHash('sha1').update(password).digest('hex');
            let userObj ={
                userName : uName,
                password : hashPwd,
                uId : makeId(),
                storePasswords : []
            }
            dataArray.push(userObj);
            fs.writeFile("./data/userInfo.json", JSON.stringify(dataArray), function(err){
                if (err) throw err;
                console.log('User was sucessfully registered');
                res.send("success");
            });
        }
    });
})

/* Generates unique id for a user whenever he signsUp */
function makeId(){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < 10; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/* Password processing functionality starts from here */

/* API called when user submits a password */
app.post("/storePassword" , function(req,res){
    /* Storing encrpyed password in variable password */
    let password = encryptPass(req.body);

    /* Storing details in json file */
    fs.readFile('./data/userInfo.json' , function(err, Data){
        let dataArray = JSON.parse(Data);
        for(let i = 1; i < dataArray.length; i++){
            if(dataArray[i].uId === req.body.userId){
                let passObj = {
                    client : req.body.client,
                    password : password
                }
                dataArray[i].storePasswords.push(passObj);
            }
        }
        fs.writeFile("./data/userInfo.json", JSON.stringify(dataArray), function(err){
            if (err) throw err;
            console.log('Password sucessfully added');
            res.send("successfully stored");
        });
    })
    
});

/* function that encrypts user data */
function encryptPass(x){
    
    /* Key used is user ID */
    const key = x.userId;
    let cipher = crypto.createCipher('aes-256-cbc',key);
    let cryptedPass = cipher.update(x.password,'utf8','hex');
    cryptedPass += cipher.final('hex');
    return cryptedPass;
}

    // decrptPass(x, crypted);
// function decrptPass(x , y){
//     const key = x.userId;
//     var decipher = crypto.createDecipher('aes-256-cbc',key)
//     var dec = decipher.update(y,'hex','utf8')
//     dec += decipher.final('utf8')
//     console.log(dec)
// }

/* To do 
uuid for each user to encrpy passwords with
improve homepage layout */