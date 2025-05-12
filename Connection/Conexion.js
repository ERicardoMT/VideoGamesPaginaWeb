let mysql = require("mysql2");

let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "plataforma_videojuegos"
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a la base de datos');
    }
});

conexion.end();