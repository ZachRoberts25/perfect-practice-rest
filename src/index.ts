import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { firebaseConfig } from './firebase.config';
import { questionRouter } from './routes/questions';
import { json } from 'body-parser';

const app = express();

app.use(cors());
app.use(json());

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const withAuthorization = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const jwt = req.headers.authorization!;
  if (!jwt) {
    // throw an
    res.status(403).send('Unauthorized');
    return;
  }
  const id = await admin.auth().verifyIdToken(jwt);
  res.locals.userId = id.uid;
  next();
};

app.use('/questions', withAuthorization, questionRouter);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
