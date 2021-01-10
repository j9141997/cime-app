import React from 'react'
import { render } from '../../utils/testUtils'
import Card from '../Card'

describe('Card Component', () => {
  test('have Text', () => {
    const { getByText } = render(
      <Card
        data={{
          id: '79d456a6-4afc-1528-f6e6-3eb19ce25150',
          title: 'テストタイトル',
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }}
      />
    )
    expect(getByText('テストタイトル')).toBeInTheDocument()
  })
})
