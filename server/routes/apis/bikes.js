const express =  require('express');
const mongodb = require('mongodb')
const mongoURL = "mongodb://localhost:27017";

const router = express.Router()

async function loadMembersCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL, {
        useNewUrlParser: true
    })
    return client.db('bikeBooking').collection('bikes')
}


//Get All Bikes
router.get('/', async(req, res)=>{
  try{
      const bikes = await loadMembersCollection();
      res.send(await bikes.find({}).toArray())
  }catch(error) {
      console.log(error)
  } 
})

//View Bike Info
router.get('/:bikeID', async(req, res)=>{
    console.log(req)
    try{
        const bikes = await loadMembersCollection();
        res.send(await bikes.find({_id: new mongodb.ObjectID(req.params.bikeID)}).toArray());
    }catch(error) {
        console.log(error)
    }  
})



module.exports = router;