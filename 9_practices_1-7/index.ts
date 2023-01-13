/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (req, res) => {
  console.log(req);
  res.send('Hello Full Stack');
});

//bmiCalculator route  >> bmi?height=180&weight=72
app.get('/bmi/:someQuery', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    const err = {
      error: "malformatted parameters"
    };
    res.send(err);
  }
  const bmi = calculateBmi(height,weight);
  const result = {
    weight: weight,
    height: height,
    bmi: bmi
  };
  res.send(result);
});

//calculateExercises
app.post('/exercises', (req, res) => {
  const body = req.body;
  if (body.daily_exercises.length === 0 || !Number(body.target)) {
    const err = {
      error: "parameters missing"
    };
    res.send (err);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (body.daily_exercises.some(isNaN)) {
    const err = {
      error: "malformatted parameters"
    };
    res.send (err);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const daily_exercises = Object.values(body.daily_exercises);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = body.target;
  const data = [];
  data.push(String(target));
  daily_exercises.map(x => data.push(String(x)));
  const result = calculateExercises(data);
  console.log(result);
  res.json(result);
});



const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});