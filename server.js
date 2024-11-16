/*************************************************************************/
//Allows you to include and use external modules or files in your JavaScript code

//Create an express server
const express = require('express');

const dboperation = require('./dbFiles/dbOperation');

//Use CORS to allow front-end and back-end to communicate
const cors = require('cors');
/*************************************************************************/

//Define a port
const API_PORT = process.env.PORT || 5000;

//Start the Server
const app = express();

//Allow the front-end to send over JSON to the back-end
app.use(express.json());
app.use(express.urlencoded());

//Use CORS
app.use(cors());


app.post('/api',async(req,res) => {
    const result = await dboperation.getUsers(req.body.name);
    res.send(result.recordset);
});

app.post('/hello',async(req,res) => {
    await dboperation.createUser(req.body);
    const result = await dboperation.getUsers(req.body.Firstname);
    res.send(result.recordset);
});

app.listen(API_PORT,() => console.log(`Listening on port ${API_PORT}`));