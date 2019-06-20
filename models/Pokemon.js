const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  dexId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type1: {
    type: String,
    required: true,
  },
  type2: {
    type: String,
  },
  generation: {
    type: Number,
    required: true,
  },
});


const Pokemon = mongoose.models.Pokemon || mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;