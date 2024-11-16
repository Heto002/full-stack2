const config = {
    user: 'SQLTutorialLogin',
    password:'foo',
    server:'WIN-U8NBIPGABCR',
    database:'SQL Tutorial',
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort:true,
        instancename:'SQLEXPRESS'
    },
    port:1433
}


module.exports = config;