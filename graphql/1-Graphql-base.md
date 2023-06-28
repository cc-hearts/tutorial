---
title: graphql 基本使用
---

```ts
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/index.js'
const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // 开启图形查询的模式
  })
)

// 访问页面的 http://localhost:4000/graphql? 将会进入查询页面
app.listen(4000)
```

> schema.ts

```ts
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    generate: { type: GraphQLString },
  }),
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // 上面的args 就是第二个参数
        console.log(parent, args)
      },
    },
  },
})

export default new GraphQLSchema({
  query: rootQuery,
})
```
