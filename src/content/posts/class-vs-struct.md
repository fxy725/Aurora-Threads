---
title: "类与结构体的区别（C++/C#）"
date: "2024-04-10"
tags: ["C++", "C#", "基础", "面试"]
category: "语言基础"
summary: "深入比较类（class）与结构体（struct）在C++和C#中的本质区别、使用场景与注意事项。"
---

# 类与结构体的区别（C++/C#）

在 C++ 和 C# 中，`class` 和 `struct` 都可以用来定义自定义类型，但它们有诸多不同：

## 1. 默认访问权限
- **C++**：`struct` 默认成员是 public，`class` 默认成员是 private。
- **C#**：成员默认都是 private。

## 2. 继承和多态
- **C++**：`struct` 和 `class` 都支持继承和多态。
- **C#**：`struct` 不能继承自其他 struct/class，也不能被继承。

## 3. 值类型与引用类型
- **C++**：没有本质区别，主要是语法层面。
- **C#**：`struct` 是值类型（Value Type），`class` 是引用类型（Reference Type）。

```csharp
struct Point { public int x, y; }
Point a = new Point();
Point b = a;
b.x = 10;
// a.x 仍为 0，b.x 为 10
```

## 4. 内存分配
- **C++**：由定义方式和分配方式决定。
- **C#**：struct 通常分配在栈上，class 分配在堆上。

## 5. 使用场景
- **struct**：适合表示小型、轻量、不可变的数据结构（如点、颜色、坐标）。
- **class**：适合更复杂、需要继承/多态的对象。

## 总结
- C++ 中 struct/class 主要区别是默认访问权限。
- C# 中 struct 是值类型、不可继承，class 是引用类型、可继承。

> 面试建议：能说清楚“C# struct 是值类型、不能继承，class 是引用类型、支持继承”，并举例说明。
