/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted parameters');
    }
    const bmi = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      throw new Error('parameters missing');
    }

    daily_exercises.map((e: number) => {
      if (isNaN(e)) {
        throw new Error('malformatted parameters');
      }
    });

    if (isNaN(target)) {
      throw new Error('malformatted parameters');
    }

    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
