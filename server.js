const express = require('express');
const app = express();
const request = require('request');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// request(`${process.env.API_URL}latest?access_key=${process.env.API_KEY}`,function(error, response, data){
//     if(!error&&response.statusCode==200){
//     console.log(data);
//     app.get('/api/exchange/usd', function(요청, 응답){
//         응답.send(data);
//         })
//     }  
// });

// function intervalFunc(){
//     request(`${process.env.API_URL}latest?access_key=${process.env.API_KEY}`,function(error, response, data){
//         if(!error&&response.statusCode==200){
//         console.log(data);
//         app.get('/api/exchange/usd', function(요청, 응답){
//             응답.send(data);
//             })
//         }  
//     });
// };

// setInterval(intervalFunc, 86400000);

app.get('/', function(req, res){
res.render('index.ejs');
});

app.get('/pit', function(req, res){
    응답.render('pit.ejs');
});

app.get('/vnpit/en', function(req, res){
    res.render('vnpit_en.ejs');
});

app.get('/vnpit', function(req, res){
    res.render('vnpit.ejs');
});

app.listen(process.env.PORT, () => console.log(`listening on port http://localhost:${process.env.PORT}`));