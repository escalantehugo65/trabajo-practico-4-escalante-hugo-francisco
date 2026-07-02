import express from 'express';
import db from './src/config/database.js';
import Movie from './src/models/movie.model.js';
const app = express();

app.use(express.json());

const PORT = 3000;

app.get ('/', (req, res) =>{
res.send('Servidor Funcionando')
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

db.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas en PhpMyAdmin.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar las tablas:', error);
    });