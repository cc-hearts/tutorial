type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer r}`
  ? r
  : `${T}`

type s = Absolute<-1_000_000n>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  // n 代表BitInt 写法
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/529/answer
  > View solutions: https://tsch.js.org/529/solutions
  > More Challenges: https://tsch.js.org
*/
