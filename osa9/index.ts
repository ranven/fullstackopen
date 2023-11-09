import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { Result, calculateExercises } from "./exerciseCalculator";
//import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

require('body-parser');

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "malformatted parameters",
    });
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises: number[] = data.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = Number(data.target);

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    res.send({
      error: "parameters missing",
    });
  }

  try {
    const calculatedExercises: Result = calculateExercises(dailyExercises, target);
     res.send({calculatedExercises});
  } catch (err) {
    res.send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
