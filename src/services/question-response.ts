import { ObjectId } from 'mongodb';
import { getMongoClient } from '../gateway/mongo';
import { Question } from '../models/Question';
import { QuestionResponse } from '../models/QuestionResponse';
import { evaluate } from './eval';
import { getQuestion } from './questions';
import { getAllTestCases } from './test-case';
import { deepEqual } from 'assert';

const getQuestionResponseCollection = async () => {
  const client = await getMongoClient();
  return client.collection<QuestionResponse>('question-responses');
};

const saveQuestionResponse = async (response: QuestionResponse) => {
  const col = await getQuestionResponseCollection();
  await col.insertOne(response);
};

export const createQuestionResponse = async (
  uid: string,
  questionId: ObjectId,
  code: string
) => {
  const question = (await getQuestion(questionId)) as Question;
  const testCases = await getAllTestCases(questionId);
  const testedCases = await Promise.all(
    testCases.map((testCase) => {
      const evaluated = evaluate(code, question.fnName, testCase.inputs);
      try {
        deepEqual(evaluated, testCase.output);
        return {
          status: 'passed',
          inputs: testCase.inputs,
          expected: testCase.output,
          actual: evaluated,
        } as QuestionResponse['testedCases'][0];
      } catch (e) {
        return {
          status: 'failed',
          inputs: testCase.inputs,
          expected: testCase.output,
          actual: evaluated,
          error: e as string,
        } as QuestionResponse['testedCases'][0];
      }
    })
  );
  const response = {
    code,
    testedCases,
    questionId,
    uid,
  };
  await saveQuestionResponse(response);
  return response;
};
