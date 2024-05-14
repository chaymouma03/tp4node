const mongoose = require('mongoose');
const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/tp4');
        console.log("Database connected successfully !")
    }catch(err){
        console.log(err)
    }
}

module.exports = connect;