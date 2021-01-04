const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: String
})

UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('usuarios', UserSchema)