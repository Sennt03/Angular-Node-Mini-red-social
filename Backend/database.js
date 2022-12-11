const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.URI_DB, { useNewUrlParser: true,  useUnifiedTopology: true })
        .then(() => {
            console.log('Conexion a BBDD establecida')
        })
        .catch((err) => {
            console.log(err)
        })

module.exports = mongoose