// if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
// }

module.exports = {
    URI_DB: process.env.URI_DB
}