/**
 * @author heart
 * @description
 * @Date 2022-07-30
 * @see https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md
 */
/* _____________ Your Code Here _____________ */

type Flatten<T, U extends Array<unknown> = []> = T extends [
  infer r,
  ...infer rest
]
  ? r extends unknown[]
    ? Flatten<[...rest, ...r], [...U]>
    : Flatten<rest, [...U, r]>
  : U

type a = Flatten<[1, 2, [3, 4], [[[5]]]]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils/index'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
