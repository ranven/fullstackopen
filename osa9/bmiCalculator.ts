export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100) ** 2); /* prettier-ignore */
  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (unhealthy weight)";
  } else {
    return "Obese (unhealthy weight)";
  }
};

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(
    "Too few arguments. Usage: npm run calculateBmi <height> <weight>"
  );
} else {
  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    console.log("Provided values were not numbers");
  } else {
    const result = calculateBmi(height, weight);
    console.log(result);
  }
}
