import { ObjectId } from 'mongodb';

export interface TestCase {
  _id: ObjectId;
  questionId: ObjectId;
  inputs: any[];
  output: any;
}
