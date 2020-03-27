var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Hotel = require('../models/hotel') 

/* GET home page. */
router.get('/', function(req, res, next) {
  Hotel.aggregate([
    { "$unwind": "$reviews" },
    {
      $group: {
          "_id": "$_id",
          "name": { "$first": "$name" },
          "address": { "$first": "$address" },
          "rating": { "$avg": "$reviews.rating" },
          "count": {$sum:1}
        }
    },
    ], function(err, doc) {
      console.log(doc);
      res.render('index', {
        title: 'Hotels reviews',
        hotels: doc
      });
  });
  
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About the Hotel reviews'
  })
})

// GET: /register => load register form
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register'
  })
})

// GET: /login => load login form
router.get('/login', (req, res, next) => {
  let messages =  []; 
  // pass any messages to login view
  res.render('login', {
    messages: messages,
    title: 'Login'
  })
})



module.exports = router;
