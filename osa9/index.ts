import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      return res.status(400).json({
        error: 'malformatted parameters',
      });
    }
    const bmi = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi,
    });
  } catch (err) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
