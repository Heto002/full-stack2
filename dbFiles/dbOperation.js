const config = require('./dbConfig'),
sql = require('mssql');

const getSQLRecords = async(table,fieldName,fieldValue) => {
    try{
        let pool = await sql.connect(config);
        let records = await pool.request().query(`SELECT * FROM ${table} WHERE ${fieldName} LIKE '${fieldValue}%'`)
        return records;
    }

    catch(error){
        console.log(error);
    }
}

const createSQLRecord = async(table,fieldsObj) => {
    try{
        let pool = await sql.connect(config);
        var fieldValuesArr= [];
        var fieldNamesArr = [];

        for(key in fieldsObj){

            if(fieldsObj[key]['field_type'] == "string"){
                fieldValuesArr.push("'" + fieldsObj[key]['field_value'] + "'");
            }
            else
                fieldValuesArr.push(fieldsObj[key]['field_value']);

            fieldNamesArr.push(fieldsObj[key]['field_name'])
        }


        let record = await pool.request().query(`INSERT INTO ${table} (${fieldNamesArr.toString()}) VALUES(` + fieldValuesArr.toString() + `)`);
        
        //Sample Output: {"recordsets":[],"output":{},"rowsAffected":[1]}
        return record.rowsAffected;
    }

    catch(error){
        console.log(error);
    }
}

module.exports = {
    createSQLRecord,
    getSQLRecords
}