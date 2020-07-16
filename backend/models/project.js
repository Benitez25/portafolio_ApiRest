const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    technology:String,
    image:String
})

module.exports = mongoose.model('Project', ProjectSchema)

