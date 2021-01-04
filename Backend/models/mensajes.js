const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MensajeSchema = new Schema({
        mensaje: String,
        image: String,
        de: String,
        para: String,
        imgDe: String,
        imgPara: String
})

module.exports = mongoose.model('mensajes', MensajeSchema)