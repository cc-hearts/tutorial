---
title: provider全量解析
---

Nest 自带的IOC容器可以根据依赖关系将provider注入到目标对象中

常见的 provider 注入的方式：

```typescript
@Module({
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
```

这里的 FromService 是一种简写的形式，完整写法应该是：

```ts
@Module({
  controllers: [FormController],
  providers: [{
    provide: FormService,
    useClass: FormService
  }]
})
export class FormModule {}
```

useClass指定要注入的实例化对象（先实例化在注入）



provide 指定要注入的token，可以是字符串，或者是Class。（如果是字符串，需要使用`@inject`指定token注入，class可以直接注入）

```ts
 providers: [
    {
      provide: 'form',
      useClass: FormService,
    },
  ],
```

```diff
- constructor(private readonly formService: FormService) { }
+ constructor(@Inject('form') private readonly formService: FormService) { }
```

除了使用 useClass 还可以使用useValue 提供注入的对象值

```diff
@Module({
  controllers: [FormController],
  providers: [
    {
      provide: 'form',
-      useClass: FormService,
+      useValue: {
+        create: 'This action adds a new form',
+      },
    },
  ],
})
export class FormModule { }

```

![image-20230717165128762](http://114.55.225.186:30002/oss/file/WPJTOOANlAvXos4EJeb0m/2023-07-17/image-20230717165128762.png)

## useFactory 动态注入值

useFactory 可以动态的注入值

> useFactory 支持 async/await（会拿到 promise 返回值 进行注入）

```ts
@Module({
  controllers: [FormController],
  providers: [
    {
      provide: 'form',
      // usefactory 可以通过inject注入参数
      // https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
      async useFactory(FormDataService) {
        return Promise.resolve({
          data: 'this is form data',
        });
      },
      inject: [FormDataService]
    },
  ],
})
export class FormModule { }
```

## useExisting

useExisting 用于别名

```ts
@Module({
  controllers: [FormController],
  providers: [
    {
      provide: 'form',
      useExisting: 'form-data' // 如果@inject('form') 会注入@inject('form-data') 的对象 
    },
  ],
})
export class FormModule { }
```

