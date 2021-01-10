import React from 'react'
import { render } from '../../utils/testUtils'
import Author from '../Author'

describe('Author Component', () => {
  test('have Text', () => {
    const { getByText } = render(
      <Author name="テスト太郎" createdAt={1610030829107} />
    )
    expect(getByText('テスト太郎')).toBeInTheDocument()
  })
})
