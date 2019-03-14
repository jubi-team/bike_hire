const express =  require('express');
const mongodb = require('mongodb')
const mongoURL = "mongodb://localhost:27017";
// const ObjectID = require('mongodb').ObjectID

const router = express.Router()

async function loadBikesCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL, {
        // useNewUrlParser: true
    })
    return client.db('bikes_booking').collection('bikes')
}

async function loadBookingsCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL, {
        // useNewUrlParser: true
    })
    return client.db('bikes_booking').collection('bookings')
}


//Get All Bikes
router.get('/all', async(req, res)=>{
  try{
      const bikes = await loadBikesCollection();
      res.send(await bikes.find({}).toArray())
  }catch(error) {
      console.log(error)
  } 
})

//Get Available Bikes
router.get('/available', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        res.send(await bikes.find({availability: true}).toArray())
    }catch(error) {
        console.log(error)
    } 
  })

//View Bike Info
router.get('/:bikeID', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        res.send(await bikes.find({_id: new mongodb.ObjectID(req.params.bikeID)}).toArray());
    }catch(error) {
        console.log(error)
    }  
})

//add to history and change availability status
router.post('/bike-info/booking', async(req, res)=>{

    try{
        const bookings = await loadBookingsCollection();
        const bikes = await loadBikesCollection();
        const date = new Date(Date.now()).toISOString()
        
        const test1 = await bookings.insertOne({
            firstName: req.body.form.firstName,
            lastName: req.body.form.lastName,
            phone: req.body.form.phone,
            date: date}, 
            function(err, result){
                console.log('err',err)
                console.log('result',result)
                testID = result.lastInsertId
            }
        )

        const test4 = await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},
            {$set: {customer: {
                firstName: req.body.form.firstName,
                lastName: req.body.form.lastName,
                phone: req.body.form.phone,
                date: date
            }}}
        )

        const test3 = await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},
            {$set:{availability: false}}
        )

        Promise.all([test1, test3, test4]).then(function(){
            res.send({ success: true });
        })
    }catch(error) {
        res.send(error)
    }  
})

//add to history and change availability status
router.post('/bike-info/return', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        const test1 = await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},{$set:{availability: true}})
        const test2 = await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},{$unset:{customer: 1}})
        Promise.all([test1, test2]).then(function(){
            res.send({ success: true });
        })
    }catch(error) {
        res.send(error)
    }  
})

// GET BOOKINGS
router.get('/bookings', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        res.send(await bikes.find({}).toArray())
    }catch(error) {
        console.log(error)
    } 
  })

module.exports = router;
