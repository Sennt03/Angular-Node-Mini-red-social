const Mensaje = require('../models/mensajes')

var controller = {
    addMensaje: function(req, res){
        let mensaje = new Mensaje()
        let params = req.body
        mensaje.mensaje = params.mensaje
        mensaje.image = params.image
        mensaje.de = params.de
        mensaje.para = params.para
        mensaje.imgDe = params.imgDe
        mensaje.imgPara = params.imgPara

        mensaje.save((err, mensaje) => {
            if(err) return res.status(500).send('Error')
            if(!mensaje) return res.status(404).send('No se envio')
            return res.status(200).send(mensaje)
        })
    },

    getRecibidos: function(req, res){
        let name = req.params.name
        Mensaje.find({para: name}, (err, mensajes) => {
            if(err) return res.status(500).send('Error')
            if(!mensajes) return res.status(404).send('No tienes mensajes')
            return res.status(200).send(mensajes)
        })
    },

    getEnviados: function(req, res){
        let name = req.params.name
        Mensaje.find({de: name}, (err, mensajes) => {
            if(err) return res.status(500).send('Error')
            if(!mensajes) return res.status(404).send('No haz enviado mensajes')
            return res.status(200).send(mensajes)
        })
    },

    deleteMensaje: function(req, res){
        let id = req.params.id
        Mensaje.findByIdAndRemove(id, (err, mensaje) => {
            if(err) return res.status(500).send('Error')
            if(!mensaje) return res.status(404).send('No existe el mensaje')
            return res.status(200).send(mensaje)
        })
    },

    editMensaje: function(req, res){
        let id = req.params.id
        let params = req.body
        Mensaje.findByIdAndUpdate(id, params, (err, mensaje) => {
            if(err) return res.status(500).send('Error')
            if(!mensaje) return res.status(404).send('No existe el mensaje')
            return res.status(200).send(mensaje)
        })
    },

    getMensaje: function(req, res){
        let id = req.params.id
        Mensaje.findById(id, (err, mensaje) => {
            if(err) return res.status(500).send('Error')
            if(!mensaje) return res.status(404).send('No existe el mensaje')
            return res.status(200).send(mensaje)
        })
    }
}

module.exports = controller