require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();


app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.get('/api/menu', function(req, res){
    db.any('SELECT * FROM menu')
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          res.json({error: error.message});
      });
});

app.get('/api/purchases', function(req, res){
    db.any('SELECT * FROM purchase')
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          res.json({error: error.message});
      });
});

app.post('/api/purchase', function(req, res){

// {
//   "items": [
//     { "menuId": 1, "quantity": 10 },
//     { "menuId": 2, "quantity": 3 }
//   ]
// }


// But i want it like

// "items": {
//       "1": {
//           "menuId": 1,
//           "quantity": 2
//       },
//       "2": {
//           "menuId": 2,
//           "quantity": 3
//       }
//   }



  const { items } = req.body;
  db.one(`INSERT INTO purchase (created_at) VALUES (NOW()) RETURNING id`)

  .then(function(newPurchase){
      const orderId = newPurchase.id;
      return Promise.all(

        Object.values(items).map(item => {
          return db.none(`INSERT INTO menu_purchase (quantity, menu_id, purchase_id) VALUES($1, $2, $3)`, [item.quantity, item.menuId, orderId])
        })
      ).then(() => orderId)

    })
  .then(orderId => {
    res.json({orderId: orderId});
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})





app.get('/', function(req, res){
  res.render('index');
});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
