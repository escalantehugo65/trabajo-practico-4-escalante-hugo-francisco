import express from 'express';
import db from './src/config/database.js';
import Movie from './src/models/movie.model.js';
import movieRoutes from './src/routes/movie.routes.js';

const app = express();

app.use(express.json());

app.use('/api/movies', movieRoutes);

const PORT = 3000;

app.get ('/', (req, res) =>{
res.send('Servidor Funcionando')
});


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