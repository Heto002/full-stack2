const config = require('./dbConfig'),
sql = require('mssql');

const getUsers = async(firstname) => {
    try{
        let pool = await sql.connect(config);
        //FirstName = X
        //let users = await pool.request().query(`SELECT * FROM Users WHERE Firstname = '${firstname}'`)
        console.log("firstname: " + firstname);
        //Firstname STARTS WITH X
        let users = await pool.request().query(`SELECT * FROM Users WHERE first_name LIKE '${firstname}%'`)
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
            (${User.user_id},'${User.first_name}','${User.last_name}',${User.age},'${User.gender}')
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