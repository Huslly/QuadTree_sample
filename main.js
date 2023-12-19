import { makepoints,clearCanvas, drawPoints, drawArc, drawBeforeSqus } from './utils.js';
import { QuadTreeNode } from './quadTreeUtils.js';
const searchDistance = 30 // 搜索距离
const pointNum = 600 // 生成点数量
const subNum = 10 // 每个子节点包含的数量
const width = 1200 // 宽度
const height = 800
// 初始化画布
const initcanvas = function() {
    // canvas
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    // create tree
    const points = makepoints(ctx, pointNum, width, height)
    const qTree = new QuadTreeNode(0, 0, width, height, subNum)
    qTree.insertPoints(points, ctx)
    console.log('QuadTreeNode', qTree)

    // search points
    canvas.addEventListener('mousedown', (e) => {
        clearCanvas(ctx, width, height)
        const x = e.offsetX
        const y = e.offsetY

        const res = qTree.searchPoints(x, y, searchDistance, [])
        console.log('res', res, x, y)
        
        drawPoints(ctx, points, 'rgba(0,0,0,1)')
        drawBeforeSqus(ctx)
        drawArc(ctx, x, y, searchDistance)
        drawPoints(ctx, res, 'rgba(255,9,4,1)')
    })
}



initcanvas()