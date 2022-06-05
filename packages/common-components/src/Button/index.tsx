import React, {
  MouseEventHandler,
  ReactChild,
  forwardRef,
  useMemo
} from 'react'

import { css, jsx } from '@emotion/react'

import { theme } from '@common/styles'

type Variant = 'text' | 'outlined' | 'contained'

type Size = 'small' | 'medium' | 'large' | 'xlarge'

export type ButtonProps = {
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: Variant
  label?: string
  size?: Size
  children?: ReactChild
  color?: string
}

const buttonStyle = css`
  color: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  &:disabled {
    cursor: default;
  }
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      disabled = false,
      onClick,
      variant = 'contained',
      label,
      children,
      size = 'small',
      color = theme.color.pink,
      className
    },
    ref
  ) => {
    const baseStyle = useMemo(
      () => css`
        border-radius: 4px;
        transition: 200ms opacity;
        padding: 0.5em 1.2em;

        ${theme.font[size]}
        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 0.6;
        }
        &:disabled {
          opacity: 0.6;
          &:hover {
            opacity: 0.6;
          }
        }
      `,
      []
    )

    const containedStyle = useMemo(
      () => css`
        color: ${theme.color.white};
        background-color: ${color};
      `,
      [theme, color]
    )

    const outlinedStyle = useMemo(
      () => css`
        border: 3px solid ${color};
        color: ${color};
      `,
      [color]
    )

    const textStyle = useMemo(
      () => css`
        box-shadow: ${theme.shadow};
        color: ${color};
      `,
      [theme, color]
    )

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={className}
        disabled={disabled}
        css={[
          baseStyle,
          buttonStyle,
          variant === 'contained' ? containedStyle : null,
          variant === 'outlined' ? outlinedStyle : null,
          variant === 'text' ? textStyle : null
        ]}>
        {children ?? label}
      </button>
    )
  }
)

export default Button
