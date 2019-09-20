var express = require('express');
var app = express();
var router = express.Router()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var dbo

app.use(bodyParser.json());
app.use('/', router);
app.use(bodyParser.urlencoded({
    extended: true
}));


var url = "mongodb://localhost:27017/test";

router.get('/', function (req, res, next) {
        console.log("middleware");
        next();
    }, function(req, res){
   res.send("Hello world!");
});

 router.post('/hello', function(req, res){
    console.log(req.body)
    res.send("You just called the post method at '/hello'!\n");
 });

////////////////////////////////////////////////////////////////////////////////////////

 router.post('/savedetails', function(req, res){
    dbo.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        // res.redirect('/')
      })
 });

 router.get('/showdetails', function(req, res){
    dbo.collection('users').find().toArray((err, result)=>{
        res.send(result)
    })
 });

 router.put('/updatedetails', function(req, res){
    console.log(req.body)
   dbo.collection('users').updateOne({name:"Aniket2"}, {$set:req.body})
   res.send('updated')
});

router.delete('/deleteuser/:id', function(req, res){
   console.log(req.url)
   // console.log(req.params.id)
  dbo.collection('users').deleteOne({id2: `${req.params.id}`})
  res.send('deleted')
});


 MongoClient.connect(url, function(err, db) {
    if (err){ throw err};
    dbo = db.db('test')
    console.log("Database created!");
    // db.close();
  });


app.listen(3000);