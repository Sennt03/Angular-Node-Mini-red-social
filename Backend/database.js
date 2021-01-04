const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Sennt', { useNewUrlParser: true,  useUnifiedTopology: true })
        .then(() => {
            console.log('Conexion a BBDD establecida')
        })
        .catch((err) => {
            console.log(err)
        })

module.exports = mongoose