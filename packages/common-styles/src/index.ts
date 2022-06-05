import { css } from '@emotion/react'
import colors from './colors'
import font from './font'

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const shadow = css`
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.07);
`

const borderRadius = {
  small: css`
    border-radius: 0.5rem;
  `,
  medium: css`
    border-radius: 1rem;
  `,
  large: css`
    border-radius: 2rem;
  `
}

export const theme = {
  color: colors,
  font,
  flexCenter,
  shadow,
  borderRadius
}

//const customMediaQuery = (maxWidth: any) => `@media (max-width: ${maxWidth}px)`
//custom: customMediaQuery,
/*
export const media = {
  1440: customMediaQuery(1440),
  768: customMediaQuery(768),
  tablet: customMediaQuery(1100),
  mobile: customMediaQuery(500)
}
*/
export const hideScroll = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
export { default as GlobalStyle } from './GlobalStyle'
