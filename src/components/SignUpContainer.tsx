import React, { VFC } from 'react'
import SignUpPresenter from './SignUpFormPresenter'

const SignUpContainer: VFC = () => {
  const handleSubmit = () => {
    return console.log('handle Submitted!')
  }

  return <SignUpPresenter onSubmit={handleSubmit} />
}

export default SignUpContainer
