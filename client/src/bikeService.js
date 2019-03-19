import axios from 'axios';

const url = 'http://localhost:3000/apis/bikes/';

class bikeService {
    //get bikes

     static bikeTest(){
        return 'daa'
    }

    static name(){
        return 'me';
    }
    static getAllBikes(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + '/all');
                const data = res.data;
                resolve(
                    data.map(bike => ({
                        ...bike,
                        createdAt: new Date(bike.createdAt)
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }

    static getAvailableBikes(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + '/available');
                const data = res.data;
                resolve(
                    data.map(bike => ({
                        ...bike,
                        createdAt: new Date(bike.createdAt)
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }

    static viewBikeDetails(bikeID){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}bike-id/${bikeID}`);
                const data = res.data[0];
                resolve(
                    data
                );
            }catch(err){
                reject(err);
            }
        })  
    }


    static bookBike(bikeID, form, user){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}bike-info/booking`, {
                    bikeID: bikeID,
                    form: form,
                    user: user
                });
                const data = res.data;
                resolve(
                    data
                );
            }catch(err){
                reject(err);
            }
        })  
    }

    static returnBike(bikeID){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}bike-info/return`, {
                    bikeID: bikeID,
                });
                const data = res.data;
                resolve(
                    data
                );
            }catch(err){
                reject(err);
            }
        })  
    }

    static getBookings(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}bookings`);
                const data = res.data;
                resolve(
                    data.map(booking => ({
                        ...booking,
                        // createdAt: new Date(booking.createdAt)
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }

    //Update Bike Info
    static updateBikeDetails(bikeID, updateBikeInfo){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}update-bike-info`, {
                    bikeID: bikeID,
                    updateBikeInfo: updateBikeInfo
                });
                const data = res.data;
                resolve(
                    data
                );
            }catch(err){
                reject(err);
            }
        })  
    }

    //Delete Bike
    static deleteBike(bikeID){
        return axios.delete(`${url}${bikeID}`)  
    }




    static getUsers(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}users`);
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }

    static login(name, password){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}login`, {
                    name: name,
                    password: password
                });
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }
}

export default bikeService;
