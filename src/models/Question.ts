import { ObjectId } from 'mongodb';

export interface Question {
  _id?: ObjectId;
  fnName: string;
  title: string;
  description: string;
  initialCode: string;
  week: number;
  day: number;
}
