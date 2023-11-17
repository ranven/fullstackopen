export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: 1 | 2 | 3
  ratingDescription: string
}

const addRating = (target: number, total: number): Rating => {
  const diffFromTarget = target - total;

  if (diffFromTarget <= 1 && diffFromTarget >= -1) {
    return {
      rating: 1,
      ratingDescription: "Good job!",
    };
  } else if (diffFromTarget <= 4 && diffFromTarget >= -4) {
    return {
      rating: 2,
      ratingDescription: "You're getting there!",
    };
  } else {
    return {
      rating: 3,
      ratingDescription: "You could've done better...",
    };
  }
};

export const calculateExercises = (hours: number[], target: number): Result => {
  let trainingDays = 0;
  let periodLength = 0;
  let total = 0;

  hours.forEach((h) => {
    total += h;
    periodLength += 1;
    if (h > 0) {
      trainingDays += 1;
    }
  });

  const rating = addRating(target, total);

  return {
    periodLength,
    trainingDays,
    success: rating.rating === 1,
    rating: rating.rating,
    ratingDescription: rating.ratingDescription,
    target,
    average: total / periodLength,
  };
};

/* const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(
    "Too few arguments. Usage: npm run calculateExercises <space-separated hours> <target>"
  );
} else {
  const hoursArr: number[] = [];

  for (let i = 1; i < args.length; i++) {
    const n = args[i].split(" ").map(Number);
    hoursArr.push(n[0]);
  }

  const target = Number(args[0]);

  if (isNaN(target) || hoursArr.some(isNaN)) {
    console.log("Provided values were not numbers");
  } else {
    const result = calculateExercises(hoursArr, target);
    console.log(result);
  }
}
 */