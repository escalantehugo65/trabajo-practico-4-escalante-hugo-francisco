import Movie from '../models/movie.model.js';

// 1. Obtener todas las películas
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
    }
};

// 2. Obtener una película por ID
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la película', error: error.message });
    }
};

// 3. Crear una nueva película (Con todas las validaciones)
export const createMovie = async (req, res) => {
    try {
        const { title, genre, duration, year, synopsis } = req.body;

        // Validación: Campos obligatorios vacíos o ausentes
        if (!title || !genre || !duration || !year || String(title).trim() === '' || String(genre).trim() === '') {
            return res.status(400).json({ message: 'Los campos title, genre, duration y year son obligatorios y no pueden estar vacíos.' });
        }

        // Validación: duration válida (entero mayor a 0)
        if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({ message: 'La duración debe ser un número entero mayor a 0.' });
        }

        // Validación: year válido (entero, 4 dígitos, entre 1888 y el año actual)
        const currentYear = new Date().getFullYear();
        if (typeof year !== 'number' || !Number.isInteger(year) || year < 1888 || year > currentYear || String(year).length !== 4) {
            return res.status(400).json({ message: `El año debe ser un número entero de 4 dígitos entre 1888 y el año actual (${currentYear}).` });
        }

        // Validación: synopsis (si viene, debe ser string)
        if (synopsis && typeof synopsis !== 'string') {
            return res.status(400).json({ message: 'La sinopsis debe ser una cadena de texto.' });
        }

        // Validación: Unicidad del título
        const existingMovie = await Movie.findOne({ where: { title } });
        if (existingMovie) {
            return res.status(400).json({ message: 'El título de la película ya está registrado.' });
        }

        // Si pasa todo, se crea
        const newMovie = await Movie.create({ title, genre, duration, year, synopsis });
        return res.status(201).json(newMovie);

    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la película', error: error.message });
    }
};

// 4. Actualizar una película existente
export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, duration, year, synopsis } = req.body;

        // Verificar si la película existe
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        // Validación: Campos obligatorios si se envían vacíos
        if (!title || !genre || !duration || !year || String(title).trim() === '' || String(genre).trim() === '') {
            return res.status(400).json({ message: 'Los campos title, genre, duration y year son obligatorios.' });
        }

        // Validación: duration válida
        if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({ message: 'La duración debe ser un número entero mayor a 0.' });
        }

        // Validación: year válido
        const currentYear = new Date().getFullYear();
        if (typeof year !== 'number' || !Number.isInteger(year) || year < 1888 || year > currentYear || String(year).length !== 4) {
            return res.status(400).json({ message: `El año debe ser un número entero de 4 dígitos entre 1888 y el año actual (${currentYear}).` });
        }

        // Validación: synopsis
        if (synopsis && typeof synopsis !== 'string') {
            return res.status(400).json({ message: 'La sinopsis debe ser una cadena de texto.' });
        }

        // Validación: Unicidad del título (excluyendo la película actual)
        if (title !== movie.title) {
            const existingMovie = await Movie.findOne({ where: { title } });
            if (existingMovie) {
                return res.status(400).json({ message: 'El nuevo título ya pertenece a otra película registrada.' });
            }
        }

        // Si pasa todo, se actualiza
        await movie.update({ title, genre, duration, year, synopsis });
        return res.status(200).json(movie);

    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
    }
};

// 5. Eliminar una película
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        await movie.destroy();
        return res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
    }
};