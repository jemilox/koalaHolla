var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/koalas';
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  //assemble object to send
  pg.connect( connectionString, function (err, client, done) {
    if(err){console.log(err);}
    else{
      console.log('connected to db in /getKoalas');
      var allKoalas = [];
      var queryResults = client.query('SELECT * FROM koalas');
      queryResults.on('row', function (row) {
        allKoalas.push(row);
      });
      console.log('allKoalas', allKoalas);
      queryResults.on('end', function () {
        done();
        return res.json(allKoalas);
      });
    }
  });

});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  console.log('req.body', req.body);
  var name = req.body.name;
  var age = Number(req.body.age);
  var sex = req.body.sex;
  var readyForTransfer = req.body.readyForTransfer;
  var notes = req.body.notes;
  console.log('variables in /addKoala', name, age, sex, readyForTransfer, notes);
  //assemble object to send
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to database');

      client.query('INSERT INTO koalas(name, sex, age, readyfortransfer, notes) VALUES ($1, $2, $3, $4, $5)', [name, sex, age, readyForTransfer, notes]);

      res.send({success: true});
    }

  });

  //send info back to client

});

// edit koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from editKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
