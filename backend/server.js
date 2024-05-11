const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/chat",(req,res) =>{
    res.send("Hello World")
})

//Database connection
const dbConnect = require("./database/database");
dbConnect();

// port listening
app.listen(PORT, () =>{
    console.log(`Server is running on port no. ${PORT}`);
});