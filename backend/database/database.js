const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB is connected successfully...");
    }
    catch(error){
        console.log("Db is facing issue...");
    }
}

module.exports = dbConnect;