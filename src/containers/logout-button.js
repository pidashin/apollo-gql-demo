import React from 'react'
import styles from './logout-button.module.scss'
import {isLoggedInVar} from '../cache'

import { ReactComponent as ExitIcon } from '../../public/icons/exit.svg'


const LogoutButton = () => {
  return (
    <button
      className={styles.logoutBtn}
      onClick={() => {
        localStorage.clear()
        // client.writeData({ data: { isLoggedIn: false } })
        isLoggedInVar(false)
      }}
    >
      <ExitIcon />
      Logout
    </button>
  )
}

export default LogoutButton