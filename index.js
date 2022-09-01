let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;

//middleware (supporting lib)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
// 1.D
app.get('/', (req, res) => {
    res.send('Express Server default')
});
// 2.D
app.get('/items/:collections', (req, res) => {
    db.collection(req.params.collections).find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 3.D
app.get('/location', (req, res) => {
    db.collection('location').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 4.D
app.get('/mealtype', (req, res) => {
    db.collection('mealtypes').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 5.D
app.get('/restaurants', (req, res) => {
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    let query = {}
    if (stateId && mealId) {
        query = { state_id: stateId, 'mealTypes.mealtype_id': mealId }
    } else if (stateId) {
        query = { state_id: stateId }
    } else if (mealId) {
        query = { 'mealTypes.mealtype_id': mealId }
    }
    db.collection('restaurantdata').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 6.D
app.get(`/filter/:mealId`, (req, res) => {
    let sort = { cost: 1 }
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    let query = {}
    if (req.query.sort) {
        sort = { cost: req.query.sort }
    }

    if (lcost && hcost && cuisineId) {
        query = {
            "mealTypes.mealtype_id": mealId,
            $and: [{ cost: { $gt: lcost, $lt: hcost } }],
            "cuisines.cuisine_id": cuisineId
        }
    } else if (lcost && hcost) {
        query = {
            "mealTypes.mealtype_id": mealId,
            $and: [{ cost: { $gt: lcost, $lt: hcost } }]
        }
    } else if (cuisineId) {
        query = {
            "mealTypes.mealtype_id": mealId,
            "cuisines.cuisine_id": cuisineId
        }
    } else {
        query = {
            "mealTypes.mealtype_id": mealId
        }
    }
    db.collection('restaurantdata').find(query).sort(sort).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

// app.get('/details/:id',(req,res) => {
//   let id = mongo.ObjectId(req.params.id)
//   db.collection('restaurants').find({_id:id}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })
// 7. D
app.get('/details/:id', (req, res) => {
    let id = Number(req.params.id)
    db.collection('restaurantdata').find({ restaurant_id: id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 8.D
app.get('/menu/:id', (req, res) => {
    let id = Number(req.params.id)
    db.collection('restaurantmenu').find({ restaurant_id: id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// 9. D
app.get('/orders', (req, res) => {
    let email = req.query.email;
    let query = {}
    if (email) {
        //query = {email:email}
        query = { email }
    }
    db.collection('orders').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});
// 10. D
//menu on basis user selected ids
app.post('/menuItem', (req, res) => {
    if (Array.isArray(req.body)) {
        db.collection('restaurantmenu').find({ menu_id: { $in: req.body } }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        })
    } else {
        res.send('Invalid Input');
    }
});
// 11. D
app.post('/placeOrder', (req, res) => {
    console.log(req.body)
    db.collection('orders').insertMany(req.body, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// 12.  D
app.put('/updateOrder/:id', (req, res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne({ orderId: oid }, {
        $set: {
            "status": req.body.status,
            "bank_name": req.body.bank_name,
            "date": req.body.date
        }
    }, (err, result) => {
        if (err) throw err;
        res.send('Order Updated')
    });
});
// 13. D
app.delete('/deleteOrder/:id', (req, res) => {
    let oid = mongo.ObjectId(req.params.id)
    db.collection('orders').remove({ _id: oid }, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error While Connecting`);
    db = client.db('restaurantdata');
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Express Server listening on port ${port}`)
    });
});


/*
app.get('/restaurants/:id',(req,res) => {
  let id = req.params.id;
  let state = req.query.state
  let country  = req.query.country
  console.log(`>>>>>state>>>`,state)
  console.log(`>>>>>country>>>`,country)
  res.send(id)

  // db.collection('restaurants').find().toArray((err,result) => {
  //   if(err) throw err;
  //   res.send(result)
  // })
})
*/