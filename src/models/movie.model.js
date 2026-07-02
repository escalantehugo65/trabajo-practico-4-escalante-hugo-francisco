import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Movie = db.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT, 
        allowNull: true      
    }
}, {
 timestamps: true});

export default Movie;