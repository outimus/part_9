interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }


export const calculateExercises = (args: Array<string>) => {
  console.log('Args on ', args);
    const restOfValues = args.slice(1);
    const valuesInNumbers = restOfValues.map(v => Number(v));
    const target = Number(args[0]);
    const average = valuesInNumbers.reduce((partialSum, a) => partialSum + a, 0) / valuesInNumbers.length;
    let ratingDescrip = '';
    let rating = 0;
    let success = true;

    if (average > target) {
      ratingDescrip  = 'You reached your target';
      rating = 1;
      success = true;

    } else {
      ratingDescrip = 'not too bad but could be better';
      rating = 2;
      success = false;
    }

    const personX: Results = {
        periodLength: restOfValues.length,
        trainingDays: restOfValues.filter(x => x != '0').length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescrip,
        target: target,
        average: average
    };
    return personX;
};

try {
    const data = process.argv.slice(3);
    calculateExercises(data);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

export default { calculateExercises };

//npm run calculateExercises