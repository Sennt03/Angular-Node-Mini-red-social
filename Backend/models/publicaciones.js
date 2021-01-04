const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PublicacionSchema = new Schema({
    user: String,
    userId: String,
    publicacion: String,
    img: String,
    imgPubli: String
})

module.exports = mongoose.model('publicaciones', PublicacionSchema)