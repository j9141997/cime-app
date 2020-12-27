import React, { VFC } from 'react'
import LoginFormPresenter from './LoginFormPresenter'

const LoginFormContainer: VFC = () => {
  const handleSubmit = () => {
    return console.log('handle Submitted!')
  }
  return <LoginFormPresenter onSubmit={handleSubmit} />
}

export default LoginFormContainer
