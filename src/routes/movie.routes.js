import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Prueba: Listar todas las películas');
});

router.get(`/:id`, (req, res) => {
    res.send(`Prueba: Obtener película con ID ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Prueba: Crear una película');
});

router.put(`/:id`, (req, res) => {
    res.send(`Prueba: Actualizar película con ID ${req.params.id}`);
});

router.delete(`/:id`, (req, res) => {
    res.send(`Prueba: Eliminar película con ID ${req.params.id}`);
});

export default router;