const mongoose = require('mongoose');

const someSchema = new mongoose.Schema({
    prop: {type: 'string', required: true}
})
const Model = mongoose.model('nameOfModel', someSchema, 'nameOfColection');

module.exports = {someSchema, Model};