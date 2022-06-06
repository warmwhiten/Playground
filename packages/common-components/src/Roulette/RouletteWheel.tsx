import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { fillCircleText } from '../../utils/circleTextUtils'
import { colorPicker } from '../../utils/colorPalette'
import Button from '../Button'

export const DEFAULT_ROTATION_VALUE = 1440

export type RouletteItemProps = {
  index: number
  label: string
  value: number
}

export type RouletteProps = {
  rouletteItems: ReadonlyArray<RouletteItemProps>
  size?: number
}

export type WheelProps = {
  countRotation: number
  size: number
  rotationAnimationValue: number
}

export const RouletteWheel: React.FC<RouletteProps> = ({
  rouletteItems,
  size = 300
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [countRotation, setCountRotation] = useState(1)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [rotationAnimationValue, setRotationAnimationValueValue] = useState(0)
  const [resultIndex, setResultIndex] = useState(0)
  const [isRouletteRotate, setIsRouletteRotate] = useState(false)

  const sumItem = rouletteItems.reduce(
    (prev, current) => prev + current.value,
    0
  )

  const calcResultIndex = (_rotationAngle: number) => {
    if (_rotationAngle > 360) {
      _rotationAngle %= 360
    }
    if (_rotationAngle > 270) {
      _rotationAngle = 270 - _rotationAngle + 360
    } else {
      _rotationAngle = 270 - _rotationAngle
    }

    let quotient = Math.trunc(_rotationAngle / (360 / sumItem)) + 1
    let result = 0
    for (let i = 0; i < rouletteItems.length; i++) {
      quotient -= rouletteItems[i].value
      if (quotient <= 0) {
        result = i
        break
      }
    }

    return result
  }

  const handleClickRotationButton = () => {
    const _rotationAnimationValue =
      rotationAngle +
      Math.random() * 360 +
      DEFAULT_ROTATION_VALUE * countRotation +
      Math.PI
    const _rotationAngle =
      _rotationAnimationValue - DEFAULT_ROTATION_VALUE * countRotation
    setRotationAnimationValueValue(_rotationAnimationValue)
    setResultIndex(calcResultIndex(_rotationAngle))
    setRotationAngle(_rotationAngle)
    setCountRotation(countRotation + 1)
    setIsRouletteRotate(true)
    setTimeout(() => {
      setIsRouletteRotate(false)
    }, 5000)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    context.translate(size, size)
    rouletteItems.forEach(function (item, index) {
      context.beginPath()
      context.arc(
        0,
        0,
        size,
        0,
        (360 / sumItem) * item.value * (Math.PI / 180),
        false
      )

      context.lineTo(0, 0)

      context.closePath()
      context.fillStyle = colorPicker(index)
      context.fill()

      context.fillStyle = 'white'
      context.textAlign = 'end'
      context.font = 'bold 16px sanserif'

      fillCircleText(
        context,
        item.label,
        0,
        0,
        size - 50,
        (Math.PI / sumItem) * item.value -
          (item.label.length * 4.7) / (size - 50)
      )
      context.rotate((360 / sumItem) * item.value * (Math.PI / 180))
    })
  }, [rouletteItems])

  return (
    <RouletteWrapper>
      <div>
        <Button
          onClick={handleClickRotationButton}
          disabled={isRouletteRotate}
          size="medium"
          variant="outlined">
          돌리기!
        </Button>
      </div>

      <RouletteContainer>
        <div className="checker" />
        <Wheel
          countRotation={countRotation}
          rotationAnimationValue={rotationAnimationValue}
          ref={canvasRef}
          size={size}
          width={size * 2}
          height={size * 2}
        />
        {countRotation !== 1 && !isRouletteRotate && (
          <div className="winnigNotice">
            <div className="winnigNumber">
              {rouletteItems[resultIndex].label} <br /> 당첨!
            </div>
          </div>
        )}
      </RouletteContainer>
    </RouletteWrapper>
  )
}

const Wheel = styled.canvas<WheelProps>`
  position: relative;
  top: -20px;
  z-index: 10;
  ${(props) =>
    props.countRotation &&
    css`
      transition-timing-function: ease-in-out;
      transition: 5s;
      transform-origin: props.size props.size;

      transform: rotate(${props.rotationAnimationValue}deg);
    `}
`

const RouletteWrapper = styled.div`
  overflow: hidden;
`

const RouletteContainer = styled.div`
  display: inline-block;
  position: relative;
  border-top: 10px solid white;
  z-index: 10;
  overflow: hidden;

  .checker {
    position: relative;
    display: block;
    margin: 0 auto;
    height: 50px;
    width: 50px;
    background-color: #f63f3f;
    top: -30px;
    transform: rotate(45deg) skew(25deg, 25deg);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 1px 5px;
    z-index: 100;
  }

  .winnigNotice {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 20%;
    padding: 2rem 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 3px;
    z-index: 1000;
    .winnigNumber {
      font-size: 2rem;
      text-align: center;
      font-weight: bold;
    }
  }
`
