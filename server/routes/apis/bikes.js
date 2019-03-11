const express =  require('express');
const mongodb = require('mongodb')
const mongoURL = "mongodb://localhost:27017";

const router = express.Router()

async function loadBikesCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL, {
        // useNewUrlParser: true
    })
    return client.db('bikes_booking').collection('bikes')
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

//Change availability status
router.post('/bike-info', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        res.send(await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},{$push:{booking_history: {firstName: req.body.form.firstName, lastName: req.body.form.lastName, phone: req.body.form.phone, date: new Date(Date.now()).toISOString()}}}))
        res.send(await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},{$set:{availability: false}}))
    }catch(error) {
        res.send(error)
    }  
})

module.exports = router;
