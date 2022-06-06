import React from 'react'
import Button, { ButtonProps } from '.'
import { css, jsx } from '@emotion/react'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Str) => (
      <div
        css={css`
          display: flex;
          justify-content: space-around;
        `}>
        <Str />
      </div>
    )
  ]
} as Meta

export const Basic: Story<ButtonProps> = (args) => <Button {...args} />
Basic.args = {
  label: '버튼'
}

export const Variant = () => (
  <React.Fragment>
    <Button label="contained" />
    <Button label="outlined" variant="outlined" />
    <Button label="text" variant="text" />
  </React.Fragment>
)
