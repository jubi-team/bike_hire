const express =  require('express');
const multer = require('multer');
const mongodb = require('mongodb')
const mongoURL = "mongodb://localhost:27017";

const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '../../../.././client/src/uploads/')
    },
    filename: function (req, file, cb) {
        var fileType = file.mimetype
        let imageType;
        if( fileType === 'image/jpeg'){
            imageType = fileType.slice(6,10);
        } else {
            imageType = fileType.slice(6,9);
        }
        
      cb(null, Date.now() + '.' + imageType) //Appending mimetype
    }
})

const uploading = multer({ storage: storage });

//get bikes collection from mongo database
async function loadBikesCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL)
    return client.db('bikes_booking').collection('bikes')
}

//get bookings collection from mongo database
async function loadBookingsCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL)
    return client.db('bikes_booking').collection('bookings')
}

async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect(mongoURL)
    return client.db('bikes_booking').collection('users')
}

//add bike + image to database
router.post("/upload", uploading.single('image'), async ( req, res )=> {
    let imageUrl = req.file.filename;
    try {
        const bikes = await loadBikesCollection();

        let bikeDetails = req.body;
        let bikeName = bikeDetails.name;
        let bikeDescription = bikeDetails.description;
        let bikePrice = bikeDetails.price;
        let bikeType = bikeDetails.type;
        let bikeAvailability = bikeDetails.availability;
            
        res.send(await bikes.insertOne({
            name:bikeName, description:bikeDescription, image: imageUrl, price: bikePrice, type: bikeType, availability:bikeAvailability
        }))

        res.status(200).send();
    }catch(error){
        console.log(error)
    }
})

//Update Bike Details
router.post('/update-bike-info', async(req, res)=>{
    try{
        const bikes = await loadBikesCollection();
        res.send(await bikes.updateOne({_id: new mongodb.ObjectID(req.body.bikeID)},{$set:{name: req.body.updateBikeInfo.name, description: req.body.updateBikeInfo.description, availability: req.body.updateBikeInfo.availability, price: req.body.updateBikeInfo.price, type: req.body.updateBikeInfo.type }}))
    }catch(error) {
        res.send(error)
    }  
})

//Delete Bikes
router.delete('/:id', async (req,res) =>{
    try {
        const bikes = await loadBikesCollection();
        await bikes.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();
    }catch(error){
        console.log(error)
    }
});

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
router.get('/bike-id/:bikeID', async(req, res)=>{
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

// Get bike booked
router.get('/bookings', async(req, res)=>{
    try{
        const bookings = await loadBookingsCollection();
        res.send(await bookings.find({}).toArray())
    }catch(error) {
        console.log(error)
    } 
})

//View Bike Info
router.get('/users', async(req, res)=>{
    try{
        const users = await loadUsersCollection();
        res.send(await users.find({name: req.body.name, password: req.body.password}).toArray())
        // res.send(await users.find({_id: new mongodb.ObjectID(req.body.bikeID)},{$set:{name: req.body.updateBikeInfo.name, description: req.body.updateBikeInfo.description, availability: req.body.updateBikeInfo.availability, price: req.body.updateBikeInfo.price, type: req.body.updateBikeInfo.type }}))
    }catch(error) {
        res.send(error)
    }  

    // try{
    //     const bikes = await loadBikesCollection();
    //     res.send(await bikes.find({_id: new mongodb.ObjectID(req.params.bikeID)}).toArray());
    // }catch(error) {
    //     console.log(error)
    // }  
})


router.post('/login', async(req, res)=>{
    try{
        const users = await loadUsersCollection();
        res.send(await users.find({name: req.body.name, password: req.body.password}).toArray())
        // res.send(await users.find({_id: new mongodb.ObjectID(req.body.bikeID)},{$set:{name: req.body.updateBikeInfo.name, description: req.body.updateBikeInfo.description, availability: req.body.updateBikeInfo.availability, price: req.body.updateBikeInfo.price, type: req.body.updateBikeInfo.type }}))
    }catch(error) {
        res.send(error)
    }  
})


module.exports = router;
