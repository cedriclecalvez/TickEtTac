var express = require('express');
var router = express.Router();
var journeyModel=require('../models/journey')
var usersModel=require('../models/users')

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



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
  res.render('basket', { title: 'Je suis dans la page basket' });
});

/* GET myLastTrip. */
router.get('/myLastTrip', function(req, res, next) {
  res.render('myLastTrip', { title: 'Je suis dans la page myLastTrip' });
});

/* GET result*/
router.get('/result', function(req, res, next) {
  res.render('result', { title: 'Express' });
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
console.log(req.session.user)
  res.redirect('/homePage')
  }else{
  res.redirect('/homePage');
}});

/* POST sign-up  */
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
router.post("/homePage"), async function (req, res, next){
var searchTrip= await journeyModel.find()
for (var i=0; i<searchTrip.length; i++)
if(searchTrip[i].departiture === req.body.departitureCity && searchTrip[i].arrival === req.body.arrivalCity)
console.log(searchTrip)
  res.render('result', { title: 'express' })
};

/*POST result*/
router.post("/result"), function (req, res, next){
  res.render('basket', { title: 'express' })
}

/*POST basket*/
router.post("/basket"), function (req, res, next){
  res.render('myLastTrip', { title: 'express' })
}


module.exports = router;
