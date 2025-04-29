---
title: "A*寻路算法原理与实现"
date: "2024-04-18"
tags: ["算法", "AI", "路径规划", "AStar"]
category: "算法与人工智能"
summary: "详细讲解A*（A Star）寻路算法的原理、伪代码、常见优化与Unity等实际应用。"
---

# A*寻路算法原理与实现

A*（A Star）是一种常用的启发式路径搜索算法，广泛用于游戏AI、地图导航等。

## 1. 基本原理
A* 通过综合考虑起点到当前节点的实际代价（g）和当前节点到目标的估算代价（h），选择总代价 f=g+h 最小的节点进行扩展。

- **g(n)**：起点到节点 n 的实际代价
- **h(n)**：节点 n 到终点的启发式估价（如曼哈顿距离、欧几里得距离）
- **f(n) = g(n) + h(n)**

## 2. 伪代码
```pseudo
openSet = {起点}
while openSet 非空:
    当前 = openSet 中 f 最小的节点
    if 当前 == 终点:
        路径回溯并返回
    openSet 移除 当前
    for 邻居 in 当前.邻居:
        计算 g, h, f
        if 邻居 未在 openSet:
            加入 openSet
```

## 3. 典型实现要点
- 使用优先队列（堆）提升性能
- h(n) 必须满足“可低估性”（不能高估）
- 可结合障碍物/权重地图

## 4. Unity 中应用
Unity 有丰富的 A* 插件（如 Astar Pathfinding Project），也可自定义实现。

```csharp
// 简化版伪代码
while (openSet.Count > 0) {
    Node current = openSet.PopLowestF();
    if (current == target) break;
    foreach (var neighbor in current.Neighbors) {
        // 更新g、h、f并入队
    }
}
```

## 5. 常见优化
- 双向A*
- 跳点搜索（JPS）
- 启发式函数微调

## 总结
A* 是最实用的路径搜索算法之一，理解其原理和实现细节对游戏开发/AI有重要意义。
