const validator = require('validator');
const Pokemon = require('./models/Pokemon');
const connectToDB = require('./db');

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message })
});

const createSuccessResponse = (data) => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body:  JSON.stringify(data)
});

module.exports.list = async function(event, context) {
  try {
    await connectToDB();
    const query = Pokemon.find({});
    const pokemonList = await query.exec();
  
    return createSuccessResponse({data: pokemonList})
  } catch (error) {
    return createErrorResponse(500, 'There was an error executing the query');
  }
 
};

module.exports.get = async (event, context) => {
  try {
    const id = event.pathParameters.id;

    if (!validator.isNumeric(id)) {
      return createErrorResponse(400, 'Incorrect id must be a number');
    }
    await connectToDB();

    const query = Pokemon.findOne({dexId: id});
    const pokemon = await query.exec();

    if (!pokemon) {
      return createErrorResponse(404, `Pokemon Not Found`)
    }
    
    return createSuccessResponse({ data: pokemon })
  } catch (error) {
    return createErrorResponse(500, 'There was an error executing the query');
  }
  
}



module.exports.create = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    await connectToDB();

    const query = Pokemon.find({dexId: data.dexId});
    const pokemon = await query.exec();

    if (pokemon.length) return createErrorResponse(400, 'Pokemon already exists');
  
    if (data.type2 === data.type1) delete data.type2;

    const newPokemon = new Pokemon({
      dexId: data.dexId,
      name: data.name,
      type1: data.type1,
      type2: data.type2,
      generation: data.generation,
    });

    if (newPokemon.validateSync()) {
      return createErrorResponse(400, 'Incorrect pokemon data');
    }

    await newPokemon.save();
  
    return createSuccessResponse({ data: newPokemon })
  } catch (err) {
    return createErrorResponse(err.statusCode, err.message)
  }

 
};

module.exports.update = async (event, context) => {
  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    
    if (!validator.isNumeric(id)) {
      return createErrorResponse(400, 'Incorrect id must be a number');
    }
    await connectToDB();

    const query = Pokemon.findOne({dexId: id});
    const pokemon = await query.exec();

    if (!pokemon) return createErrorResponse(404, 'Pokemon doesn\'t exists');
    
    if (data.type2 === data.type1) delete data.type2;

    const updatedPokemon = {
      name: data.name || pokemon.name ,
      type1: data.type1 || pokemon.type1 ,
      type2: data.type2,
      generation: data.generation || pokemon.generation ,
    };

    const pokemonU = await Pokemon.findByIdAndUpdate(pokemon._id, updatedPokemon).exec();
  
    return createSuccessResponse({ data: updatedPokemon })
  } catch (err) {
    return createErrorResponse(err.statusCode, err.message)
  }

 
};

module.exports.delete = async (event, context) => {
  try {
    const id = event.pathParameters.id;

    if (!validator.isNumeric(id)) {
      return createErrorResponse(400, 'Incorrect id must be a number');
    }
    await connectToDB();

    const query = Pokemon.findOneAndDelete({dexId: id});
    const pokemon = await query.exec();
    
    if (!pokemon) {
      return createErrorResponse(404, 'Pokemon doesn\'t exists');
    }

    return createSuccessResponse({ message: 'pokemon deleted', data: pokemon })
  } catch (error) {
    return createErrorResponse(500, 'There was an error deleting the pokemon');
  }
}