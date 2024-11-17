const config = require('./dbConfig'),
sql = require('mssql');

const getUsers = async(firstname) => {
    try{
        let pool = await sql.connect(config);
        //FirstName = X
        //let users = await pool.request().query(`SELECT * FROM Users WHERE Firstname = '${firstname}'`)

        //Firstname STARTS WITH X
        let users = await pool.request().query(`SELECT * FROM Users WHERE Firstname LIKE '${firstname}%'`)
        console.log(users);
        return users;
    }

    catch(error){
        console.log(error);
    }
}

const createUser = async(User) => {
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query(`INSERT INTO Users VALUES
            (${User.UserID},'${User.Firstname}','${User.Lastname}',${User.Age},'${User.Gender}')
            `)
        console.log(users);

        return users;
    }

    catch(error){
        console.log(error);
    }
}

module.exports = {
    createUser,
    getUsers
}