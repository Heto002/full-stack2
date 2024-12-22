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
    const result = await dboperation.getSQLRecords(req.body.table, req.body.field_name,req.body.field_value);
    res.send(result.recordset);
});

app.post('/hello',async(req,res) => {
    var obj = {};

    for(key in req.body){
        if(key != "table"){
            obj[key] = {
                "field_name":key,
                "field_value":req.body[key],
                "field_type":typeof(req.body[key]),
            }
        }
    }

    const result = await dboperation.createSQLRecord(req.body.table, obj);
    //Output: {"recordsets":[],"output":{},"rowsAffected":[1]}
    if(result == 1)
        res.send({response:"Successful"});

    else
        res.send({response:"Unsuccessful"});
});

app.listen(API_PORT,() => console.log(`Listening on port ${API_PORT}`));