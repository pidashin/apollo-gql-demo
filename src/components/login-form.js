import React, { useRef } from 'react';
import styles from './login-form.module.scss'

import Button from './button';
import { ReactComponent as Logo } from '../../public/logo.svg';
import { ReactComponent as Curve } from '../../public/curve.svg';
import { ReactComponent as Rocket } from '../../public/rocket.svg';


const LoginForm = ({ login }) => {
  const inputRef = useRef()
  const handleLogin = (e) => {
    e.preventDefault()
    const email = inputRef.current.value
    login({
      variables: { email }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Curve className={styles.curve} />
        <Logo className={styles.logo} />
      </div>
      <Rocket className={styles.rocket} />
      <h1 className={styles.heading}>Space Explorer</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          required
          type="email"
          name="email"
          placeholder="Email"
          data-testid="login-input"
          ref={inputRef}
        />
        <Button type="submit">Log in</Button>
      </form>
    </div>
  )
}

export default LoginForm