import axios from 'axios';

const url = 'http://localhost:3000/apis/bikes/';

class bikeService {
    //get bikes
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

    // //add members
    // static addMember(name,skills, background){
    //     return axios.post(url, {
    //         name, 
    //         skills,
    //         background
    //     })
    // }

    // //delete members
    // static deleteMember(id){
    //     return axios.delete(`${url}${id}`)  
    // }

    

    // //view member information
    // static viewBike(bikeID){
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const res = await axios.get(`${url}${bikeID}`);
    //             const data = res.data;
    //             // console.log(data)
    //             resolve(
    //                 data.map(bike => ({
    //                     ...bike,
    //                     createdAt: new Date(bike.createdAt)
    //                 }))
    //             );
    //         }catch(err){
    //             reject(err);
    //         }
    //     })  
    // }


    static viewBikeDetails(bikeID){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${bikeID}`);
                const data = res.data[0];
                resolve(
                    data
                );
            }catch(err){
                reject(err);
            }
        })  
    }


    static bookBike(bikeID, form){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}bike-info/booking`, {
                    bikeID: bikeID,
                    form: form
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
                // resolve(
                //     data.map(booking => ({
                //         ...booking,
                //         // createdAt: new Date(booking.createdAt)
                //     }))
                // );
                // res.send('ÆÆÆÆ')
                // const data = 'drasl'
                resolve(
                    data
                )
            }catch(err){
                // res.send(err)
                reject(err);
            }
        })
    }
}

export default bikeService;
