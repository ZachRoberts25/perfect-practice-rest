import { ObjectId } from 'mongodb';

export interface QuestionResponse {
  _id?: ObjectId;
  code: string;
  questionId: ObjectId;
  uid: string;
  testedCases: {
    status: 'passed' | 'failed';
    inputs: any[];
    expected: any;
    actual: any;
    error?: string;
  }[];
}
