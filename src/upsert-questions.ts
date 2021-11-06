import { ObjectId } from 'mongodb';
import { getMongoClient } from './gateway/mongo';
import { Question } from './models/Question';
import { TestCase } from './models/TestCase';
import { createQuestion, getQuestionCollection } from './services/questions';
import { createTestCase } from './services/test-case';

const questions = [
  {
    fnName: 'sumNums',
    title: 'Sum of Two Numbers',
    description: `Write a function that **returns the sum of two numbers**. \n
## Example \n
2 + 3 = 5"; \n
`,
    initialCode: `
function sumNums(a, b) { 
    // return something
}`,
    week: 1,
    day: 2,
  },
  {
    fnName: 'countDown',
    title: 'Count from 10 to 1',
    description: `Write a loop inside a function that **returns integers descending from 10 to 1**. <br> 
    ## Example <br> 
    10<br>9<br>8<br>7<br>6<br>..";
    `,
    initialCode: `
function countDown() {
    // return something
};
    `,
    week: 1,
    day: 1,
  },
  {
    fnName: 'totalPoints',
    title: 'FinalScores',
    description: `You are adding up points for a basketball game, **given the amount** of **2-pointers made and 3-pointers made**, find the final points for the team and **return that value**. \n
    ## Examples \n
    **Input** (1, 1) -> **Output** (5)
    **Input** (5, 5) -> **Output** (25)
    **Input** (10, 10) -> **Output** (50)
    `,
    initialCode: `
function totalPoints(twoPointers, threePointers) {
    // return something
}`,
    week: 1,
    day: 4,
  },
  {
    fnName: 'findWord',
    title: "What's the word?",
    description: `Oh no! I can't find the word hidden amongst the trees. Help me write a function that finds the lower case word hidden in an string of random letters. \n
  ## Examples \n
  **Input** findWord("ALOcURTFoYFEdTWUiIOWUTWnOUOFWg") -> **Output** ("coding")
  **Input** findWord("GEdWKUoGETFDg") -> **Output** ("dog")
  **Input** findWord("THhTREeUIEaHEYlHWtDh") -> **Output**("health")
  `,
    initialCode: `
function findWord() {
    // return something
}
  `,
    week: 2,
    day: 1,
  },
] as Question[];

const testCases = [
  ...Array.from(Array(100)).map(() => {
    const inputs = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ];
    return {
      // sum of 2 numbers
      questionId: new ObjectId('6186f7f43db1f49517ede2d5'),
      inputs,
      output: inputs[0] * 2 + inputs[1] * 3,
    };
  }),
] as TestCase[];

const run = async () => {
  await Promise.all(questions.map(createQuestion));
  await Promise.all(testCases.map(createTestCase));
  process.exit();
};

run().then();
