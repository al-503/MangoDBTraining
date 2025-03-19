const mongoose = require('mongoose');

//c'est la method shema de mangoose qui permet de définir la strucutre des data que je vais rentrer
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// la method model de mangoose elle transforme le mangoose model en un model utilisable
module.exports = mongoose.model('Thing', thingSchema);