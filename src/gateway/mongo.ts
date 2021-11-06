import { MongoClient, Db } from 'mongodb';

let db: Db;

export const getMongoClient = async () => {
  if (!db) {
    const password = 'N36BwhX0T5S9pPKn';
    const client = await new MongoClient(
      `mongodb+srv://admin:${password}@cluster0.bq2rp.mongodb.net/db?retryWrites=true&w=majority`
    ).connect();
    db = client.db('perfectPractice');
  }

  return db;
};
