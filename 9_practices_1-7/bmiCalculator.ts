export const calculateBmi = (a: number, b: number) => {
    const result = b / ( a/100 * a/100 );
    
    if (result > 18.4 && result < 25.1) {
        console.log(result);
        return "Normal (healthy weight)";
    }
    if (!result){
        return 'Not valid numbers provided';
    } else {
        return "Overweight";
    }
  };

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a, b)); // a=pituus b=paino

export default { calculateBmi };


//npm run calculateBmi a=pituus b=paino