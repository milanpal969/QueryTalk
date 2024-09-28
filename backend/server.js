require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const querySolver = require('./dbconnect.cjs');
const generate = require('./geminiTest');



const app = express();
app.use(express.json()); 
app.use(cors({
  origin:"http://localhost:5173"
}));

app.post('/', async (req,res) => {

  try{
    const {database, table, query} = req.body;
    const responseFromAi = await generate({database,query,table});
    const responseFromDb = await querySolver(responseFromAi);
    console.log(responseFromDb);

    res.status(201).send({
      success:true,
      data:responseFromDb,
      message:"successfully fetched"
    })

  }catch(e){
    res.send(501).send({
      success:false,
      error:e.message,
      message:"error while  processing request"

    })
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
