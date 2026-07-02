import express from 'express';
import db from './src/config/database.js';
const app = express();

app.use(express.json());

const PORT = 3000;

app.get ('/', (req, res) =>{
res.send('Servidor Funcionando')
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})