import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_NAME = "card-sets";

let dbConnection;

export const connectToDb = async (callback) => {
  try {
    const client = await MongoClient.connect(DB_URL);
    console.log("Connected to MongoDB");
    dbConnection = client.db(DB_NAME);
    callback();
  } catch (error) {
    callback(error);
  }
};

export const getDb = () => dbConnection;
