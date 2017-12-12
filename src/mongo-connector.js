

const { MongoClient, Logger } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017/hackernews';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URI);

  let logCount = 0;
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);

  return {
    Links: db.collection('links'),
    Votes: db.collection('votes'),
    Users: db.collection('users'),
  };
}


/*
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017/hackernews';

MongoClient.connect(MONGO_URI, (err, database) => {
  if (err) {
    console.log(database);
    return console.log('failed to connect to MongoDB');
  }

  // const db = database.db('')
  console.log('connected to MongoDB');

  db.collection('links').insertOne({
    url: 'www.graph.cool',
    description: 'alternative'
  }, (err, result) => {
    if (err) {
      console.log('failed to insert link', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});


const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017/hackernews';

module.exports = async () => {
  await MongoClient.connect(MONGO_URI, (err, database) => {
    if (err) {
      return console.log('failed to connect to MongoDB', database);
    }
    console.log('connected to MongoDB', database);

    database.collection('links').insertOne({
      url: 'www.graph.cool',
      description: 'alternative'
    }, (err, result) => {
      if (err) {
        console.log('failed to insert link', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    });
  });
  return { Links: db.collection('links') };
};
*/
