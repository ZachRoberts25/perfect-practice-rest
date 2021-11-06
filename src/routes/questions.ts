import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { createQuestionResponse } from '../services/question-response';
import { getAllQuestions, getQuestion } from '../services/questions';

export const questionRouter = Router();

questionRouter.get('/', async (req, res) => {
  const questions = await getAllQuestions(req.body || {});
  res.send(questions);
});

questionRouter.get('/:id', async (req, res) => {
  const question = await getQuestion(new ObjectId(req.params.id));
  res.send(question);
});

questionRouter.post('/:id/submit', async (req, res) => {
  const ret = await createQuestionResponse(
    res.locals.userId,
    new ObjectId(req.params.id),
    req.body.code
  );
  console.log(ret);
  res.send(ret);
});
