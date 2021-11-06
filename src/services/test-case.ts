import { ObjectId } from 'mongodb';
import { getMongoClient } from '../gateway/mongo';
import { TestCase } from '../models/TestCase';

const getTestCaseCollection = async () => {
  const client = await getMongoClient();
  return client.collection<TestCase>('testCases');
};

export const getAllTestCases = async (questionId: ObjectId) => {
  const col = await getTestCaseCollection();
  return col.find({ questionId }).toArray();
};

export const createTestCase = async (testCase: TestCase) => {
  const col = await getTestCaseCollection();
  await col.insertOne(testCase);
};
