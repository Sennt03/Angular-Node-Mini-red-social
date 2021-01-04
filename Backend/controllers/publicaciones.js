const Publicacion = require('../models/publicaciones')

var controller = {

    addPublication: function(req, res){
        let publicacion = new Publicacion()
        let params = req.body

        publicacion.userId = params.userId
        publicacion.user = params.user
        publicacion.publicacion = params.publicacion
        publicacion.img = params.img
        publicacion.imgPubli = params.imgPubli

        publicacion.save((err, publicacion) => {
            if(err) return res.status(500).send('Error')
            if(!publicacion) return res.status(404).send('No se ha podido añadir publicacion')
            return res.status(200).send(publicacion)
        })
    },

    editPublication: function(req, res){
        let Id = req.params.id
        let params = req.body

        Publicacion.findByIdAndUpdate(Id, params, {new: true}, (err, publicacion) => {
            if(err) return res.status(500).send('Error')
            if(!publicacion) return res.status(404).send('No se ha podido editar publicacion')
            return res.status(200).send(publicacion)
        })
    },

    deletePublication: function(req, res){
        let id = req.params.id
        Publicacion.findByIdAndRemove(id, (err, publicacion) => {
            if(err) return res.status(500).send('Error')
            if(!publicacion) return res.status(404).send('No se ha podido borrar la publicacion')
            return res.status(200).send(publicacion)
        })
    },

    getPublication: function(req, res){
        let id = req.params.id
        Publicacion.findById(id, (err, publicacion) => {
            if(err) return res.status(500).send('Error')
            if(!publicacion) return res.status(404).send('No existe la publicacion')
            return res.status(200).send(publicacion)
        })
    },

    getPublications: function(req, res){
        Publicacion.find({}, (err, publicaciones) => {
            if(err) return res.status(500).send('Error')
            if(!publicaciones) return res.status(404).send('No hay publicaciones')
            return res.status(200).send(publicaciones)
        })
    },

    getPersonalPublications: function(req, res){
        let userId = req.params.id
        
        Publicacion.find({userId: userId}, (err, publicaciones) => {
            if(err) return res.status(500).send('Error')
            if(!publicaciones) return res.status(404).send('No hay publicaciones')
            return res.status(200).send(publicaciones)
        })
    }
}

module.exports = controller