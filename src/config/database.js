import { Sequelize } from "sequelize";

const db = new Sequelize('movies', 'root','',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

try{
    await db.authenticate();
    console.log('Conexión a MySQL exitosa mediante PhpMyAdmin.');
} catch (error) {
    console.error('Error al conectar con la base de datos:', error);
}

export default db;
