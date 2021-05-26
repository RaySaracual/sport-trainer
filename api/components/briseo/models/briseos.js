var {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

var briseosSchema = new Schema({
    Ejemplar : { type:String, required: true},
    Parciales: {type: String, required: true},
    RM:{type: String}, 
    Jockey:{type:String, required: true},
    Trainner : { type:String, required: true},
    CreationDate : { type:Date, default: new Date()},
    DateBriseo : { type:Date, required: true},
});

briseosSchema.methods.toJSON = function(){
    const {__v, ...briseo } = this.toObject();
    return briseo;
 }
 

module.exports = model('Briseo', briseosSchema)
