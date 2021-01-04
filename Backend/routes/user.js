const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const PubliController = require('../controllers/publicaciones')
const MensajeController = require('../controllers/mensajes')

// Usuario
router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.put('/edit-user/:id', UserController.editUser)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/get-user/:id', UserController.getUser)
router.get('/get-users', UserController.getUsers)
router.get('/get-user-name/:name', UserController.getUserByName)

//Publicaciones
router.post('/add-publicacion', PubliController.addPublication)
router.put('/edit-publicacion/:id', PubliController.editPublication)
router.get('/get-publicacion/:id', PubliController.getPublication)
router.get('/get-publicaciones', PubliController.getPublications)
router.get('/get-personal-publicaciones/:id', PubliController.getPersonalPublications)
router.delete('/delete-publicacion/:id', PubliController.deletePublication)

//Mensajes
router.post('/add-mensaje', MensajeController.addMensaje)
router.get('/get-recibidos/:name', MensajeController.getRecibidos)
router.get('/get-enviados/:name', MensajeController.getEnviados)
router.delete('/delete-mensaje/:id', MensajeController.deleteMensaje)
router.put('/edit-mensaje/:id', MensajeController.editMensaje)
router.get('/get-mensaje/:id', MensajeController.getMensaje)

module.exports = router