import { drawSqus } from "./utils.js"

// 定义四叉树节点
class QuadTreeNode {
  constructor(x, y, width, height, subNum) {
    this.x = x; // 左上角x坐标
    this.y = y; // 左上角y坐标
    this.width = width; // 区域宽度
    this.height = height; // 区域高度
    this.subNum = subNum; // 每个子节点包含的数量
    this.points = []; // 存储在该节点中的点
    this.children = null; // 子节点
  }

  // 判断点是否在该节点区域内
  containsPoint(x, y) {
    return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
  }

  // 插入点到该节点或其子节点中
  insertPoint(x, y, ctx) {
    if (!this.containsPoint(x, y)) {
      return; // 该点不在该节点区域内，不进行插入操作
    }

    if (this.children) {
      // 该节点已经有子节点，将点插入到子节点中
      for (let child of this.children) {
        child.insertPoint(x, y, ctx);
      }
    } else {
      // 将点存储在该节点中
      this.points.push({ x, y });
      if (this.points.length > this.subNum) {
        // 当该节点中的点数量大于10时，将该节点划分为四个子节点
        this.subdivide(ctx);
      }
    }
  }

  insertPoints(points, ctx) {
    for (let i = 0; i < points.length; i++) {
      const e = points[i]
      this.insertPoint(e.x, e.y, ctx)
    }
  }

  // 划分节点为四个子节点
  subdivide(ctx) {
    const { x, y, width, height, subNum } = this;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    drawSqus(x, y, halfWidth, halfHeight, ctx)
    this.children = [
      new QuadTreeNode(x, y, halfWidth, halfHeight, subNum),
      new QuadTreeNode(x + halfWidth, y, halfWidth, halfHeight, subNum),
      new QuadTreeNode(x, y + halfHeight, halfWidth, halfHeight, subNum),
      new QuadTreeNode(x + halfWidth, y + halfHeight, halfWidth, halfHeight, subNum)
    ];

    // 将当前节点中的点插入到子节点中
    for (let point of this.points) {
      for (let child of this.children) {
        child.insertPoint(point.x, point.y);
      }
    }
    this.points = []; // 清空当前节点中的点
  }

  isInsideAera(QuadTreeNodes, x, y, circleRadius) {
    const res = []
    if (QuadTreeNodes) {
      for (let node of QuadTreeNodes) {
        const topLeft = {
          x: node.x,
          y: node.y
        }
        const topRight = {
          x: node.x + node.width,
          y: node.y
        }
        const bottomRight = {
          x: node.x +  node.width,
          y: node.y + node.height
        }
        const bottomLeft = {
          x: node.x,
          y: node.y + node.height
        }
        // 检查圆心是否在长方形的边界范围内
        if (
          x >= topLeft.x &&
          x <= bottomRight.x &&
          y >= topLeft.y &&
          y <= bottomRight.y
        ) {
          res.push(node) // 圆心在长方形内部
          continue
        }
        // 计算圆心到长方形各边的最短距离
        const distanceToTop = Math.abs(y - topLeft.y)
        const distanceToBottom = Math.abs(y - bottomRight.y)
        const distanceToLeft = Math.abs(x - topLeft.x)
        const distanceToRight = Math.abs(x - topRight.x)

        // 检查最短距离是否小于等于圆的半径
        if (
          (distanceToTop <= circleRadius) ||
          (distanceToBottom <= circleRadius) ||
          (distanceToLeft <= circleRadius) ||
          (distanceToRight <= circleRadius)
        ) {
          res.push(node) // 圆与长方形相交，且一部分在长方形内部
          continue
        }
      }
    }
    return res
  }

  // 搜索距离指定点小于等于10的所有点
  searchPoints(x, y, distance = 10, result = []) {
    if (this.children) {
      const insideChilds = this.isInsideAera(this.children, x, y, distance)
      if (insideChilds) {
        for(let child of insideChilds) {
          child.searchPoints(x, y, distance, result)
        }
      }
    }
    for (let point of this.points) {
      if (Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) <= distance) {
        result.push(point)
      }
    }
    return result
  }
}

export { QuadTreeNode } 