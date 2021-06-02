interface MeasureValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): MeasureValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (((height / 100) * height) / 100);
  if (bmi >= 40) {
    return 'Obese Class III (Very severely obese)';
  } else if (bmi >= 35) {
    return 'Obese Class II (Severely obese)';
  } else if (bmi >= 30) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi >= 25) {
    return 'Overweight';
  } else if (bmi >= 18.5) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 16) {
    return 'Underweight';
  } else if (bmi >= 15) {
    return 'Severely underweight';
  } else {
    return 'Very severely underweight';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  const text = calculateBmi(height, weight);
  console.log(text);
} catch (err) {
  if (err instanceof Error) {
    console.log('Error:', err.message);
  }
}
