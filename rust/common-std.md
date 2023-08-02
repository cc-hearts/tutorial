---
title: 常用的std
---



## hashMap

```rust
use std::collections::HashMap;

fn main() {
    // 创建 hashMap
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    let teams = vec![String::from("blue"), String::from("red")];
    let initial_scores = vec![10, 50];
    // 迭代组合形成hsahMap
    let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
    // 实现了Copy trait 类型的值 不会转交所有权 而是进行了copy
    // 如果是String等类型 直接添加会转移所有权
    get_hash_map_value();
    iter_hash_map();
    update_hash_map()
}

fn get_hash_map_value() {
    let mut scores = HashMap::new();
    scores.insert(String::from("blue"), 10);
    scores.insert(String::from("red"), 50);
    let team_name = String::from("red");
    let score = scores.get(&team_name);
    match score {
        Some(s) => println!("{}", s),
        None => println!("not found"),
    }
    // entry 方法 检查制定的K是否对应一个V

    let e = scores.entry(String::from("blue"));
    // 如果这个值不存在的话 将这个值插入 并且返回这个值的可变引用（mut）
    // 如果这个值存在的话 找到对应的V的可变引用返回
    let num = e.or_insert(50);
    *num += 1;
    println!("get num is {:?}", num)
}

fn iter_hash_map() {
    let mut scores = HashMap::new();
    scores.insert(String::from("blue"), 10);
    scores.insert(String::from("red"), 50);

    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}

// 更新hashMap
fn update_hash_map() {
    let mut scores = HashMap::new();
    scores.insert(String::from("blue"), 10);
    scores.insert(String::from("blue"), 50);
    println!("{:?}", scores);
}

```

