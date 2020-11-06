var express = require('express');
var router = express.Router();
var journeyModel=require('../models/journey')
var usersModel=require('../models/users')

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* GET home page. */
router.get('/homePage', function(req, res, next) {
  
  res.render('homePage', { title: 'Express' });
});



/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Je suis dans ma page Login' });
});

/* GET Home page. */
router.get('/homePage', function(req, res, next) {
  res.render('homePage', { title: 'Je suis dans la page Home' });
});

/* GET basket. */
router.get('/basket', function(req, res, next) {
  console.log('req.session.billet: ', req.session.billet);
  if(!req.session.billet){

  req.session.billet=[]

  req.session.billet.push({
  departure:req.query.departureCity,
  arrival:req.query.arrivalCity,
  time:req.query.tripStart,
  date:req.query.date,
  price:req.query.price
})
}else{
  req.session.billet.push({
    departure:req.query.departureCity,
    arrival:req.query.arrivalCity,
    time:req.query.tripStart,
    date:req.query.date,
    price:req.query.price
  })
} 
var total = 0;
for (var i=0; i<req.session.billet.length; i++){
  total += parseInt(req.session.billet[i].price);
}
console.log("test!!!!!!!!!!:",req.session.billet)
console.log("total:",total)
// console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",billet);
  res.render('basket', { title: 'Je suis dans la page basket', billet:req.session.billet, total});
});

/* GET myLastTrip. */
router.get('/myLastTrip', function(req, res, next) {
  res.render('myLastTrip', { title: 'Je suis dans la page myLastTrip' });
});

/* GET result*/
router.get('/result', function(req, res, next) {

var searchTrip = []

  res.render('result', {searchTrip});
});

/* POST sign-up  */
router.post('/sign-up', async function(req, res, next) {

  var searchUser = await usersModel.findOne({
    email: req.body.email
  });

  if(!searchUser){
    
  var newUser = new usersModel({
    email:req.body.email,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
  })

  var newUserSave = await newUser.save();

  req.session.user = {
    lastName: newUserSave.lastName,
    id: newUserSave._id,
  }

  res.redirect('/homePage')
  }else{
  res.redirect('/');
}});

/* POST sign-in  */
router.post('/sign-in', async function(req, res, next) {

  var searchUser = await usersModel.findOne({
    email: req.body.email,
    password:req.body.password
  })

  if(searchUser!= null){
    req.session.user = {
      lastname: searchUser.lastname,
      id: searchUser._id
    }
    res.redirect('/homePage')
  } else {
    res.render('login', { title: 'Je suis dans la page login' })
  }
});

/*POST homePage*/
router.post("/homePage", async function (req, res, next){
  res.render('result', { title: 'express' })
});

/*POST result*/
router.post("/result", async function (req, res, next){
var departurefront= req.body.departureCity;
var arrivalfront = req.body.arrivalCity;
var datefront = req.body.tripStart;

console.log(departurefront, arrivalfront, datefront)
var searchTrip = await journeyModel.find({
  departure:departurefront,
  arrival:arrivalfront,
  date:datefront
});
console.log(searchTrip)
// console.log(searchTrip.departureTime)
if (searchTrip.length>0){
  console.log('On est passé');
  res.render('result',{title: 'express', searchTrip, datefront})
}else{
  res.redirect('/');
}
  
});

// /*POST basket*/
// router.post("/basket", function (req, res, next){
  // res.render('myLastTrip', { title: 'express' })
// })


module.exports = router;
