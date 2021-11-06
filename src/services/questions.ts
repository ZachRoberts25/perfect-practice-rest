import { ObjectId } from 'mongodb';
import { getMongoClient } from '../gateway/mongo';
import { Question } from '../models/Question';

export const getQuestionCollection = async () => {
  const client = await getMongoClient();
  return client.collection<Question>('questions');
};

export const createQuestion = async (question: Question) => {
  const col = await getQuestionCollection();
  await col.updateOne(
    { title: question.title },
    { $set: question },
    { upsert: true }
  );
};

export const getAllQuestions = async (
  query: {
    week?: number;
    day?: number;
  } = {}
) => {
  const col = await getQuestionCollection();
  return col.find(query).toArray();
};

export const getQuestion = async (id: ObjectId) => {
  const col = await getQuestionCollection();
  return col.findOne({ _id: id });
};
