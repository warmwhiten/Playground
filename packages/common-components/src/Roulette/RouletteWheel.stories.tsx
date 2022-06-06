import React from 'react'
import { RouletteWheel, RouletteProps } from './RouletteWheel'

export default {
  title: 'Components/Roulette',
  component: RouletteWheel
}

export const A = () => (
  <RouletteWheel
    rouletteItems={[
      { index: 1, label: 'hi1', value: 1 },
      { index: 2, label: 'hi2', value: 2 },
      { index: 3, label: 'hi3', value: 1 },
      { index: 4, label: 'hi4', value: 2 },
      { index: 5, label: 'hi5', value: 1 },
      { index: 6, label: 'hi6', value: 1 },
      { index: 7, label: 'hi77777777777', value: 1 }
    ]}
  />
)

export const B = () => (
  <RouletteWheel
    rouletteItems={[
      { index: 1, label: 'hi1', value: 1 },
      { index: 2, label: 'hi2', value: 1 },
      { index: 3, label: 'hi3', value: 1 },
      { index: 4, label: 'hi4', value: 1 },
      { index: 5, label: 'hi5', value: 1 },
      { index: 6, label: 'hi6666666666', value: 1 },
      { index: 7, label: 'hi777777777777777777777', value: 1 }
    ]}
    size={500}
  />
)
