import { evaluate } from '../src/services/eval';

describe('Eval', () => {
  it('evaluates simple functions', () => {
    const ret = evaluate('function hello(num) { return num }', 'hello', [10]);
    console.log(ret);
  });

  it('evaluates more complex functions', () => {
    const ret = evaluate(
      `
    let map = {}

    function twoSum2(array, target) {
    
        for( let i = 0; i < array.length; i++) { 
            let compliment = target - array[i]
            if( map[compliment] ) {
                return true 
            } else {
                map[array[i]] = true 
            }
        }
    }`,
      'twoSum2',
      [[1, 2, 3, 4, 5], 5]
    );
    console.log(ret);
  });

  it('evaluates 2 sum', () => {});
});
