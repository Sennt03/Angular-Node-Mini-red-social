const User = require('../models/user')
const jwt = require('jsonwebtoken')

var controller = {

    signup: function(req, res){
        let newUser = new User()
        const { name, email, password } = req.body

        newUser = {
            name,
            email,
            password: newUser.encryptPassword(password),
            image: 'https://res.cloudinary.com/sennt03/image/upload/v1609347260/Sennt.io/por-defecto_xdppxs.jpg'
        }

        User.findOne({email }, (err, user) => {
            if(!user){
                User.findOne({ name }, (err, user) => {
                    if(!user){
                        newUser.save((err, user) => {
                            if(err) return res.status(500).send({message: 'Error al registrar usuario'})
                            if(!user) return res.status(404).send({message: 'No se ha registrado el usuario'})
                            const token = jwt.sign({_id: user._id}, 'Sennt.io')
                            return res.status(200).send({token, user})
                        })
                    }else{
                        return res.send('El nombre de usuario ya esta en uso')
                    }
                })
            }else{
                return res.status(200).send('El correo ya esta registrado')
            }

        })
        
    },

    

    signin: function(req, res){
        const newUser = new User()
        const { email, password } = req.body;

        User.findOne({email: email}, (err, user) => {
            if(err) return res.status(500).send({message: 'Error al iniciar sesion'})
            if(!user) return res.status(404).send('El correo no existe')
            if(!user.validPassword(password)) return res.status('404').send('Contraseña incorrecta')
            const token = jwt.sign({_id: user._id}, 'Sennt.io')
            return res.status(200).send({token, user})
        })
    },

    editUser: function(req, res){
        const userId = req.params.id
        
        const { email, name } = req.body
        const img = req.body.image

        let userUpdate = {}
        User.findOne({email: email}, (err, user) => {
            if(!user){
                User.findOne({ name }, (err, user) => {
                    if(!user){
                        User.findById(userId, (err, user) => {
                            if(err) return res.status(500).send('Error')
                            if(!user) return res.status(404).send('El usuario no existe')
                            
                            userUpdate = {
                                name,
                                email,
                                image: img
                            }
                            User.findByIdAndUpdate(userId, userUpdate, {new: true}, (err, user) => {
                                if(err) return res.status(500).send('Error')
                                if(!user) return res.status(404).send('Usuario no encontrado')
                                return res.status(200).send(user)
                            })
                        })
                    }else{
                        return res.send('El nombre de usuario ya esta en uso')
                    }
                })
            }else{
                return res.status(200).send('El correo ya esta registrado')
            }
        })
        
    },

    deleteUser: function(req, res){
        const userId = req.params.id
        User.findByIdAndRemove(userId, (err, user) => {
            if(err) return res.status(500).send('Error')
            if(!user) return res.status(404).send('No existe el usuario')
            return res.status(200).send(user)
        })
    },

    verifyToken: function(req, res, next){
        if(!req.headers.authorization) return res.status(401).send('No tienes autorizacion')
        
        const token = req.headers.authorization.split(' ')[1]
        if(token == 'null') return res.status(401).send('No tienes autorizacion')

        const payload = jwt.verify(token, 'secretKey')
        req.userId = payload._id
        next()
    },

    getUser: function(req, res){
        const userId = req.params.id
        User.findById(userId, (err, user) => {
            if(err) return res.status(500).send('Ha ocurrido un error')
            if(!user) return res.status(404).send('No existe el usuario')
            return res.status(200).send(user)
        })
    },

    getUsers: function(req, res){
        User.find({}, (err, users) => {
            if(err) return res.status(500).send('Error')
            if(!users) return res.status(404).send('No hay usuarios')
            return res.status(200).send(users)
        })
    },

    getUserByName: function(req, res){
        const { name } = req.params;
        User.findOne({ name }, (err, user) => {
            if(err) return res.status(500).send('Error')
            if(!user) return res.status(404).send('El usuario no existe')
            return res.status(200).send(user)
        })
    }

}



module.exports = controller
