interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const arguments = process.argv.slice(2);
  const target = Number(arguments[0]);
  const exercises = arguments.slice(1).map((e) => Number(e));

  arguments.map((e) => {
    if (isNaN(Number(e))) {
      throw new Error('Provided values were not numbers!');
    }
  });

  return {
    targetHours: target,
    arr: exercises,
  };
};

const calculateExercises = (
  arr: Array<number>,
  targetHours: number
): ExerciseResult => {
  const totalHours = arr.reduce((acc, curr) => acc + curr);
  const periodLength = arr.length;
  const getRating = (): number => {
    if (totalHours >= targetHours * periodLength) {
      return 3;
    } else if (totalHours >= (targetHours * periodLength) / 2) {
      return 2;
    } else {
      return 1;
    }
  };
  const getRatingDesc = (): string => {
    switch (getRating()) {
      case 1:
        return 'very bad. you better start moving';
      case 2:
        return 'not bad, not good. room to improve!';
      case 3:
        return 'really good, keep it up!';
      default:
        return 'invalid rating';
    }
  };
  return {
    periodLength: periodLength,
    trainingDays: arr.filter((number) => number !== 0).length,
    success: totalHours >= targetHours * periodLength,
    rating: getRating(),
    ratingDescription: getRatingDesc(),
    target: targetHours,
    average: totalHours / periodLength,
  };
};

try {
  const { arr, targetHours } = parseArgs(process.argv);
  const text = calculateExercises(arr, targetHours);
  console.log(text);
} catch (err) {
  console.log('Error:', err.message);
}
