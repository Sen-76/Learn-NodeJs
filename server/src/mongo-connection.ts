const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://sen76201:RBGhBQ6H90yX7wwa@test.pszki.mongodb.net/?retryWrites=true&w=majority&appName=Test';

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
