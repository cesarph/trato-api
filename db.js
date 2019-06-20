const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDB = async () => {
  try {
    if (isConnected) {
      console.log('=> using existing database connection')
  
      return Promise.resolve();
    }
  
    console.log('=> using new database connection')
    const db = await mongoose.connect(process.env.DB, {useNewUrlParser: true});
    isConnected = db.connections[0].readyState;
  
    return db;
  } catch(err) {
    console.log(err)
    throw Error('There was an error connecting to the DB')
  }
  
}