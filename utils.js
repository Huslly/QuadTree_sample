const squs = []

const drawPoint = function(ctx, x, y, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x-2, y-2, 4, 4)
    // ctx.stroke()
}

const drawPoints = function(ctx, p, c) {
    for(let i = 0; i < p.length; i ++) {
        const e = p[i]
        drawPoint(ctx, e.x, e.y, c)
    }
    ctx.stroke()
}

const drawArc = function(ctx, x, y, round) {
    ctx.beginPath();
    ctx.arc(x, y, round, 0, 2*Math.PI); // 画一个半径为50的圆
    ctx.stroke(); // 绘制路径
}

const makepoints = function(ctx, num, width, height) {
    const points = []
    for (let i = 0; i < num; i += 1) {
        const x = Math.floor(Math.random() * (width + 1))
        const y = Math.floor(Math.random() * (height + 1))
        drawPoint(ctx, x, y, 'rgba(0,0,0,1)')
        points.push({x, y})
    }
    ctx.stroke()
    return points
}

const clearCanvas = function(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
}

const drawSqus = function(x, y, halfWidth, halfHeight, ctx) {
    ctx.strokeRect(x, y, halfWidth, halfHeight)
    ctx.strokeRect(x + halfWidth, y + halfHeight, halfWidth, halfHeight)
    squs.push([x, y, halfWidth, halfHeight])
    squs.push([x + halfWidth, y + halfHeight, halfWidth, halfHeight])
}

const drawBeforeSqus = function(ctx) {
    for (let i = 0; i < squs.length; i += 1) {
        const e = squs[i]
        ctx.strokeRect(e[0], e[1], e[2], e[3])
    }
}

export { makepoints , clearCanvas, drawPoints, drawArc, drawSqus, drawBeforeSqus}