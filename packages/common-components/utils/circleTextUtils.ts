// Source code of "Rendering text along an arc"
// The origin : https://riptutorial.com/html5-canvas/example/18742/rendering-text-along-an-arc-

export type measureValue = {
  width: number
  angularWidth: number
  pixelAngularSize: number
}

export const measure = (
  ctx: CanvasRenderingContext2D,
  text: string,
  radius: number
): measureValue => {
  let textWidth = ctx.measureText(text).width
  return {
    width: textWidth,
    angularWidth: (1 / radius) * textWidth,
    pixelAngularSize: 1 / radius
  }
}
export const circleText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  radius: number,
  start: number,
  renderType: string,
  end?: number,
  forward?: boolean
): void => {
  const multiplyCurrentTransform = true

  let textWidth, pA, pAS, a, aw, wScale, aligned, dir, fontSize
  if (text.trim() === '' || ctx.globalAlpha === 0) {
    return
  }
  if (
    isNaN(x) ||
    isNaN(y) ||
    isNaN(radius) ||
    isNaN(start) ||
    (end !== undefined && end !== null && isNaN(end))
  ) {
    throw TypeError(
      'circle text arguments requires a number for x,y, radius, start, and end.'
    )
  }
  aligned = ctx.textAlign
  dir = forward ? 1 : forward === false ? -1 : 1
  pAS = 1 / radius
  textWidth = ctx.measureText(text).width
  if (end !== undefined && end !== null) {
    pA = ((end - start) / textWidth) * dir
    wScale = (pA / pAS) * dir
  } else {
    if (forward === null || forward === undefined) {
      if (((start % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) > Math.PI) {
        dir = -1
      }
    }
    pA = -pAS * dir
    wScale = -1 * dir
    switch (aligned) {
      case 'center':
        start -= (pA * textWidth) / 2
        end = start + pA * textWidth
        break
      case 'right':
      case 'end':
        end = start
        start -= pA * textWidth
        break
      case 'left':
      case 'start':
        end = start + pA * textWidth
    }
  }
  ctx.textAlign = 'center'
  a = start
  for (let i = 0; i < text.length; i += 1) {
    aw = ctx.measureText(text[i]).width * pA
    let xDx = Math.cos(a + aw / 2)
    let xDy = Math.sin(a + aw / 2)
    if (multiplyCurrentTransform) {
      ctx.save()
      if (xDy < 0) {
        ctx.transform(
          -xDy * wScale,
          xDx * wScale,
          -xDx,
          -xDy,
          xDx * radius + x,
          xDy * radius + y
        )
      } else {
        ctx.transform(
          -xDy * wScale,
          xDx * wScale,
          xDx,
          xDy,
          xDx * radius + x,
          xDy * radius + y
        )
      }
    } else {
      if (xDy < 0) {
        ctx.setTransform(
          -xDy * wScale,
          xDx * wScale,
          -xDx,
          -xDy,
          xDx * radius + x,
          xDy * radius + y
        )
      } else {
        ctx.setTransform(
          -xDy * wScale,
          xDx * wScale,
          xDx,
          xDy,
          xDx * radius + x,
          xDy * radius + y
        )
      }
    }
    if (renderType === 'FILL') {
      ctx.fillText(text[i], 0, 0)
    }
    if (renderType === 'STROKE') {
      ctx.strokeText(text[i], 0, 0)
    }
    if (multiplyCurrentTransform) {
      ctx.restore()
    }
    a += aw
  }
  if (!multiplyCurrentTransform) {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
  ctx.textAlign = aligned
}
export const fillCircleText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  radius: number,
  start: number,
  end?: number,
  forward?: boolean
): void => {
  circleText(context, text, x, y, radius, start, 'FILL', end, forward)
}
export const strokeCircleText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  radius: number,
  start: number,
  end?: number,
  forward?: boolean
): void => {
  circleText(context, text, x, y, radius, start, 'STROKE', end, forward)
}
export const measureCircleTextExt = (
  context: CanvasRenderingContext2D,
  text: string,
  radius: number
): measureValue => {
  return measure(context, text, radius)
}
