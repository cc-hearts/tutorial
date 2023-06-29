/**
 * @author heart
 * @description
 * @Date 2022-07-18
 */

// // 滑动窗口 + hashMap
// function findAnagrams(s: string, p: string): number[] {

// }

const data = {
  user: {
    profile: {
      age: '21',
    },
  },
}

Object.defineProperty(data, 'user', {
  get() {
    console.log(this)
  },
})

const obj = {}
Object.keys(data).forEach((val) => {
  Reflect.set(obj, val, Reflect.get(obj, val))
})
